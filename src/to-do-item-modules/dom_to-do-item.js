import { format, formatDuration, intervalToDuration } from "date-fns";

const domToDoItem = (item) => {
    let toDoItem = item;
    let expanded = false;

    let e = document.createElement("div");
    e.classList.add("to-do-item");

    let expandCollapseButton;
    let topBarInformation;
    let name;
    let dueDate;
    let priority;
    let deleteButton;

    const draw = () => {
        while (e.firstChild) e.lastChild.remove();

        if (expanded) e.classList.add("expanded");
        else e.classList.add("collapsed");

        drawExpandCollapseButton();

        topBarInformation = document.createElement("div");
        topBarInformation.classList.add("to-do-item-top-bar-information");
        e.appendChild(topBarInformation);

        drawName();

        drawDueDate();

        drawPriority();

        drawDeleteButton();

        if (expanded) {
            let expandedInfo = document.createElement("div");
            expandedInfo.classList.add("to-do-item-expanded-information");
            e.appendChild(expandedInfo);
        }
    };

    const drawExpandCollapseButton = () => {
        if (expandCollapseButton) expandCollapseButton.remove();
        expandCollapseButton = document.createElement("button");
        expandCollapseButton.classList.add(
            "to-do-item-expand-collapse-button",
            "material-symbols-rounded"
        );
        if (expanded) expandCollapseButton.textContent = "Expand_Circle_Up";
        else expandCollapseButton.textContent = "Expand_Circle_Down";
        e.appendChild(expandCollapseButton);
        expandCollapseButton.addEventListener("click", () => {
            expanded = !expanded;
            draw();
        });
    };

    const drawName = () => {
        if (name) name.remove();
        name = document.createElement("h2");
        name.classList.add("to-do-item-name", "no-select");
        name.textContent = toDoItem.getName();
        topBarInformation.appendChild(name);
    };

    const drawDueDate = () => {
        if (dueDate) dueDate.remove();
        dueDate = document.createElement("h4");
        dueDate.classList.add("to-do-item-due-date", "no-select");
        let duration = intervalToDuration({
            start: new Date(),
            end: toDoItem.getDueDate(),
        });
        const units = [
            "years",
            "months",
            "weeks",
            "days",
            "hours",
            "minutes",
            "seconds",
        ];
        const nonzero = Object.entries(duration)
            .filter(([_, value]) => value || 0 > 0)
            .map(([unit, _]) => unit);
        const remainingTimeFormat = formatDuration(duration, {
            format: units.filter((i) => new Set(nonzero).has(i)).slice(0, 2),
            delimiter: ", ",
        });
        let remainingTimeString = ``;
        if (toDoItem.getDueDate() > new Date()) {
            if (remainingTimeFormat.length === 0) {
                remainingTimeString = ` right now`;
            } else {
                remainingTimeString = ` in ${remainingTimeFormat}`;
            }
            dueDate.textContent =
                `Due on ${format(toDoItem.getDueDate(), "do MMMM yyyy")}` +
                remainingTimeString;
        } else {
            topBarInformation.classList.add("overdue");
            if (remainingTimeFormat.length > 0) {
                remainingTimeString = ` for ${remainingTimeFormat}`;
            }
            dueDate.textContent = `Overdue` + remainingTimeString;
        }
        topBarInformation.appendChild(dueDate);
    };

    const drawPriority = () => {
        if (priority) priority.remove();
        priority = document.createElement("div");
        priority.classList.add("to-do-item-priority");
        if (toDoItem) {
            for (let i = 4; i >= 0; i--) {
                let priorityStar = document.createElement("h4");
                priorityStar.classList.add(
                    "to-do-item-priority-star",
                    "material-symbols-sharp",
                    "no-select"
                );
                priorityStar.textContent = "Star";
                if (i >= toDoItem.getPriority()) {
                    priorityStar.classList.add("to-do-item-priority-star-off");
                } else {
                    priorityStar.classList.add("to-do-item-priority-star-on");
                }
                priorityStar.addEventListener("click", () => {
                    toDoItem.setPriority(i + 1);
                    drawPriority();
                });
                priority.appendChild(priorityStar);
            }
        }
        topBarInformation.appendChild(priority);
    };

    const drawDeleteButton = () => {
        if (deleteButton) deleteButton.remove();
        deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "to-do-item-delete-button",
            "material-symbols-rounded"
        );
        deleteButton.textContent = "Delete";
        e.appendChild(deleteButton);
    };

    draw();

    return e;
};
export default domToDoItem;

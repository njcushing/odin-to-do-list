import { format, formatDuration, intervalToDuration } from "date-fns";

const domToDoItem = (item) => {
    let toDoItem = item;
    let expanded = false;
    let e = document.createElement("div");
    e.classList.add("to-do-item");

    const draw = () => {
        while (e.firstChild) e.lastChild.remove();

        if (expanded) e.classList.add("expanded");
        else e.classList.add("collapsed");

        let expandCollapseButton = document.createElement("button");
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

        let topBarInformation = document.createElement("div");
        topBarInformation.classList.add("to-do-item-top-bar-information");
        e.appendChild(topBarInformation);

        let name = document.createElement("h2");
        name.classList.add("to-do-item-name", "no-select");
        name.textContent = toDoItem.getName();
        topBarInformation.appendChild(name);

        let dueDate = document.createElement("h4");
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
        dueDate.textContent = `Due on ${format(
            toDoItem.getDueDate(),
            "do MMMM yyyy"
        )} in 
        ${formatDuration(duration, {
            format: units.filter((i) => new Set(nonzero).has(i)).slice(0, 2),
            delimiter: ", ",
        })}`;
        topBarInformation.appendChild(dueDate);

        let priority = document.createElement("div");
        priority.classList.add("to-do-item-priority");
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
            priority.appendChild(priorityStar);
        }
        topBarInformation.appendChild(priority);

        let editButton = document.createElement("button");
        editButton.classList.add(
            "to-do-item-edit-button",
            "material-symbols-rounded"
        );
        editButton.textContent = "Edit";
        e.appendChild(editButton);

        if (expanded) {
            let expandedInfo = document.createElement("div");
            expandedInfo.classList.add("to-do-item-expanded-information");
            e.appendChild(expandedInfo);
        }
    };
    draw();

    return e;
};
export default domToDoItem;

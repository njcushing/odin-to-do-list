import { format, formatDuration, intervalToDuration } from "date-fns";
import WebFont from "webfontloader";
WebFont.load({
    google: {
        families: ["Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"],
    },
});

const domToDoItem = (item) => {
    let toDoItem = item;
    let expanded = false;
    let panel = document.createElement("div");
    panel.classList.add("to-do-item");

    const draw = () => {
        while (panel.firstChild) panel.lastChild.remove();

        let name = document.createElement("h2");
        name.classList.add("to-do-item-name", "no-select");
        name.textContent = toDoItem.getName();
        panel.appendChild(name);

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
        panel.appendChild(dueDate);

        let priority = document.createElement("div");
        priority.classList.add("to-do-item-priority");
        for (let i = 4; i >= 0; i--) {
            let priorityStar = document.createElement("h4");
            priorityStar.classList.add(
                "to-do-item-priority-star",
                "material-symbols-rounded"
            );
            priorityStar.textContent = "Star";
            if (i >= toDoItem.getPriority()) {
                priorityStar.classList.add("to-do-item-priority-star-off");
            } else {
                priorityStar.classList.add("to-do-item-priority-star-on");
            }
            priority.appendChild(priorityStar);
        }
        panel.appendChild(priority);

        if (expanded) {
        }
    };
    draw();

    return panel;
};
export default domToDoItem;

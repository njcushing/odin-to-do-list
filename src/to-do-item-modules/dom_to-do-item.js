import { format, formatDuration, intervalToDuration } from "date-fns";

const domToDoItem = (item) => {
    let toDoItem = item;
    let expanded = false;
    let panel = document.createElement("div");
    panel.classList.add("to-do-item-panel");

    const draw = () => {
        while (panel.firstChild) panel.lastChild.remove();

        let name = document.createElement("h2");
        name.classList.add("to-do-item-panel-name", "no-select");
        name.textContent = toDoItem.getName();
        panel.appendChild(name);

        console.log(toDoItem);

        let dueDate = document.createElement("h2");
        dueDate.classList.add("to-do-item-due-date", "no-select");
        dueDate.textContent = `Due on ${format(
            toDoItem.getDueDate(),
            "do MMMM yyyy"
        )}`;
        panel.appendChild(dueDate);

        let timeRemaining = document.createElement("h2");
        timeRemaining.classList.add("to-do-item-time-remaining", "no-select");
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
        timeRemaining.textContent = `${formatDuration(duration, {
            format: units.filter((i) => new Set(nonzero).has(i)).slice(0, 3),
            delimiter: ", ",
        })}`;
        panel.appendChild(timeRemaining);
    };
    draw();

    return panel;
};
export default domToDoItem;

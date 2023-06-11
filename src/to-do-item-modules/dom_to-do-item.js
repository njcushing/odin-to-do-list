import { format, formatDuration, intervalToDuration } from "date-fns";

const domToDoItem = (item) => {
    let toDoItem = item;
    let expanded = false;
    let deleteButtonFunction;

    let e = document.createElement("div");
    e.classList.add("to-do-item");

    let expandCollapseButton;
    let topBarInformation;
    let nameLabel;
    let name;
    let dueDate;
    let datePicker;
    let priority;
    let completedItemButton;
    let deleteButton;
    let expandedInfo;
    let description;
    let notes;
    let checklist;

    const setExpanded = (x) => {
        if (typeof x === "boolean") expanded = x;
        draw();
    };

    const setDeleteButtonFunction = (f) => {
        deleteButtonFunction = f;
        if (deleteButton)
            drawDeleteButton(); /* Resetting element here to clear existing eventListener(s) */
    };

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

        if (expanded) {
            drawCompletedItemButton();
            drawDeleteButton();

            expandedInfo = document.createElement("div");
            expandedInfo.classList.add("to-do-item-expanded-information");
            e.appendChild(expandedInfo);

            drawDescription();
            drawNotes();
            drawChecklist();
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
        /* Currently using implicit labelling here which isn't great for
        accessibility - need a unique ID generator or something */
        if (nameLabel) nameLabel.remove();
        nameLabel = document.createElement("label");
        nameLabel.classList.add(
            "to-do-item-edit-name",
            "material-symbols-rounded"
        );
        nameLabel.textContent = "Edit";
        topBarInformation.appendChild(nameLabel);

        if (name) name.remove();
        name = document.createElement("input");
        name.classList.add("to-do-item-name");
        name.setAttribute("type", "text");
        name.setAttribute("minlength", 1);
        name.setAttribute("maxlength", 75);
        name.setAttribute("title", "Please enter a name for your to-do item.");
        name.setAttribute("placeholder", "Please Enter a Name");
        name.value = toDoItem.getName();
        name.addEventListener("input", () => toDoItem.setName(name.value));
        nameLabel.appendChild(name);
    };

    const drawDueDate = () => {
        if (dueDate) dueDate.remove();
        dueDate = document.createElement("h4");
        dueDate.classList.add("to-do-item-due-date", "no-select");
        const updateDueDateString = () => {
            if (toDoItem.getCompleted()) {
                dueDate.textContent = "Completed";
                return;
            }
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
                format: units
                    .filter((i) => new Set(nonzero).has(i))
                    .slice(0, 2),
                delimiter: ", ",
            });
            let remainingTimeString = ``;
            if (toDoItem.getDueDate() > new Date()) {
                e.classList.remove("overdue");
                if (remainingTimeFormat.length === 0) {
                    remainingTimeString = ` right now`;
                } else {
                    remainingTimeString = ` in ${remainingTimeFormat}`;
                }
                dueDate.textContent =
                    `Due on ${format(toDoItem.getDueDate(), "do MMMM yyyy")}` +
                    remainingTimeString;
            } else {
                e.classList.add("overdue");
                if (remainingTimeFormat.length > 0) {
                    remainingTimeString = ` for ${remainingTimeFormat}`;
                }
                dueDate.textContent = `Overdue` + remainingTimeString;
            }
        };
        updateDueDateString();
        topBarInformation.appendChild(dueDate);

        if (datePicker) datePicker.remove();
        datePicker = document.createElement("input");
        datePicker.classList.add("to-do-item-due-date-picker");
        datePicker.setAttribute("type", "datetime-local");
        datePicker.value = toDoItem.getDueDate().toISOString().slice(0, 16);
        datePicker.addEventListener("input", () => {
            toDoItem.setDueDateYear(parseInt(datePicker.value.slice(0, 4)));
            toDoItem.setDueDateMonth(parseInt(datePicker.value.slice(5, 7)));
            toDoItem.setDueDateDay(parseInt(datePicker.value.slice(8, 10)));
            toDoItem.setDueDateHour(parseInt(datePicker.value.slice(11, 13)));
            toDoItem.setDueDateMinute(parseInt(datePicker.value.slice(14, 16)));
            updateDueDateString();
        });
        topBarInformation.appendChild(datePicker);
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

    const drawCompletedItemButton = () => {
        if (completedItemButton) completedItemButton.remove();
        if (toDoItem.getCompleted()) e.classList.add("completed-item");
        completedItemButton = document.createElement("button");
        completedItemButton.classList.add(
            "to-do-item-completed-item-button",
            "material-symbols-rounded"
        );
        completedItemButton.textContent = "Done";
        completedItemButton.addEventListener("click", () => {
            if (toDoItem.getCompleted()) {
                toDoItem.setCompleted(false);
                e.classList.remove("completed-item");
            } else {
                toDoItem.setCompleted(true);
                e.classList.add("completed-item");
            }
            drawDueDate();
        });
        e.appendChild(completedItemButton);
    };

    const drawDeleteButton = () => {
        if (deleteButton) deleteButton.remove();
        deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "to-do-item-delete-button",
            "material-symbols-rounded"
        );
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteButtonFunction);
        e.appendChild(deleteButton);
    };

    const drawDescription = () => {
        if (description) description.remove();
        description = document.createElement("div");
        description.classList.add("to-do-item-description");
        expandedInfo.appendChild(description);

        let descriptionLabel = document.createElement("label");
        descriptionLabel.classList.add("to-do-item-description-label");
        descriptionLabel.textContent = "Description";
        description.appendChild(descriptionLabel);

        let descriptionInput = document.createElement("textarea");
        descriptionInput.classList.add("to-do-item-description-input");
        descriptionInput.setAttribute("placeholder", "No description.");
        descriptionInput.value = toDoItem.getDescription();
        descriptionInput.addEventListener("input", () => {
            toDoItem.setDescription(descriptionInput.value);
            descriptionInput.value = toDoItem.getDescription();
            descriptionInput.style.height = 5 + "px";
            descriptionInput.style.height =
                descriptionInput.scrollHeight + "px";
        });
        descriptionLabel.appendChild(descriptionInput);
        /* Funky stuff to correctly set initial text area sizing based on the content within it */
        descriptionInput.style.height = "0px";
        descriptionInput.style.height = descriptionInput.scrollHeight + "px";
        if (descriptionInput.value === "") {
            descriptionInput.style.height = "0px";
            descriptionInput.value = "a";
            descriptionInput.style.height =
                descriptionInput.scrollHeight + "px";
            descriptionInput.value = "";
        }
    };

    const drawNotes = () => {
        let currentCount = 0;

        if (notes) notes.remove();
        notes = document.createElement("div");
        notes.classList.add("to-do-item-notes");
        expandedInfo.appendChild(notes);

        const noteList = document.createElement("ul");
        noteList.classList.add("to-do-item-notes-list");
        notes.appendChild(noteList);

        const newNoteItem = (text = "") => {
            const newNote = document.createElement("li");
            newNote.classList.add("to-do-item-notes-list-item");
            noteList.appendChild(newNote);

            const newNoteInput = document.createElement("input");
            newNoteInput.classList.add("to-do-item-notes-list-item-input");
            newNoteInput.setAttribute("type", "text");
            newNoteInput.setAttribute("placeholder", "New Item");
            newNoteInput.value = text;
            newNoteInput.addEventListener("input", () => {
                const index = Array.prototype.indexOf.call(
                    noteList.children,
                    newNote
                );
                toDoItem.setNote(index, newNoteInput.value);
            });
            newNote.appendChild(newNoteInput);

            const newNoteDeleteButton = document.createElement("button");
            newNoteDeleteButton.classList.add(
                "to-do-item-notes-list-item-delete-button",
                "material-symbols-rounded"
            );
            newNoteDeleteButton.textContent = "Delete";
            newNoteDeleteButton.addEventListener("click", () => {
                const index = Array.prototype.indexOf.call(
                    noteList.children,
                    newNote
                );
                toDoItem.removeNote(index);
                newNote.remove();
            });
            newNote.appendChild(newNoteDeleteButton);

            currentCount++;
        };

        toDoItem.getNotes().forEach((text) => newNoteItem(text));

        const newNoteButton = document.createElement("button");
        newNoteButton.classList.add(
            "to-do-item-notes-new-note-button",
            "material-symbols-rounded"
        );
        newNoteButton.textContent = "Add";
        newNoteButton.addEventListener("click", () => {
            toDoItem.newNote("");
            newNoteItem();
        });
        notes.appendChild(newNoteButton);
    };

    const drawChecklist = () => {
        if (checklist) checklist.remove();
        checklist = document.createElement("div");
        checklist.classList.add("to-do-item-checklist");

        expandedInfo.appendChild(checklist);
    };

    const refresh = () => {
        drawDueDate();
    };

    draw();

    return {
        e,
        setExpanded,
        setDeleteButtonFunction,
        refresh,
    };
};
export default domToDoItem;

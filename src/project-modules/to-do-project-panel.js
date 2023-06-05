import { format } from "date-fns";
import WebFont from "webfontloader";
WebFont.load({
    google: {
        families: ["Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"],
    },
});

const toDoProjectPanel = (project) => {
    const toDoList = project.getToDoItems();

    let panel = document.createElement("div");
    panel.classList.add("project-panel");

    let projectName = document.createElement("h2");
    projectName.classList.add("project-panel-name", "no-select");
    projectName.textContent = project.getName();
    panel.appendChild(projectName);

    let projectNumberOfItems = document.createElement("h6");
    projectNumberOfItems.classList.add(
        "project-panel-number-of-items",
        "no-select"
    );
    projectNumberOfItems.textContent = `Number of Items: ${toDoList.length}`;
    panel.appendChild(projectNumberOfItems);

    let projectDateCreated = document.createElement("h4");
    projectDateCreated.classList.add("project-panel-date-created", "no-select");
    projectDateCreated.textContent = `Created ${format(
        project.getDateCreated(),
        "do MMMM yyyy"
    )}`;
    panel.appendChild(projectDateCreated);

    let separator = document.createElement("div");
    separator.classList.add("project-panel-separator");
    panel.appendChild(separator);

    let buttons = document.createElement("div");
    buttons.classList.add("project-panel-buttons-container");

    let editButton = document.createElement("button");
    editButton.classList.add(
        "project-panel-buttons-edit",
        "material-symbols-rounded",
        "no-select"
    );
    editButton.textContent = "Edit";
    buttons.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add(
        "project-panel-buttons-delete",
        "material-symbols-rounded",
        "no-select"
    );
    deleteButton.textContent = "Delete";
    buttons.appendChild(deleteButton);

    panel.appendChild(buttons);

    return panel;
};
export default toDoProjectPanel;

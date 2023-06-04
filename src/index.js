import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";
import { format } from "date-fns";
import WebFont from "webfontloader";

const displayController = (() => {
    let page;
    let header;
    let content;
    let currentProject = -1;

    const createPage = (() => {
        page = document.createElement("div");
        page.classList.add("page");
        document.querySelector("body").appendChild(page);
        header = document.createElement("div");
        header.classList.add("header");
        page.appendChild(header);
        content = document.createElement("div");
        content.classList.add("content");
        page.appendChild(content);

        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "Placeholder Title";
        header.appendChild(title);
    })();

    const projects = (() => {
        let projectList = [];

        const newProject = (n) => {
            const newProject = toDoProject(n);
            projectList.push(newProject);
            return newProject;
        };
        const getProjects = () => {
            return projectList;
        };

        return {
            newProject,
            getProjects,
        };
    })();

    projects.newProject("test-project-1");
    projects.newProject("test-project-2");
    projects.newProject("test-project-3");
    projects.newProject("test-project-4");

    const refreshContent = () => {
        if (!content) return;
        while (content.firstChild) content.remove(content.lastChild);
        if (currentProject === -1) displayProjectList();
        else displayProject();
    };

    const displayProjectList = () => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        content.appendChild(projectContainer);

        const projectList = projects.getProjects();
        for (let i = 0; i < projectList.length; i++) {
            projectContainer.appendChild(createProjectPanel(projectList[i]));
        }

        let newProjectPanel = document.createElement("div");
        newProjectPanel.classList.add("new-project-panel");
        projectContainer.appendChild(newProjectPanel);

        let newProjectName = document.createElement("h2");
        newProjectName.classList.add("new-project-panel-name", "no-select");
        newProjectName.textContent = "New Project";
        newProjectPanel.appendChild(newProjectName);

        let newProjectPlus = document.createElement("h2");
        newProjectPlus.classList.add("new-project-panel-plus", "no-select");
        newProjectPlus.textContent = "+";
        newProjectPanel.appendChild(newProjectPlus);
    };

    const createProjectPanel = (project) => {
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
        projectDateCreated.classList.add(
            "project-panel-date-created",
            "no-select"
        );
        projectDateCreated.textContent = `Created ${format(
            project.getDateCreated(),
            "do MMMM yyyy"
        )}`;
        panel.appendChild(projectDateCreated);

        let separator = document.createElement("div");
        separator.classList.add("project-panel-separator");
        panel.appendChild(separator);

        panel.appendChild(createProjectPanelButtons());

        return panel;
    };
    const createProjectPanelButtons = () => {
        let buttons = document.createElement("div");
        buttons.classList.add("project-panel-buttons-container");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "project-panel-buttons-delete",
            "material-symbols-rounded"
        );
        deleteButton.textContent = "Schedule";
        buttons.appendChild(deleteButton);

        return buttons;
    };

    const displayProject = () => {};

    refreshContent();
})();

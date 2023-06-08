import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";
import domToDoProject from "./project-modules/dom_to-do-project.js";
import domToDoItem from "./to-do-item-modules/dom_to-do-item.js";
import projectListTabStyles from "./styles/styles-tab-projectlist.lazy.css";
import projectTabStyles from "./styles/styles-tab-project.lazy.css";
import WebFont from "webfontloader";
WebFont.load({
    google: {
        families: ["Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"],
    },
});

const displayController = (() => {
    let page;
    let header;
    let title;
    let content;
    let newProjectFormCover;
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

        title = document.createElement("h1");
        title.classList.add("title");
        header.appendChild(title);
    })();

    const projects = (() => {
        let projectList = [];

        const newProject = (n) => {
            projectList.forEach((project) => {
                if (project.name === n) {
                    alert("This project name is already taken.");
                    return null;
                }
            });
            const newProject = toDoProject(n);
            projectList.push({
                name: n,
                project: newProject,
            });
            return newProject;
        };
        const getProjects = () => {
            return projectList;
        };
        const removeProject = (n) => {
            for (let i = 0; i < projectList.length; i++) {
                if (projectList[i].name === n) projectList.splice(i, 1);
            }
        };

        return {
            newProject,
            getProjects,
            removeProject,
        };
    })();

    const p1 = projects.newProject("test-project-1");
    const p1_i1 = p1.addToDoItem();
    p1_i1.setName("test-item-1");
    p1_i1.setDueDateYear(2024);
    p1_i1.setDueDateMonth(11);
    p1_i1.setPriority(3);
    const p1_i2 = p1.addToDoItem();
    p1_i2.setName("test-item-2");
    p1_i2.setDueDateYear(2025);
    p1_i2.setDueDateMonth(3);
    const p1_i3 = p1.addToDoItem();
    p1_i3.setName("test-item-3");
    p1_i3.setDueDateYear(2027);
    p1_i3.setDueDateMonth(1);

    projects.newProject("test-project-2");
    projects.newProject("test-project-3");
    projects.newProject("test-project-4");

    const refreshContent = () => {
        if (!content) return;
        while (content.firstChild) content.lastChild.remove();
        closeNewProjectForm();
        projectListTabStyles.unuse();
        projectTabStyles.unuse();
        title.textContent = "My Projects";
        if (currentProject === -1) {
            projectListTabStyles.use();
            displayProjectList();
        } else {
            projectTabStyles.use();
            displayProject();
        }
    };

    const displayProjectList = () => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        content.appendChild(projectContainer);

        const projectList = projects.getProjects();
        for (let i = 0; i < projectList.length; i++) {
            const newPanel = domToDoProject(projectList[i].project);
            newPanel.panel.setAttribute("index", i);
            projectContainer.appendChild(newPanel.panel);
            newPanel.editButton.addEventListener("click", () => {
                currentProject = newPanel.panel.getAttribute("index");
                refreshContent();
            });
            newPanel.deleteButton.addEventListener("click", () => {
                const projectList = projects.getProjects();
                projects.removeProject(
                    projectList[newPanel.panel.getAttribute("index")].name
                );
                newPanel.panel.remove();
                for (let i = 0; i < projectContainer.children.length; i++) {
                    projectContainer.children[i].setAttribute("index", i);
                }
            });
        }

        let newProjectPanel = document.createElement("div");
        newProjectPanel.classList.add("new-project-panel");
        projectContainer.appendChild(newProjectPanel);
        newProjectPanel.addEventListener("click", displayNewProjectForm);

        let newProjectName = document.createElement("h2");
        newProjectName.classList.add("new-project-panel-name", "no-select");
        newProjectName.textContent = "New Project";
        newProjectPanel.appendChild(newProjectName);

        let newProjectPlus = document.createElement("h2");
        newProjectPlus.classList.add("new-project-panel-plus", "no-select");
        newProjectPlus.textContent = "+";
        newProjectPanel.appendChild(newProjectPlus);
    };

    const displayProject = () => {
        const project = projects.getProjects()[currentProject];
        const toDoItems = project.project.getToDoItems();

        title.textContent = project.name;

        let toDoListContainer = document.createElement("div");
        toDoListContainer.classList.add("to-do-list-container");
        content.appendChild(toDoListContainer);

        let buttons = document.createElement("div");
        buttons.classList.add("project-buttons-container");
        toDoListContainer.appendChild(buttons);

        let returnToListButton = document.createElement("button");
        returnToListButton.classList.add(
            "project-buttons-return-to-list",
            "material-symbols-rounded",
            "no-select"
        );
        returnToListButton.textContent = "Format_List_Bulleted";
        buttons.appendChild(returnToListButton);
        returnToListButton.addEventListener("click", () => {
            currentProject = -1;
            refreshContent();
        });

        let newToDoItemButton = document.createElement("button");
        newToDoItemButton.classList.add(
            "project-buttons-new-to-do-item",
            "material-symbols-rounded",
            "no-select"
        );
        newToDoItemButton.textContent = "Add";
        buttons.appendChild(newToDoItemButton);

        let sortToDoItemsButton = document.createElement("button");
        sortToDoItemsButton.classList.add(
            "project-buttons-sort-to-do-items",
            "material-symbols-rounded",
            "no-select"
        );
        sortToDoItemsButton.textContent = "Sort";
        buttons.appendChild(sortToDoItemsButton);

        let toDoItemsContainer = document.createElement("div");
        toDoItemsContainer.classList.add("project-to-do-items-container");
        toDoListContainer.appendChild(toDoItemsContainer);

        toDoItems.forEach((item) => {
            toDoItemsContainer.appendChild(domToDoItem(item));
        });
    };

    const displayNewProjectForm = () => {
        newProjectFormCover = document.createElement("div");
        newProjectFormCover.classList.add("new-project-form-cover");
        content.appendChild(newProjectFormCover);

        const newProjectForm = document.createElement("div");
        newProjectForm.classList.add("new-project-form");
        newProjectFormCover.appendChild(newProjectForm);

        const closeButton = document.createElement("button");
        closeButton.classList.add(
            "new-project-form-close-button",
            "material-symbols-rounded"
        );
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", closeNewProjectForm);
        newProjectForm.appendChild(closeButton);
    };
    const closeNewProjectForm = () => {
        if (newProjectFormCover) newProjectFormCover.remove();
    };

    refreshContent();
})();

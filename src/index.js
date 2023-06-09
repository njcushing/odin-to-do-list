import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";
import domToDoProject from "./project-modules/dom_to-do-project.js";
import domToDoItem from "./to-do-item-modules/dom_to-do-item.js";
import projectListTabStyles from "./styles/styles-tab-projectlist.lazy.css";
import projectTabStyles from "./styles/styles-tab-project.lazy.css";

const displayController = (() => {
    let page;
    let header;
    let title;
    let content;
    let newProjectFormCover;
    let currentProject = 0;

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
            for (let i = 0; i < projectList.length; i++) {
                if (projectList[i].name === n) {
                    console.log("This project name is already taken.");
                    return null;
                }
            }
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

    const displayNewProjectForm = () => {
        newProjectFormCover = document.createElement("div");
        newProjectFormCover.classList.add("new-project-form-cover");
        content.appendChild(newProjectFormCover);

        const newProjectForm = document.createElement("form");
        newProjectForm.classList.add("new-project-form");
        newProjectForm.addEventListener("submit", submitNewProjectForm);
        newProjectFormCover.appendChild(newProjectForm);

        const closeButton = document.createElement("button");
        closeButton.classList.add(
            "new-project-form-close-button",
            "material-symbols-rounded"
        );
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", closeNewProjectForm);
        newProjectForm.appendChild(closeButton);

        const projectName = document.createElement("li");
        projectName.classList.add("new-project-form-name");
        newProjectForm.appendChild(projectName);
        const projectNameInput = document.createElement("input");
        projectNameInput.setAttribute("type", "text");
        projectNameInput.setAttribute("name", "project-name");
        projectNameInput.setAttribute("id", "project-name");
        projectNameInput.setAttribute("minlength", 1);
        projectNameInput.setAttribute("maxlength", 75);
        projectNameInput.setAttribute(
            "title",
            "Please enter a name for your project using only alphanumeric characters, hyphens, underscores and spaces."
        );
        projectNameInput.setAttribute("required", true);
        projectNameInput.setAttribute("placeholder", " ");
        projectNameInput.setAttribute("pattern", "[A-Za-z0-9 _\\-']+");
        projectNameInput.addEventListener("input", () => {
            const avail = checkNewProjectNameIsAvailable(
                projectNameInput.value
            );
            console.log(avail);
            if (avail) projectNameInput.classList.remove("name-taken");
            else projectNameInput.classList.add("name-taken");
        });
        projectName.appendChild(projectNameInput);
        const projectNameLabel = document.createElement("label");
        projectNameLabel.setAttribute("for", "project-name");
        projectNameLabel.setAttribute("help", "This name is already taken.");
        projectNameLabel.textContent = "Project Name";
        projectName.appendChild(projectNameLabel);

        const createProjectButton = document.createElement("button");
        createProjectButton.classList.add(
            "new-project-form-create-project-button",
            "material-symbols-rounded"
        );
        createProjectButton.setAttribute("type", "submit");
        createProjectButton.textContent = "Done";
        newProjectForm.appendChild(createProjectButton);
    };
    const closeNewProjectForm = () => {
        if (newProjectFormCover) newProjectFormCover.remove();
    };
    const submitNewProjectForm = (form) => {
        form.preventDefault();
        const formData = Object.fromEntries(
            new FormData(form.target).entries()
        );
        const avail = checkNewProjectNameIsAvailable(formData["project-name"]);
        if (avail) {
            projects.newProject(formData["project-name"]);
            refreshContent();
        }
    };
    const checkNewProjectNameIsAvailable = (name) => {
        const projectList = projects.getProjects();
        for (let i = 0; i < projectList.length; i++) {
            if (projectList[i].name === name) {
                return false;
            }
        }
        return true;
    };

    const displayProject = () => {
        const project = projects.getProjects()[currentProject];
        const toDoItems = project.project.getToDoItems();
        let newItemBeingCreated = false;

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
        newToDoItemButton.addEventListener("click", () => {
            if (!newItemBeingCreated) {
                newItemBeingCreated = true;
                let newItem = project.project.addToDoItem();
                toDoItemsContainer.insertBefore(
                    domToDoItem(newItem),
                    toDoItemsContainer.childNodes[0]
                );
            }
        });
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

    refreshContent();
})();

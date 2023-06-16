import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";
import domToDoProject from "./project-modules/dom_to-do-project.js";
import domToDoProjectSortMenu from "./project-modules/dom_to-do-project-sort-menu.js";
import toDoItem from "./to-do-item-modules/to-do-item.js";
import domToDoItem from "./to-do-item-modules/dom_to-do-item.js";
import projectListTabStyles from "./styles/styles-tab-projectlist.lazy.css";
import projectTabStyles from "./styles/styles-tab-project.lazy.css";
import { storageAvailable } from "./useful.js";

const displayController = (() => {
    const page = document.createElement("div");
    page.classList.add("page");
    document.querySelector("body").appendChild(page);
    const header = document.createElement("div");
    header.classList.add("header");
    page.appendChild(header);
    let title;
    let projectNameLabel;
    let projectNameInput;
    const content = document.createElement("div");
    content.classList.add("content");
    page.appendChild(content);
    let newProjectFormCover;
    let currentProject = -1;
    const maxProjectAllowance = 100;

    const projects = (() => {
        let projectList = [];

        const newProject = (n) => {
            if (projectList.length < maxProjectAllowance) {
                for (let i = 0; i < projectList.length; i++) {
                    const listProject = JSON.parse(projectList[i]);
                    if (listProject.name === n) return null;
                }
                const project = toDoProject(n);
                projectList.push(project.toJSON());
                saveProjectsToLocalStorage();
                return newProject;
            }
            return null;
        };
        const checkProjectNameIsAvailable = (name) => {
            for (let i = 0; i < projectList.length; i++) {
                const parsedProject = toDoProject();
                parsedProject.fromJSON(projectList[i]);
                if (parsedProject.getName() === name) {
                    return false;
                }
            }
            return true;
        };
        const setProject = (i, project) => {
            if (i < 0 || i > projectList.length) return;
            projectList[i] = project;
        };
        const getProjects = () => projectList;
        const removeProject = (i) => {
            if (i < 0 || i > projectList.length) return;
            projectList.splice(i, 1);
            saveProjectsToLocalStorage();
        };
        const loadProjectsFromLocalStorage = () => {
            projectList = JSON.parse(localStorage.getItem("projects") || "[]");
        };
        const saveProjectsToLocalStorage = () => {
            localStorage.setItem("projects", JSON.stringify(projectList));
        };

        if (storageAvailable("localStorage")) {
            if (!localStorage.getItem("projects")) {
                currentProject = 0;
                newProject("My New Project");
            } else {
                loadProjectsFromLocalStorage();
            }
        }

        return {
            newProject,
            checkProjectNameIsAvailable,
            setProject,
            getProjects,
            removeProject,
            loadProjectsFromLocalStorage,
            saveProjectsToLocalStorage,
        };
    })();

    const refreshContent = () => {
        if (!content) return;
        while (content.firstChild) content.lastChild.remove();
        if (title) title.remove();
        if (projectNameLabel) projectNameLabel.remove();
        if (projectNameInput) projectNameInput.remove();
        closeNewProjectForm();
        projectListTabStyles.unuse();
        projectTabStyles.unuse();
        if (currentProject === -1) {
            projectListTabStyles.use();
            displayProjectList();
        } else {
            projectTabStyles.use();
            displayProject();
        }
    };

    const displayProjectList = () => {
        title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "My Projects";
        header.appendChild(title);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        content.appendChild(projectContainer);

        let counter = 0;
        const projectList = projects.getProjects();
        for (let i = 0; i < projectList.length; i++) {
            const current = counter;
            const parsedProject = toDoProject();
            parsedProject.fromJSON(projectList[i]);
            const newPanel = domToDoProject(parsedProject);
            projectContainer.appendChild(newPanel.panel);
            newPanel.editButton.addEventListener("click", () => {
                currentProject = current;
                refreshContent();
            });
            newPanel.deleteButton.addEventListener("click", () => {
                projects.removeProject(newPanel.panel.getAttribute("index"));
                newPanel.panel.remove();
                for (let i = 0; i < projectContainer.children.length; i++) {
                    projectContainer.children[i].setAttribute("index", i);
                }
            });
            counter++;
        }

        const newProjectPanel = document.createElement("div");
        newProjectPanel.classList.add("new-project-panel");
        projectContainer.appendChild(newProjectPanel);
        newProjectPanel.addEventListener("click", displayNewProjectForm);

        const newProjectName = document.createElement("h2");
        newProjectName.classList.add("new-project-panel-name", "no-select");
        newProjectName.textContent = "New Project";
        newProjectPanel.appendChild(newProjectName);

        const newProjectPlus = document.createElement("h2");
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

        const projectNameContainer = document.createElement("li");
        projectNameContainer.classList.add("new-project-form-name");
        recreateProjectNameInput();
        projectNameInput.addEventListener("input", () => {
            const avail = projects.checkProjectNameIsAvailable(
                projectNameInput.value
            );
            if (avail) projectNameInput.classList.remove("name-taken");
            else projectNameInput.classList.add("name-taken");
        });
        projectNameContainer.appendChild(projectNameInput);
        projectNameContainer.appendChild(projectNameLabel);
        newProjectForm.appendChild(projectNameContainer);

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
        const avail = projects.checkProjectNameIsAvailable(
            formData["project-name"]
        );
        if (avail) {
            projects.newProject(formData["project-name"]);
            refreshContent();
        }
    };

    const displayProject = () => {
        const project = toDoProject();
        project.fromJSON(projects.getProjects()[currentProject]);

        recreateProjectNameInput();
        projectNameInput.value = project.getName();
        projectNameInput.addEventListener("input", () => {
            const avail = projects.checkProjectNameIsAvailable(
                projectNameInput.value
            );
            if (avail || projectNameInput.value === project.getName()) {
                projectNameInput.classList.remove("name-taken");
            } else projectNameInput.classList.add("name-taken");
        });
        projectNameInput.addEventListener("focusout", () => {
            const avail = projects.checkProjectNameIsAvailable(
                projectNameInput.value
            );
            if (avail && projectNameInput.checkValidity()) {
                project.setName(projectNameInput.value);
            }
        });
        header.appendChild(projectNameInput);
        projectNameLabel.classList.add("material-symbols-rounded");
        projectNameLabel.textContent = "Edit";
        header.appendChild(projectNameLabel);

        const toDoListContainer = document.createElement("div");
        toDoListContainer.classList.add("to-do-list-container");
        content.appendChild(toDoListContainer);

        const buttons = document.createElement("div");
        buttons.classList.add("project-buttons-container");
        toDoListContainer.appendChild(buttons);

        const returnToListButton = document.createElement("button");
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

        const saveProjectButton = document.createElement("button");
        saveProjectButton.classList.add(
            "project-buttons-save-project",
            "material-symbols-rounded",
            "no-select"
        );
        saveProjectButton.textContent = "Save";
        buttons.appendChild(saveProjectButton);
        saveProjectButton.addEventListener("click", () => {
            commitWorkingProject();
        });

        const newToDoItemsContainer = document.createElement("div");
        newToDoItemsContainer.classList.add("project-to-do-items-container");
        toDoListContainer.appendChild(newToDoItemsContainer);

        const newToDoItemButton = document.createElement("button");
        newToDoItemButton.classList.add(
            "project-buttons-new-to-do-item",
            "material-symbols-rounded",
            "no-select"
        );
        newToDoItemButton.textContent = "Add";
        newToDoItemButton.addEventListener("click", () => {
            if (
                project.getToDoItems().length +
                    newToDoItemsContainer.children.length <
                project.getMaxItemsAllowance()
            ) {
                const newItem = toDoItem();
                newItem.setUniqueID(project.getNewUniqueID());
                const newItemElement = domToDoItem(newItem);
                newItemElement.e.classList.add("newly-created-item");
                newToDoItemsContainer.appendChild(newItemElement.e);

                newItemElement.setExpanded(true);

                const confirmButton = document.createElement("button");
                confirmButton.classList.add(
                    "to-do-item-confirm-button",
                    "material-symbols-rounded"
                );
                confirmButton.textContent = "Add";
                confirmButton.addEventListener("click", () => {
                    newToDoItemsContainer.removeChild(newItemElement.e);
                    const itemJSON = newItem.toJSON();
                    project.appendExistingToDoItem(itemJSON);
                    drawToDoItems();
                });

                newItemElement.setDeleteButtonFunction(() => {
                    newToDoItemsContainer.removeChild(newItemElement.e);
                });

                newItemElement.e.appendChild(confirmButton);
            }
        });
        buttons.appendChild(newToDoItemButton);

        const refreshToDoItemsButton = document.createElement("button");
        refreshToDoItemsButton.classList.add(
            "project-buttons-refresh-to-do-items",
            "material-symbols-rounded",
            "no-select"
        );
        refreshToDoItemsButton.textContent = "Refresh";
        refreshToDoItemsButton.addEventListener("click", () => {
            drawToDoItems();
        });
        buttons.appendChild(refreshToDoItemsButton);

        const sortToDoItemsButton = document.createElement("button");
        sortToDoItemsButton.classList.add(
            "project-buttons-sort-to-do-items",
            "material-symbols-rounded",
            "no-select"
        );
        sortToDoItemsButton.textContent = "Sort";
        sortToDoItemsButton.addEventListener("click", (event) => {
            sortToDoItemsDropDownMenu.classList.add("open");
            checkClickedOutside(sortToDoItemsDropDownMenu);
            event.stopPropagation();
        });
        buttons.appendChild(sortToDoItemsButton);

        let sortToDoItemsDropDownMenu = domToDoProjectSortMenu(project);
        buttons.appendChild(sortToDoItemsDropDownMenu);
        const sortOrderGroups = sortToDoItemsDropDownMenu.querySelectorAll(
            ".to-do-items-sort-menu-order-list-item"
        );
        sortOrderGroups.forEach((sortOrderGroup) => {
            sortOrderGroup.addEventListener("click", () => {
                sortToDoItemsDropDownMenu.classList.remove("open");
                saveWorkingProject();
                drawToDoItems();
            });
        });
        const sortTypes = sortToDoItemsDropDownMenu.querySelectorAll(
            ".to-do-items-sort-menu-type"
        );
        sortTypes.forEach((sortType) => {
            sortType.addEventListener("click", () => {
                sortToDoItemsDropDownMenu.classList.remove("open");
                saveWorkingProject();
                drawToDoItems();
            });
        });

        let toDoItemsContainer;
        let toDoItems = [];
        const drawToDoItems = () => {
            if (toDoItemsContainer) toDoItemsContainer.remove();
            toDoItems = [];
            const itemsJSON = project.getToDoItems();
            toDoItemsContainer = document.createElement("div");
            toDoItemsContainer.classList.add("project-to-do-items-container");
            toDoListContainer.appendChild(toDoItemsContainer);
            itemsJSON.forEach((item) => {
                const newItem = toDoItem();
                newItem.fromJSON(item);
                toDoItems.push(newItem);
                const newItemElement = domToDoItem(newItem);
                newItemElement.setDeleteButtonFunction(() => {
                    toDoItemsContainer.removeChild(newItemElement.e);
                    for (let i = 0; i < toDoItems.length; i++) {
                        if (
                            newItem.getUniqueID() === toDoItems[i].getUniqueID()
                        ) {
                            toDoItems.splice(i, 1);
                            project.removeToDoItem(i);
                        }
                    }
                    if (project.getToDoItems().length === 0) drawToDoItems();
                });
                toDoItemsContainer.appendChild(newItemElement.e);
            });
            if (itemsJSON.length === 0) {
                const toDoItemPrompt = document.createElement("div");
                toDoItemPrompt.classList.add("to-do-item-prompt");
                toDoItemPrompt.textContent =
                    "Press the '+' button to add a new to-do item to your project";
                toDoItemsContainer.appendChild(toDoItemPrompt);
            }
        };
        drawToDoItems();

        const saveWorkingProject = () => {
            toDoItems.forEach((item, i) => {
                project.setToDoItem(i, item.toJSON());
            });
        };
        const commitWorkingProject = () => {
            const projectJSON = project.toJSON();
            projects.setProject(currentProject, projectJSON);
            projects.saveProjectsToLocalStorage();
        };
    };

    const recreateProjectNameInput = () => {
        projectNameLabel = document.createElement("label");
        projectNameLabel.classList.add("project-name-label");
        projectNameLabel.setAttribute("for", "project-name");
        projectNameLabel.setAttribute("help", "This name is already taken.");
        projectNameLabel.textContent = "Project Name";

        projectNameInput = document.createElement("input");
        projectNameInput.classList.add("project-name-input");
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
    };

    const checkClickedOutside = (element) => {
        const clickCheck = (event) => {
            if (!element.contains(event.target)) {
                element.classList.remove("open");
                document.removeEventListener("click", clickCheck);
            }
        };
        document.addEventListener("click", clickCheck);
    };

    refreshContent();
})();

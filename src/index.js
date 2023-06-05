import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";
import toDoProjectPanel from "./project-modules/to-do-project-panel.js";
import projectListTabStyles from "./styles/styles-tab-projectlist.lazy.css";
import projectTabStyles from "./styles/styles-tab-project.lazy.css";

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

    projects.newProject("test-project-1");
    projects.newProject("test-project-2");
    projects.newProject("test-project-3");
    projects.newProject("test-project-4");

    const refreshContent = () => {
        if (!content) return;
        while (content.firstChild) content.lastChild.remove();
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
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        content.appendChild(projectContainer);

        const projectList = projects.getProjects();
        for (let i = 0; i < projectList.length; i++) {
            const newPanel = toDoProjectPanel(projectList[i].project);
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
        let buttons = document.createElement("div");
        buttons.classList.add("project-buttons-container");
        content.appendChild(buttons);

        let returnToListButton = document.createElement("button");
        returnToListButton.classList.add(
            "project-buttons-return-to-list",
            "no-select"
        );
        returnToListButton.textContent = "Return to List";
        buttons.appendChild(returnToListButton);
        returnToListButton.addEventListener("click", () => {
            currentProject = -1;
            refreshContent();
        });
    };

    refreshContent();
})();

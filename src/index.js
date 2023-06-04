import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";

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
    };
    const displayProject = () => {};
    const createProjectPanel = () => {
        let panel = document.createElement("div");
        panel.classList.add("project-panel");
        panel.textContent = "placeholder";
        return panel;
    };

    refreshContent();
})();

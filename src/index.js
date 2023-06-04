import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";

const displayController = (() => {
    let page;
    let header;
    let content;
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

    const refreshContent = () => {
        if (!content) return;
        while (content.firstChild) content.remove(content.lastChild);
    };
})();

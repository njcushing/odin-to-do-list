const domToDoProjectSortMenu = (project) => {
    let menuContainer = document.createElement("div");
    menuContainer.classList.add("to-do-items-sort-menu");
    menuContainer.textContent = "Sort Items";

    let dropDownSeparator = document.createElement("div");
    dropDownSeparator.classList.add("to-do-items-sort-menu-separator");
    menuContainer.appendChild(dropDownSeparator);

    const sortGroup = (text) => {
        let grp = document.createElement("div");
        grp.classList.add("to-do-items-sort-menu-group");
        grp.textContent = text;
        menuContainer.appendChild(grp);
    };
    const sortType = (text, group, type) => {
        let typ = document.createElement("button");
        typ.classList.add(
            "to-do-items-sort-menu-type",
            `to-do-items-sort-menu-type-${group}`
        );
        if (project.getSort(group) === type) typ.classList.add("current-sort");
        typ.textContent = text;
        typ.addEventListener("click", () => {
            if (project.getSort(group) === type) {
                project.setSort(group, "NONE");
                typ.classList.remove("current-sort");
            } else {
                project.setSort(group, type);
                const typesInGroupElements = menuContainer.querySelectorAll(
                    `.to-do-items-sort-menu-type-${group}`
                );
                typesInGroupElements.forEach((e) => {
                    e.classList.remove("current-sort");
                });
                if (project.getSort(group) === type)
                    typ.classList.add("current-sort");
            }
        });
        menuContainer.appendChild(typ);
    };
    sortGroup("Date Added");
    sortType("Newest First", "DATE_ADDED", "NEWEST");
    sortType("Oldest First", "DATE_ADDED", "OLDEST");
    sortGroup("Due By");
    sortType("Sooner First", "DUE_BY", "SOONER");
    sortType("Later First", "DUE_BY", "LATER");
    sortGroup("Priority");
    sortType("High to Low", "PRIORITY", "HIGH");
    sortType("Low to High", "PRIORITY", "LOW");
    sortGroup("Status");
    sortType("Incomplete Items First", "STATUS", "INCOMPLETE");
    sortType("Complete Items First", "STATUS", "COMPLETE");
    sortGroup("Alphabetical");
    sortType("Normal", "ALPHABETICAL", "NORMAL");
    sortType("Reversed", "ALPHABETICAL", "REVERSED");

    return menuContainer;
};
export default domToDoProjectSortMenu;

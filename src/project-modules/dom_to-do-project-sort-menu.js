const domToDoProjectSortMenu = (project) => {
    let menuContainer = document.createElement("div");
    menuContainer.classList.add("to-do-items-sort-menu");
    menuContainer.textContent = "Sort Items";

    let sep1 = document.createElement("div");
    sep1.classList.add("to-do-items-sort-menu-separator");
    menuContainer.appendChild(sep1);

    let sortOrderListContainer = document.createElement("div");
    sortOrderListContainer.classList.add("to-do-items-sort-menu-order-list");
    menuContainer.appendChild(sortOrderListContainer);
    const sortOrderGroupList = (text, group) => {
        let sortOrderListItem = document.createElement("div");
        sortOrderListItem.classList.add(
            "to-do-items-sort-menu-order-list-item",
            `to-do-items-sort-menu-order-list-item-${group}`
        );
        sortOrderListItem.textContent = text;
        sortOrderListContainer.appendChild(sortOrderListItem);

        let sortOrderListItemCloseButton = document.createElement("button");
        sortOrderListItemCloseButton.classList.add(
            "to-do-items-sort-menu-order-list-item-remove-button",
            "material-symbols-rounded"
        );
        sortOrderListItemCloseButton.textContent = "Close";
        sortOrderListItemCloseButton.addEventListener("click", () => {
            removeGroupFromSortOrder(group);
            refreshSortGroupTypeItems(group);
            refreshSortOrderGroupListItems();
        });
        sortOrderListItem.appendChild(sortOrderListItemCloseButton);
    };
    const refreshSortOrderGroupListItems = () => {
        const sortOrder = project.getSortOrder();
        const sortOrderGroupListItems = sortOrderListContainer.querySelectorAll(
            `.to-do-items-sort-menu-order-list-item`
        );
        sortOrderGroupListItems.forEach((item) => {
            item.classList.remove("sorting");
            item.classList.add("not-sorting");
        });
        for (let i = 0; i < sortOrder.length; i++) {
            const group = sortOrder[i];
            const sortOrderGroupListItem = sortOrderListContainer.querySelector(
                `.to-do-items-sort-menu-order-list-item-${group}`
            );
            sortOrderGroupListItem.classList.add("sorting");
            sortOrderGroupListItem.classList.remove("not-sorting");
            sortOrderListContainer.insertBefore(
                sortOrderGroupListItem,
                sortOrderListContainer.children[i]
            );
        }
    };

    sortOrderGroupList("Date Added", "DATE_ADDED");
    sortOrderGroupList("Due By", "DUE_BY");
    sortOrderGroupList("Priority", "PRIORITY");
    sortOrderGroupList("Status", "STATUS");
    sortOrderGroupList("Alphabetical", "ALPHABETICAL");
    refreshSortOrderGroupListItems();

    let sortOptionsContainer = document.createElement("div");
    sortOptionsContainer.classList.add("to-do-items-sort-menu-options");
    menuContainer.appendChild(sortOptionsContainer);
    while (sortOptionsContainer.firstChild) {
        sortOptionsContainer.lastChild.remove();
    }
    const sortGroup = (text) => {
        let grp = document.createElement("div");
        grp.classList.add("to-do-items-sort-menu-group");
        grp.textContent = text;
        sortOptionsContainer.appendChild(grp);
    };
    const sortType = (text, group, type) => {
        let sortOrder = project.getSortOrder();
        let typ = document.createElement("button");
        typ.classList.add(
            "to-do-items-sort-menu-type",
            `to-do-items-sort-menu-type-${group}`
        );
        if (
            sortOrder.indexOf(group) !== -1 &&
            project.getSort(group) === type
        ) {
            typ.classList.add("current-sort");
        }
        typ.textContent = text;
        typ.addEventListener("click", () => {
            if (project.getSort(group) === type) {
                removeGroupFromSortOrder(group);
                typ.classList.remove("current-sort");
            } else {
                let sortOrder = project.getSortOrder();
                project.setSort(group, type);
                if (sortOrder.indexOf(group) === -1) {
                    sortOrder.push(group);
                    project.setSort(sortOrder);
                }
                refreshSortGroupTypeItems(group);
                if (project.getSort(group) === type)
                    typ.classList.add("current-sort");
            }
            refreshSortOrderGroupListItems();
        });
        sortOptionsContainer.appendChild(typ);
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

    const removeGroupFromSortOrder = (group) => {
        project.setSort(group, "NONE");
        let sortOrder = project.getSortOrder();
        sortOrder.splice(sortOrder.indexOf(group), 1);
        project.setSortOrder(sortOrder);
    };

    const refreshSortGroupTypeItems = (group) => {
        const typesInGroupElements = sortOptionsContainer.querySelectorAll(
            `.to-do-items-sort-menu-type-${group}`
        );
        typesInGroupElements.forEach((e) => {
            e.classList.remove("current-sort");
        });
    };

    return menuContainer;
};
export default domToDoProjectSortMenu;

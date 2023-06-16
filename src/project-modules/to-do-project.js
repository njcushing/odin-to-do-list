import toDoItem from "../to-do-item-modules/to-do-item.js";

const toDoProject = (n = "Project Name") => {
    let name = "Project Name";
    if (typeof n === "string") name = n;
    let sorts = {
        DATE_ADDED: "NONE",
        DUE_BY: "SOONER",
        PRIORITY: "NONE",
        STATUS: "INCOMPLETE",
        ALPHABETICAL: "NONE",
    };
    let sortOrder = ["STATUS", "DUE_BY"];
    let items = [];
    let itemUniqueID = 0;
    let dateCreated = new Date();
    const maxItemsAllowance = 100;

    const setName = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 75) x = x.slice(0, 75);
        name = x;
    };
    const getName = () => name;

    const setSort = (group, type) => {
        switch (group) {
            case "DATE_ADDED":
                switch (type) {
                    case "NONE":
                        sorts.DATE_ADDED = "NONE";
                        break;
                    case "NEWEST":
                        sorts.DATE_ADDED = "NEWEST";
                        break;
                    case "OLDEST":
                        sorts.DATE_ADDED = "OLDEST";
                        break;
                    default:
                        break;
                }
                break;
            case "DUE_BY":
                switch (type) {
                    case "NONE":
                        sorts.DUE_BY = "NONE";
                        break;
                    case "SOONER":
                        sorts.DUE_BY = "SOONER";
                        break;
                    case "LATER":
                        sorts.DUE_BY = "LATER";
                        break;
                    default:
                        break;
                }
                break;
            case "PRIORITY":
                switch (type) {
                    case "NONE":
                        sorts.PRIORITY = "NONE";
                        break;
                    case "HIGH":
                        sorts.PRIORITY = "HIGH";
                        break;
                    case "LOW":
                        sorts.PRIORITY = "LOW";
                        break;
                    default:
                        break;
                }
                break;
            case "STATUS":
                switch (type) {
                    case "NONE":
                        sorts.STATUS = "NONE";
                        break;
                    case "INCOMPLETE":
                        sorts.STATUS = "INCOMPLETE";
                        break;
                    case "COMPLETE":
                        sorts.STATUS = "COMPLETE";
                        break;
                    default:
                        break;
                }
                break;
            case "ALPHABETICAL":
                switch (type) {
                    case "NONE":
                        sorts.ALPHABETICAL = "NONE";
                        break;
                    case "NORMAL":
                        sorts.ALPHABETICAL = "NORMAL";
                        break;
                    case "REVERSED":
                        sorts.ALPHABETICAL = "REVERSED";
                        break;
                    default:
                        break;
                }
                break;
            default:
                return "";
        }
    };
    const getSort = (group) => {
        switch (group) {
            case "DATE_ADDED":
                return sorts.DATE_ADDED;
            case "DUE_BY":
                return sorts.DUE_BY;
            case "PRIORITY":
                return sorts.PRIORITY;
            case "STATUS":
                return sorts.STATUS;
            case "ALPHABETICAL":
                return sorts.ALPHABETICAL;
            default:
                break;
        }
    };
    const setSortOrder = (ord) => {
        sortOrder = ord;
    };
    const getSortOrder = () => sortOrder;

    const addToDoItem = () => {
        if (items.length < maxItemsAllowance) {
            const newItem = toDoItem();
            newItem.setUniqueID(itemUniqueID);
            itemUniqueID++;
            newItem.toJSON();
            items.push(newItem);
            return newItem;
        }
        return null;
    };
    const getNewUniqueID = () => {
        const newID = itemUniqueID;
        itemUniqueID++;
        return newID;
    };
    const setToDoItem = (i, item) => {
        if (typeof i !== "number") return;
        if (i < 0 || i >= items.length) return;
        items[i] = item;
    };
    const appendExistingToDoItem = (item) => {
        if (items.length < maxItemsAllowance) items.push(item);
    };
    const removeToDoItem = (i) => {
        if (typeof i !== "number") return;
        if (i < 0 || i >= items.length) return;
        items.splice(i, 1);
    };
    const getToDoItem = (x) => {
        if (typeof x !== "number") return;
        if (x < 0 || x >= items.length) return;
        return items[x];
    };
    const getToDoItems = () => {
        items.sort((aJSON, bJSON) => {
            for (let i = 0; i < sortOrder.length; i++) {
                const group = sortOrder[i];
                const a = JSON.parse(aJSON);
                const b = JSON.parse(bJSON);
                const aDateCreated = new Date(a.dateCreated);
                const bDateCreated = new Date(b.dateCreated);
                const aDueDate = new Date(a.dueDate);
                const bDueDate = new Date(b.dueDate);
                switch (group) {
                    case "DATE_ADDED":
                        if (
                            sorts.DATE_ADDED === "NONE" ||
                            aDateCreated === bDateCreated
                        ) {
                            break;
                        }
                        return sorts.DATE_ADDED === "NEWEST"
                            ? aDateCreated - bDateCreated
                            : bDateCreated - aDateCreated;
                    case "DUE_BY":
                        if (sorts.DUE_BY === "NONE" || aDueDate === bDueDate) {
                            break;
                        }
                        return sorts.DUE_BY === "SOONER"
                            ? aDueDate - bDueDate
                            : bDueDate - aDueDate;
                    case "PRIORITY":
                        if (
                            sorts.PRIORITY === "NONE" ||
                            a.priority === b.priority
                        ) {
                            break;
                        }
                        return sorts.PRIORITY === "LOW"
                            ? a.priority - b.priority
                            : b.priority - a.priority;
                    case "STATUS":
                        if (
                            sorts.STATUS === "NONE" ||
                            a.completed === b.completed
                        ) {
                            break;
                        }
                        return sorts.STATUS === "INCOMPLETE"
                            ? a.completed - b.completed
                            : b.completed - a.completed;
                    case "ALPHABETICAL":
                        if (
                            sorts.ALPHABETICAL === "NONE" ||
                            a.name.localeCompare(b.name) === 0
                        ) {
                            break;
                        }
                        return sorts.ALPHABETICAL === "NORMAL"
                            ? a.name.localeCompare(b.name)
                            : b.name.localeCompare(a.name);
                    default:
                        return 0;
                }
            }
            return 0;
        });
        return items;
    };

    const getDateCreated = () => dateCreated;

    const getMaxItemsAllowance = () => maxItemsAllowance;

    const toJSON = () =>
        JSON.stringify({
            name,
            sorts,
            sortOrder,
            items,
            dateCreated,
            itemUniqueID,
        });
    const fromJSON = (json) => {
        const parsed = JSON.parse(json);
        setName(parsed.name);
        sorts = parsed.sorts;
        sortOrder = parsed.sortOrder;
        items = parsed.items;
        dateCreated = new Date(parsed.dateCreated);
        itemUniqueID = parsed.itemUniqueID;
    };

    return {
        setName,
        getName,
        setSort,
        getSort,
        setSortOrder,
        getSortOrder,
        addToDoItem,
        getNewUniqueID,
        setToDoItem,
        appendExistingToDoItem,
        removeToDoItem,
        getToDoItem,
        getToDoItems,
        getDateCreated,
        getMaxItemsAllowance,
        toJSON,
        fromJSON,
    };
};
export default toDoProject;

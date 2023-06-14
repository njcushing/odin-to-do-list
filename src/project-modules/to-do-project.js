import toDoItem from "./../to-do-item-modules/to-do-item.js";

const toDoProject = (n = "Project Name") => {
    let name = "Project Name";
    if (typeof n === "string") name = n;
    let sorts = {
        DATE_ADDED: "NONE",
        DUE_BY: "NONE",
        PRIORITY: "NONE",
        STATUS: "NONE",
        ALPHABETICAL: "NONE",
    };
    let items = [];
    let dateCreated = new Date();

    const setName = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 75) x = x.slice(0, 75);
        name = x;
    };
    const getName = () => {
        return name;
    };

    const setSort = (group, type) => {
        switch (group) {
            case "DATE_ADDED":
                switch (type) {
                    case "NONE":
                        sorts["DATE_ADDED"] = "NONE";
                        break;
                    case "NEWEST":
                        sorts["DATE_ADDED"] = "NEWEST";
                        break;
                    case "OLDEST":
                        sorts["DATE_ADDED"] = "OLDEST";
                        break;
                }
                break;
            case "DUE_BY":
                switch (type) {
                    case "NONE":
                        sorts["DUE_BY"] = "NONE";
                        break;
                    case "SOONER":
                        sorts["DUE_BY"] = "SOONER";
                        break;
                    case "LATER":
                        sorts["DUE_BY"] = "LATER";
                        break;
                }
                break;
            case "PRIORITY":
                switch (type) {
                    case "NONE":
                        sorts["PRIORITY"] = "NONE";
                        break;
                    case "HIGH":
                        sorts["PRIORITY"] = "HIGH";
                        break;
                    case "LOW":
                        sorts["PRIORITY"] = "LOW";
                        break;
                }
                break;
            case "STATUS":
                switch (type) {
                    case "NONE":
                        sorts["STATUS"] = "NONE";
                        break;
                    case "INCOMPLETE":
                        sorts["STATUS"] = "INCOMPLETE";
                        break;
                    case "COMPLETE":
                        sorts["STATUS"] = "COMPLETE";
                        break;
                }
                break;
            case "ALPHABETICAL":
                switch (type) {
                    case "NONE":
                        sorts["ALPHABETICAL"] = "NONE";
                        break;
                    case "NORMAL":
                        sorts["ALPHABETICAL"] = "NORMAL";
                        break;
                    case "REVERSED":
                        sorts["ALPHABETICAL"] = "REVERSED";
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
                return sorts["DATE_ADDED"];
            case "DUE_BY":
                return sorts["DUE_BY"];
            case "PRIORITY":
                return sorts["PRIORITY"];
            case "STATUS":
                return sorts["STATUS"];
            case "ALPHABETICAL":
                return sorts["ALPHABETICAL"];
            default:
                break;
        }
    };

    const addToDoItem = () => {
        let newItem = toDoItem();
        items.push(newItem);
        return newItem;
    };
    const appendExistingToDoItem = (item) => {
        items.push(item);
    };
    const removeToDoItem = (x) => {
        if (typeof x !== "number") return;
        if (x < 0 || x >= items.length) return;
        items.splice(x, 1);
    };
    const getToDoItem = (x) => {
        if (typeof x !== "number") return;
        if (x < 0 || x >= items.length) return;
        return items[x];
    };
    const getToDoItems = () => {
        return items;
    };
    const getToDoItemsSortedDefault = () => {
        let sortedArray = getToDoItems().slice();
        sortedArray.sort((a, b) => {
            if (a.getCompleted() === b.getCompleted()) {
                return a.getDueDate() - b.getDueDate();
            }
            return a.getCompleted() - b.getCompleted();
        });
        return sortedArray;
    };
    const getToDoItemsSortedCustom = (params) => {
        let sortedArray = getToDoItems().slice();
        sortedArray.sort((a, b) => {
            params.forEach((group) => {
                switch (group) {
                    case "DATE_ADDED":
                        if (
                            sorts["DATE_ADDED"] === "NONE" ||
                            a.getDateCreated() === b.getDateCreated()
                        ) {
                            break;
                        }
                        return sorts["DATE_ADDED"] === "NEWEST"
                            ? a.getDateCreated() - b.getDateCreated()
                            : b.getDateCreated() - a.getDateCreated();
                    case "DUE_BY":
                        if (
                            sorts["DUE_BY"] === "NONE" ||
                            a.getDueDate() === b.getDueDate()
                        ) {
                            break;
                        }
                        return sorts["DUE_BY"] === "SOONER"
                            ? a.getDueDate() - b.getDueDate()
                            : b.getDueDate() - a.getDueDate();
                    case "PRIORITY":
                        if (
                            sorts["PRIORITY"] === "NONE" ||
                            a.getPriority() === b.getPriority()
                        ) {
                            break;
                        }
                        return sorts["PRIORITY"] === "LOW"
                            ? a.getPriority() - b.getPriority()
                            : b.getPriority() - a.getPriority();
                    case "STATUS":
                        if (
                            sorts["STATUS"] === "NONE" ||
                            a.getCompleted() === b.getCompleted()
                        ) {
                            break;
                        }
                        return sorts["STATUS"] === "INCOMPLETE"
                            ? a.getCompleted() - b.getCompleted()
                            : b.getCompleted() - a.getCompleted();
                    case "ALPHABETICAL":
                        if (
                            sorts["ALPHABETICAL"] === "NONE" ||
                            a.getName().localeCompare(b.getName()) === 0
                        ) {
                            break;
                        }
                        return sorts["ALPHABETICAL"] === "NORMAL"
                            ? a.getName().localeCompare(b.getName())
                            : b.getName().localeCompare(a.getName());
                }
            });
        });
        return sortedArray;
    };

    const getDateCreated = () => {
        return dateCreated;
    };

    return {
        setName,
        getName,
        setSort,
        getSort,
        addToDoItem,
        appendExistingToDoItem,
        removeToDoItem,
        getToDoItem,
        getToDoItems,
        getToDoItemsSortedDefault,
        getToDoItemsSortedCustom,
        getDateCreated,
    };
};
export default toDoProject;

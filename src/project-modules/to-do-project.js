import toDoItem from "./../to-do-item-modules/to-do-item.js";

const toDoProject = (n = "Project Name") => {
    let name = "Project Name";
    if (typeof n === "string") name = n;
    let sort = "NO_SORT";
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

    const setSort = (x) => {
        if (typeof x !== "string") return;
        sort = x;
    };
    const getSort = () => {
        return sort;
    };

    const addToDoItem = () => {
        let newItem = toDoItem();
        items.push(newItem);
        return newItem;
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

    const getDateCreated = () => {
        return dateCreated;
    };

    return {
        setName,
        getName,
        setSort,
        getSort,
        addToDoItem,
        removeToDoItem,
        getToDoItem,
        getToDoItems,
        getDateCreated,
    };
};
export default toDoProject;

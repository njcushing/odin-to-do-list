import toDoItem from "./../to-do-item-modules/to-do-item.js";

const toDoProject = (n = "Project Name") => {
    let name = "Project Name";
    if (typeof n === "string") name = n;
    let sort = "NO_SORT";
    let items = [];

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
    const getToDoItems = () => {
        return items;
    };

    return {
        setName,
        getName,
        setSort,
        getSort,
        addToDoItem,
        getToDoItems,
    };
};
export default toDoProject;

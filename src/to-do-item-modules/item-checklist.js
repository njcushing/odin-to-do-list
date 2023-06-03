const checklistItem = (n, s) => {
    let name = "Checklist Item";
    if (typeof n === "string") name = n;
    let state = false;
    if (typeof s === "boolean") state = s;

    const setName = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 75) x = x.slice(0, 75);
        name = x;
    };
    const getName = () => {
        return name;
    };

    const setState = (x) => {
        if (typeof x !== "boolean") return;
        state = x;
    };
    const getState = () => {
        return state;
    };

    return {
        setName,
        getName,
        setState,
        getState,
    };
};
export default checklistItem;

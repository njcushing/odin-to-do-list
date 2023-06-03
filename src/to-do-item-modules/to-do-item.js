import { clampNumber, clampDayInMonth } from "./../useful.js";
import checklist from "./item-checklist.js";

const toDoItem = () => {
    let name = "Default Name";
    let description = "Empty";
    let dueDate = new Date();
    let priority = 0;
    let checklistObj = checklist();
    let notes = "Empty";

    const setName = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 75) x = x.slice(0, 75);
        name = x;
    };
    const getName = () => {
        return name;
    };

    const setDescription = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        description = x;
    };
    const getDescription = () => {
        return description;
    };

    const setDueDateYear = (x) => {
        if (typeof x !== "number") return;
        clampNumber(x, new Date.getFullYear(), 3000);
        dueDate.setFullYear(Math.floor(x));
    };
    const setDueDateMonth = (x) => {
        if (typeof x !== "number") return;
        clampNumber(x, 0, 11);
        dueDate.setMonth(Math.floor(x));
    };
    const setDueDateDay = (x) => {
        if (typeof x !== "number") return;
        clampDayInMonth(dueDate.getFullYear(), dueDate.getMonth(), x);
        dueDate.setDate(Math.floor(x));
    };
    const setDueDateHour = (x) => {
        if (typeof x !== "number") return;
        clampNumber(x, 0, 23);
        dueDate.setHours(Math.floor(x));
    };
    const setDueDateMinute = (x) => {
        if (typeof x !== "number") return;
        clampNumber(x, 0, 59);
        dueDate.setMinutes(Math.floor(x));
    };
    const getDueDate = () => {
        return dueDate;
    };

    const setPriority = (x) => {
        if (typeof x !== "number") return;
        clampNumber(x, 0, 5);
        priority = Math.floor(x);
    };
    const getPriority = () => {
        return priority;
    };

    const setNotes = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        notes = x;
    };
    const getNotes = () => {
        return notes;
    };

    return {
        setName,
        getName,
        setDescription,
        getDescription,
        setDueDateYear,
        setDueDateMonth,
        setDueDateDay,
        setDueDateHour,
        setDueDateMinute,
        getDueDate,
        setPriority,
        getPriority,
        setNotes,
        getNotes,
    };
};
export default toDoItem;

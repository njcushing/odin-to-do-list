import { clampNumber, clampDayInMonth } from "./../useful.js";
import checklistItem from "./item-checklist.js";

const toDoItem = () => {
    let name = "New Item";
    let description = "";
    let dueDate = new Date();
    let dateCreated = new Date();
    let priority = 0;
    let notes = [];
    let checklist = [];
    let completed = false;

    dueDate.setDate(dueDate.getDate() + 1);

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
        const getYear = new Date();
        dueDate.setFullYear(Math.floor(x));
    };
    const setDueDateMonth = (x) => {
        /* Takes a month from 1-12 */
        if (typeof x !== "number") return;
        x = clampNumber(x, 1, 12);
        dueDate.setMonth(Math.floor(x - 1));
    };
    const setDueDateDay = (x) => {
        if (typeof x !== "number") return;
        x = clampDayInMonth(dueDate.getFullYear(), dueDate.getMonth() + 1, x);
        dueDate.setDate(Math.floor(x));
    };
    const setDueDateHour = (x) => {
        if (typeof x !== "number") return;
        x = clampNumber(x, 0, 23);
        dueDate.setHours(Math.floor(x));
    };
    const setDueDateMinute = (x) => {
        if (typeof x !== "number") return;
        x = clampNumber(x, 0, 59);
        dueDate.setMinutes(Math.floor(x));
    };
    const getDueDate = () => {
        return dueDate;
    };

    const getDateCreated = () => {
        return dateCreated;
    };

    const setPriority = (x) => {
        if (typeof x !== "number") return;
        x = clampNumber(x, 0, 5);
        priority = Math.floor(x);
    };
    const getPriority = () => {
        return priority;
    };

    const newNote = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        notes.push(x);
    };
    const setNote = (i, x) => {
        if (typeof i !== "number" || i < 0 || i >= notes.length) return;
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        notes[i] = x;
    };
    const getNotes = () => {
        return notes;
    };
    const removeNote = (i) => {
        if (typeof i !== "number" || i < 0 || i >= notes.length) return;
        notes.splice(i, 1);
    };

    const addChecklistItem = (n, s) => {
        checklist.push(checklistItem());
        checklist[checklist.length - 1].setName(n);
        checklist[checklist.length - 1].setState(s);
    };
    const getChecklist = () => {
        return checklist;
    };

    const setCompleted = (x) => {
        if (typeof x !== "boolean") return;
        completed = x;
    };
    const getCompleted = () => {
        return completed;
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
        getDateCreated,
        setPriority,
        getPriority,
        newNote,
        setNote,
        getNotes,
        removeNote,
        addChecklistItem,
        getChecklist,
        setCompleted,
        getCompleted,
    };
};
export default toDoItem;

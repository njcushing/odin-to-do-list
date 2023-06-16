import { clampNumber, clampDayInMonth } from "../useful.js";

const toDoItem = () => {
    let name = "New Item";
    let description = "";
    let dueDate = new Date();
    let dateCreated = new Date();
    let priority = 0;
    let notes = [];
    let checklist = [];
    let completed = false;
    let uniqueID = 0;
    const maxNotesAllowance = 10;
    const maxChecklistAllowance = 10;

    dueDate.setDate(dueDate.getDate() + 1);

    const setName = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 75) x = x.slice(0, 75);
        name = x;
    };
    const getName = () => name;

    const setDescription = (x) => {
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        description = x;
    };
    const getDescription = () => description;

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
    const getDueDate = () => dueDate;

    const getDateCreated = () => dateCreated;

    const setPriority = (x) => {
        if (typeof x !== "number") return;
        x = clampNumber(x, 0, 5);
        priority = Math.floor(x);
    };
    const getPriority = () => priority;

    const newNote = (x) => {
        if (notes.length < maxNotesAllowance) {
            if (typeof x !== "string") return;
            if (x.length > 500) x = x.slice(0, 500);
            notes.push(x);
        }
    };
    const setNote = (i, x) => {
        if (typeof i !== "number" || i < 0 || i >= notes.length) return;
        if (typeof x !== "string") return;
        if (x.length > 500) x = x.slice(0, 500);
        notes[i] = x;
    };
    const getNotes = () => notes;
    const removeNote = (i) => {
        if (typeof i !== "number" || i < 0 || i >= notes.length) return;
        notes.splice(i, 1);
    };

    const newChecklistItem = (n, s) => {
        if (checklist.length < maxChecklistAllowance) {
            checklist.push({ name: n, state: s });
        }
    };
    const setChecklistItemName = (i, n) => {
        if (typeof i !== "number" || i < 0 || i >= checklist.length) return;
        if (typeof n !== "string") return;
        if (n.length > 75) n = n.slice(0, 75);
        checklist[i].name = n;
    };
    const getChecklistItemName = (i) => {
        if (typeof i !== "number" || i < 0 || i >= checklist.length) return;
        return checklist[i].name;
    };
    const setChecklistItemState = (i, s) => {
        if (typeof i !== "number" || i < 0 || i >= checklist.length) return;
        if (typeof s !== "boolean") return;
        checklist[i].state = s;
    };
    const getChecklistItemState = (i) => {
        if (typeof i !== "number" || i < 0 || i >= checklist.length) return;
        return checklist[i].state;
    };
    const getChecklistLength = () => checklist.length;
    const removeChecklistItem = (i) => {
        if (typeof i !== "number" || i < 0 || i >= checklist.length) return;
        checklist.splice(i, 1);
    };

    const setCompleted = (x) => {
        if (typeof x !== "boolean") return;
        completed = x;
    };
    const getCompleted = () => completed;

    const setUniqueID = (x) => {
        uniqueID = x;
    };
    const getUniqueID = () => uniqueID;

    const toJSON = () =>
        JSON.stringify({
            name,
            description,
            dueDate,
            dateCreated,
            priority,
            notes,
            checklist,
            completed,
            uniqueID,
        });
    const fromJSON = (json) => {
        const parsed = JSON.parse(json);
        setName(parsed.name);
        setDescription(parsed.description);
        dueDate = new Date(parsed.dueDate);
        dateCreated = new Date(parsed.dateCreated);
        setPriority(parsed.priority);
        notes = parsed.notes;
        checklist = parsed.checklist;
        setCompleted(parsed.completed);
        uniqueID = parsed.uniqueID;
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
        newChecklistItem,
        setChecklistItemName,
        getChecklistItemName,
        setChecklistItemState,
        getChecklistItemState,
        getChecklistLength,
        removeChecklistItem,
        setCompleted,
        getCompleted,
        setUniqueID,
        getUniqueID,
        toJSON,
        fromJSON,
    };
};
export default toDoItem;

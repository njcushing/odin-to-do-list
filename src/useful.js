/* A library containing useful functions I often use */

const clampNumber = (num, a, b) =>
    Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

const clampDayInMonth = (year, month, day) => {
    /* Provide month between 1-12; it's more readable */
    if (typeof month !== "number" || typeof day !== "number") return 1;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return clampNumber(day, 1, 31);
        case 4:
        case 6:
        case 9:
        case 11:
            return clampNumber(day, 1, 30);
        case 2:
            if (year % 400 === 0) return clampNumber(day, 1, 29);
            else if (year % 100 === 0) return clampNumber(day, 1, 28);
            else if (year % 4 === 0) return clampNumber(day, 1, 29);
            return clampNumber(day, 1, 28);
        default:
            return 1;
    }
};

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

export { clampNumber, clampDayInMonth, storageAvailable };

/* A library containing useful functions I use often */

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

export { clampNumber, clampDayInMonth };
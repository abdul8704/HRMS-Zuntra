export const getFirstOfMonth = (dateInput = new Date()) => {
    const date = new Date(dateInput);
    const firstOfMonth = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
    );
    return firstOfMonth.toISOString(); // Always consistent ISO start of month
};

export const getEndOfDay = (dateInput) => {
    if (typeof dateInput == "string") dateInput = new Date(dateInput);
    dateInput.setHours(23);
    dateInput.setMinutes(59);
    dateInput.setSeconds(59);

    return dateInput.toISOString();
};

export const getToday = () => {
    if (typeof dateInput === "string") dateInput = new Date(dateInput);
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    return now.toISOString();
};

export const getDateNDaysAgo = (n) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - n);
    return pastDate;
};

export const getDate7DaysAgo = () => {
    return getDateNDaysAgo(7);
};

export const getDate30DaysAgo = () => {
    return getDateNDaysAgo(30);
};

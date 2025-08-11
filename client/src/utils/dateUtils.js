export const getFirstOfMonth = (dateInput) => {
    const date = new Date(dateInput);
    return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
}

export const getEndOfDay = (dateInput) => {
    dateInput.setHours(23);
    dateInput.setMinutes(59);
    dateInput.setSeconds(59);

    return dateInput.toISOString();
}

export const getToday = () => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    return now.toISOString()
}

export const getDateNDaysAgo = (n) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - n);
    return pastDate;
}

export const getDate7DaysAgo = () => {
    return getDateNDaysAgo(7);
}

export const getDate30DaysAgo = () => {
    return getDateNDaysAgo(30);
}

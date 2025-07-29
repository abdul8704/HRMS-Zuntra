export const getFirstOfMonth = (dateInput) => {
    const date = new Date(dateInput);
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

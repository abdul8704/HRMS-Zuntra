function dateDiff(deadlineISO) {
    const start = new Date();
    const end = new Date(deadlineISO);

    if (end < start) {
        throw new Error("Deadline has already passed.");
    }

    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    let years = end.getFullYear() - start.getFullYear();
    let tempDate = new Date(start);
    tempDate.setFullYear(tempDate.getFullYear() + years);

    if (tempDate > end) {
        years--;
        tempDate.setFullYear(start.getFullYear() + years);
    }

    let months = 0;
    while (true) {
        const next = new Date(tempDate);
        next.setMonth(next.getMonth() + 1);
        if (next > end) break;
        months++;
        tempDate = next;
    }

    const days = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));

    return [
        `Years: ${years}`,
        `Months: ${months}`,
        `Days: ${days}`,
        `Total days: ${totalDays}`
    ];
}

function formatDateToDDMMYYYY(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

module.exports = { dateDiff, formatDateToDDMMYYYY };

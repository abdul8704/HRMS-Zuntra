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

module.exports = { dateDiff };

function toTimeOnly(date) {
    const d = new Date();
    d.setHours(date.getUTCHours(), date.getUTCMinutes(), 0, 0);
    return d;
}
// Normalize a date to the start of the day in UTC
function normalizeToUTCDate(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

// Return time-only version of a Date in UTC
function toUTCTimeOnly(date) {
    const d = new Date(date);
    return new Date(
        Date.UTC(1970, 0, 1, d.getUTCHours(), d.getUTCMinutes(), 0, 0)
    );
}

function processWorkBreakData(workBreakComposition, todayStr) {
    const today = normalizeDate(new Date(todayStr));

    function normalizeDate(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    const getWeekStart = (date) => {
        // given any date, return the start of the week (Monday)
        const d = normalizeDate(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return normalizeDate(new Date(d.setDate(diff)));
    };

    const formatDate = (dateStr, style = "short") => {
        const d = new Date(dateStr);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        return style === "short"
            ? `${day}/${month}`
            : `${day.toString().padStart(2, "0")}/${month
                  .toString()
                  .padStart(2, "0")}`;
    };

    const getWeekNumber = (d) => {
        const date = normalizeDate(
            new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
        );
        const firstDay = new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)
        );
        const dayOfWeek = firstDay.getUTCDay() || 7;
        const adjusted = date.getUTCDate() + (dayOfWeek - 1);
        return Math.ceil(adjusted / 7);
    };

    const weekStart = getWeekStart(today);
    const weekData = workBreakComposition
        .filter((entry) => {
            const d = normalizeDate(new Date(entry.date));
            return d >= weekStart && d <= today;
        })
        .map((entry) => ({
            name: formatDate(entry.date),
            work: Math.round(entry.work),
            break: Math.round(entry.break),
        }));

    const month = today.getMonth();
    const year = today.getFullYear();
    const firstOfMonth = normalizeDate(new Date(year, month, 1));
    const monthData = {};

    workBreakComposition.forEach((entry) => {
        const d = normalizeDate(new Date(entry.date));
        if (
            d.getFullYear() === year &&
            d.getMonth() === month &&
            d >= firstOfMonth
        ) {
            const weekNum = getWeekNumber(d);
            const key = `Week ${weekNum}`;
            if (!monthData[key]) {
                monthData[key] = { work: 0, break: 0 };
            }
            monthData[key].work += entry.work;
            monthData[key].break += entry.break;
        }
    });

    const sortedWeeks = Object.entries(monthData)
        .sort(
            ([a], [b]) => parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1])
        )
        .slice(0, 4);

    const thisMonthShortened = sortedWeeks.map(
        ([week, { work, break: br }]) => ({
            name: week,
            work: Math.round(work),
            break: Math.round(br),
        })
    );

    const allDays = workBreakComposition.map((entry) => ({
        name: formatDate(entry.date, "short"),
        work: Math.round(entry.work),
        break: Math.round(entry.break),
    }));

    return {
        "this-week": weekData,
        "this-month-shortened": thisMonthShortened,
        "all-days": allDays,
    };
}

module.exports = {
    toTimeOnly,
    normalizeToUTCDate,
    toUTCTimeOnly,
    processWorkBreakData,
};

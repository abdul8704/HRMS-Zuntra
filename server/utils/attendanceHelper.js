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

function parseDateAsUTC(dateStr) {
    const parsed = new Date(dateStr);
    return new Date(
        Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
    );
}


// Return time-only version of a Date in UTC
function toUTCTimeOnly(date) {
    const d = new Date(date);
    return new Date(
        Date.UTC(1970, 0, 1, d.getUTCHours(), d.getUTCMinutes(), 0, 0)
    );
}

function processWorkBreakData(workBreakComposition, todayStr) {
    const today = new Date(todayStr); // already normalized

    const getWeekRange = (date) => {
        const dayOfWeek = date.getDay(); // Sunday = 0
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - dayOfWeek);
        return [sunday];
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${d.getDate()}/${d.getMonth() + 1}`;
    };

    const getWeekNumberInMonth = (date) => {
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfMonth = date.getDate();
        const offset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
        return Math.ceil((dayOfMonth + offset) / 7);
    };

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const workBreakMap = new Map(
        workBreakComposition.map((entry) => [entry.date, entry])
    );

    // === This Week ===
    const [weekStart] = getWeekRange(today);
    const thisWeek = [];

    for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        const dateStr = d.toISOString().split("T")[0];

        if (d > today || d.getMonth() !== currentMonth) {
            // Future date or different month - show nulls
            thisWeek.push({
                name: formatDate(d),
                work: null,
                break: null,
            });
        } else {
            // Valid date - show data or 0
            const data = workBreakMap.get(dateStr);
            thisWeek.push({
                name: formatDate(d),
                work: data ? Math.round(data.work) : 0,
                break: data ? Math.round(data.break) : 0,
            });
        }
    }

    // === This Month Shortened ===
    const monthData = {
        "Week 1": null,
        "Week 2": null,
        "Week 3": null,
        "Week 4": null,
    };

    for (const entry of workBreakComposition) {
        const date = new Date(entry.date);
        if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
            const weekNum = getWeekNumberInMonth(date);
            const key = `Week ${weekNum}`;
            if (!monthData[key]) {
                monthData[key] = { work: 0, break: 0 };
            }
            monthData[key].work += entry.work;
            monthData[key].break += entry.break;
        }
    }

    const thisMonthShortened = Object.entries(monthData).map(([week, val]) => {
        if (!val) {
            return { name: week, work: null, break: null };
        }
        return {
            name: week,
            work: Math.round(val.work),
            break: Math.round(val.break),
        };
    });

    return {
        "this-week": thisWeek,
        "this-month": thisMonthShortened,
    };
}

const formatTime = (inputTime) => {

    const localDate = new Date(inputTime);

    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    return (formattedTime);
}

const convertMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}hr, ${minutes}min`;
};

module.exports = {
    toTimeOnly,
    normalizeToUTCDate,
    toUTCTimeOnly,
    processWorkBreakData,
    parseDateAsUTC,
    formatTime,
    convertMinutes
};
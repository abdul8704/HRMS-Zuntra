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
    if (!dateStr) return NaN;

    // If format is YYYY-MM-DD (no time), parse manually as UTC
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(Date.UTC(y, m - 1, d));
    }

    // Else fallback: let JS parse, then normalize
    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return NaN;

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

function processWorkBreakData(workBreakComposition) {
    const sorted = [...workBreakComposition].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const format = (entries) =>
        entries.map(({ date, name, day, work, break: brk }) => ({
            date,
            name,
            day,
            work: Math.round(work || 0),
            break: Math.round(brk || 0),
        }));

    return {
        last7Days: format(sorted.slice(-7)),
        last30Days: format(sorted.slice(-30)),
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
  return `${hours}H ${minutes}M`;
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
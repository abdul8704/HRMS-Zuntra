function toTimeOnly(date) {
    const d = new Date();
    d.setHours(date.getUTCHours(), date.getUTCMinutes(), 0, 0); // use getHours if local
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
    return new Date(Date.UTC(1970, 0, 1, d.getUTCHours(), d.getUTCMinutes(), 0, 0));
  }
  

module.exports = {
    toTimeOnly,
    normalizeToUTCDate,
    toUTCTimeOnly,
};
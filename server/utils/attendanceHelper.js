function toTimeOnly(date) {
    const d = new Date();
    d.setHours(date.getUTCHours(), date.getUTCMinutes(), 0, 0); // use getHours if local
    return d;
}

module.exports = {
    toTimeOnly
}
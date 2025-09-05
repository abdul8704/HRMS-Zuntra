const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    shiftName: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Shift", shiftSchema);
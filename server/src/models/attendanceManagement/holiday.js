const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    applicableTo: {
        type: String,
        default: "all",
        enum: ['muslim', 'hindu', 'christian'] // TODO: change to constant, set to all religions
    }
})

module.exports = mongoose.model('Holiday', holidaySchema);
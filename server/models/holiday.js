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
        enum: ['muslim', 'hindu', 'christian']
    }
})

module.exports = mongoose.model('Holiday', holidaySchema);
const mongoose = require('mongoose');

const userPersonal = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
    },
    DOB: {
        type: Date,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Salary: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("UserPersonal", userPersonal)
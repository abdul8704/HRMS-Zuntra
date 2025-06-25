const mongoose = require('mongoose');

const userPersonal = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
    },
    DOB: {
        type: Date,
    },
    religion: {
        type: String,
    },
    Address: {
        type: String,
    },
    Salary: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("UserPersonal", userPersonal)
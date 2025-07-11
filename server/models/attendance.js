// models/Attendance.js

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    loginTime: {
        type: Date,
        required: true,
    },
    logoutTime: {
        type: Date,
    },
    mode: {
        type: String,
        enum: ["onsite", "remote", "extra"]
    }
});

const attendanceSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    sessions: [sessionSchema], // multiple login/logout pairs

    workingMinutes: {
        type: Number, // in hours (decimal), e.g. 7.5
        default: 0,
    },

    breakMinutes: {
        type: Number, // in hours (decimal)
        default: 0,
    },

    status: {
        type: String,
        enum: ["present", "remote", "absent"],
        default: "present",
    },
    leaveType: {
        type: String,
        enum: ['casual', 'earned', 'unpaid', 'sick', 'onduty', ''],
        default: '',
    }
});

attendanceSchema.index({ userid: 1, date: 1 }, { unique: true }); // one doc per user per day

module.exports = mongoose.model("Attendance", attendanceSchema);

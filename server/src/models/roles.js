const mongoose = require("mongoose");

const rolesDetail = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    onboardingCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CourseDetails",
    },
    color: {
        type: String,
        default: "#000000",
    },
    baseSalary: {
        type: Number,
        default: 0,
    },
    allowedAccess: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model("rolesDetails", rolesDetail);

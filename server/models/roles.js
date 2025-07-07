const mongoose = require('mongoose')

const rolesDetail = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    onboardingCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CourseDetails",
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    baseSalary: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('rolesDetails', rolesDetail)
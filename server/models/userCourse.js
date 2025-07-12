const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
    },
    enrolledCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "CourseDetails",
    },
    completedCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "CourseDetails",
    },
    assignedCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "CourseDetails",
    }
});

module.exports = mongoose.model("UserCourse", userCourseSchema)
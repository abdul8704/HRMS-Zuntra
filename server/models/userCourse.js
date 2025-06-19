const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
    },
    currentCourses: {
        type: [String],
        default: [],
    },
    completedCourses: {
        type: [String],
        default: [],
    },
    assignedCourses: {
        type: [String],
        default: [],
    }
});

mondule.exports = mongoose.model("UserCourse", userCourseSchema)
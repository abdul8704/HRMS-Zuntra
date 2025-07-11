const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
         type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    percentComplete: {
        // no of true/ mat.length * mat[0].length
        type: Number,
        required: true,
    },
    moduleStatus: {
        totalSubModules: {
            type: Number,
            default: 0,
        },
        completedModules: {
            type: [[Boolean]], // row for each module, column for each submodule
            default: [],
        },
    },
});

module.exports = mongoose.model("CourseProgressData", courseProgressSchema);

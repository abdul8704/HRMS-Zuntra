const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    modules: {
        type: [
            {
                moduleTitle: { type: String, required: true },
                submodules: [
                    {
                        submoduleTitle: { type: String, required: true },
                        description: { type: String, required: true },
                        video: {
                            videoTitle: { type: String, required: true },
                            videoUrl: { type: String, required: true },
                        },
                        quiz: {
                            questions: [
                                {
                                    questionText: {
                                        type: String,
                                        required: true,
                                    },
                                    options: [String], // multiple choice
                                    correctAnswer: {
                                        type: String,
                                        required: true,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model("CourseContent", courseContentSchema);

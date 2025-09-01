const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            index: true,
        },
        phaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Phase",
            index: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials",
        },

        assignment: {
            mode: {
                type: String,
                enum: ["open", "direct"],
                required: true,
                index: true,
            },
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserCredentials",
            }, // required when mode="direct"
            acceptedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserCredentials",
                index: true,
            },
            acceptedAt: { type: Date },
        },

        status: {
            type: String,
            enum: [
                "open",
                "assigned",
                "in_progress",
                "submitted",
                "rework",
                "accepted",
            ],
            default: "open",
            index: true,
        },
        expectedMinutes: { type: Number, min: 0, required: true },
        deadline: Date,

        acceptedAt: Date,
        completedAt: Date,
        review: {
            reviewer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserCredentials",
            },
            status: { type: String, enum: ["accepted", "rework"] },
            comments: String,
            reviewedAt: { type: Date, default: Date.now() },
        },
        history: [
            {
                status: String,
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "UserCredentials",
                },
                at: Date,
                note: String,
            },
        ],
        creditRecorded: { type: Boolean, default: false }, // prevents duplicate credits
    },
    { timestamps: true }
);

taskSchema.index({ assignedTo: 1, status: 1 });
module.exports = mongoose.model("Task", taskSchema);

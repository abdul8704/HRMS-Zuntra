const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["issued", "accepted", "under_review", "rework", "completed"],
            default: "issued",
        },

        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // HR or TL
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Developer
            default: null, // Initially unassigned
        },

        timestamps: {
            issuedAt: { type: Date, default: Date.now }, // when created
            acceptedAt: { type: Date }, // when dev accepted
            submittedForReviewAt: { type: Date }, // when dev marked as done
            completedAt: { type: Date }, // when TL marks complete
            sentForReworkAt: [{ type: Date }], // optional multiple reworks
        },

        comments: [
            {
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                text: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
); // createdAt & updatedAt auto added

module.exports = mongoose.model("Task", taskSchema);

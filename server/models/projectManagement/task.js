import mongoose from "mongoose";

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: String,
        projectId: { type: Schema.Types.ObjectId, ref: "Project", index: true },
        phaseId: { type: Schema.Types.ObjectId, ref: "Phase", index: true },
        teamId: { type: Schema.Types.ObjectId, ref: "Team" },
        createdBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "UserCredentials",
            index: true,
        },
        status: {
            type: String,
            enum: [
                "open",
                "assigned",
                "accepted",
                "in_progress",
                "submitted",
                "review",
                "rework",
                "accepted",
                "closed",
            ],
            default: "open",
            index: true,
        },
        estimatedHours: Number,
        loggedHours: { type: Number, default: 0 }, // in hours (sum of timesheets or manual)
        deadline: Date,
        acceptedAt: Date,
        completedAt: Date,
        review: {
            reviewer: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
            status: { type: String, enum: ["accepted", "rework"] },
            comments: String,
            reviewedAt: Date,
        },
        history: [
            {
                status: String,
                by: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
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

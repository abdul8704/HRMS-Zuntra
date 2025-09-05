const mongoose = require("mongoose");
const { Schema } = mongoose;

const timesheetSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "UserCredentials",
            index: true,
        },
        projectId: { type: Schema.Types.ObjectId, ref: "Project", index: true },
        phaseId: { type: Schema.Types.ObjectId, ref: "Phase" },
        taskId: { type: Schema.Types.ObjectId, ref: "Task" },
        startTime: { type: Date, required: true },
        endTime: { type: Date },
        reviewedBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
        type: {
            type: String,
            enum: ["initial", "rework"],
            default: "initial",
        },
        credit: {
            type: Number,
            enum: [2, 1, 0, -1, -2], // 2 if time taken less than expected, 1 if time taken more than expected
            // , 0 if exactly as expected, -1 rework and time taken higher than expected, -2 if rework and time taken more than deadline
        },
        reviewStatus: {
            type: String,
            enum: ["accepted", "rework"],
        },
    },
    { timestamps: true }
);

timesheetSchema.index({ projectId: 1, userId: 1, startTime: 1 });
module.exports = mongoose.model("Timesheet", timesheetSchema);

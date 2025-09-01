// models/Timesheet.js  (recommended)
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
        endTime: { type: Date, required: true },
        reviewedBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
        type: {
            type: String,
            enum: ["initial", "rework"],
            default: "initial",
        },
        credit: {
            type: Number,
            enum: [1, -1],
        },
        reviewStatus: {
            type: String,
            enum: ["accepted", "rework"],
            default: "accepted",
        },
    },
    { timestamps: true }
);

timesheetSchema.index({ projectId: 1, userId: 1, startTime: 1 });
module.exports = mongoose.model("Timesheet", timesheetSchema);

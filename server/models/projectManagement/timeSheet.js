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
        minutes: { type: Number, required: true }, // derived for quicker aggregation
        billable: { type: Boolean, default: true },
        approved: { type: Boolean, default: false },
        approvedBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
    },
    { timestamps: true }
);

timesheetSchema.index({ projectId: 1, userId: 1, startTime: 1 });
module.exports = mongoose.model("Timesheet", timesheetSchema);

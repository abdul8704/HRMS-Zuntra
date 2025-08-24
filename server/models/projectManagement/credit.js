// models/Credit.js (on creditsConn)
const creditSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "UserCredentials",
            index: true,
        },
        date: { type: Date, required: true, index: true },
        source: {
            type: String,
            enum: ["task_deadline", "manual_adjustment", "admin_rule"],
            required: true,
        },
        taskId: { type: Schema.Types.ObjectId, ref: "Task" }, // optional
        projectId: { type: Schema.Types.ObjectId, ref: "Project" },
        creditValue: { type: Number, required: true }, // positive or negative integer/float
        comment: String,
        recordedBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
        metadata: Schema.Types.Mixed,
    },
    { timestamps: true }
);

creditSchema.index({ userId: 1, date: 1 });
module.exports = creditsConn.model("Credit", creditSchema);

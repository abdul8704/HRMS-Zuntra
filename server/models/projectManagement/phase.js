// models/Phase.js  (a sub-project / phase)
const phaseSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },
        name: { type: String, required: true },
        description: String,
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ["not_started", "ongoing", "completed"],
            default: "not_started",
        },
        // teams assigned to this phase
        teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
        // snapshot of tool usage at the time of recording: preserves cost history
        tools: [
            {
                tool: { type: Schema.Types.ObjectId, ref: "Tool" },
                name: String, // snapshot name
                quantity: Number,
                unitCost: Number, // snapshot unit cost at time
                currency: String,
                totalCost: Number, // quantity * unitCost
            },
        ],
        notes: String,
    },
    { timestamps: true }
);

phaseSchema.index({ project: 1, status: 1 });
module.exports = mongoose.model("Phase", phaseSchema);

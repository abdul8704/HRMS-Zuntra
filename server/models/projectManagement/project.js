const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true, index: true },
    client: {
        name: String,
        contactName: String,
        contactEmail: String,
        contactPhone: String,
        address: String,
    },
    description: String,
    startDate: Date,
    endDate: Date,
    estimatedBudget: Number,
    status: {
        type: String,
        enum: ["not_started", "ongoing", "on_hold", "completed", "cancelled"],
        default: "not_started",
    },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
});

projectSchema.index({ name: 1, "client.name": 1 });
module.exports = mongoose.model("Project", projectSchema);

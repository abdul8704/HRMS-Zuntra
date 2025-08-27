const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials",
            required: true,
            index: true,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
            index: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

membershipSchema.index({ userId: 1, teamId: 1 });
module.exports = mongoose.model("TeamMember", membershipSchema);

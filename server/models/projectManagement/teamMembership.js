// models/TeamMembership.js  (if using Option B)
const membershipSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "UserCredentials",
            required: true,
            index: true,
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
            index: true,
        },
        role: String,
        startDate: Date,
        endDate: Date,
        allocationPercent: { type: Number, default: 100 },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

membershipSchema.index({ userId: 1, teamId: 1 });
module.exports = mongoose.model("TeamMembership", membershipSchema);

const mongoose = require('mongoose')

const leaveApplicationSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials",
            required: true,
        },
        leaveType: {
            type: String,
            enum: ["CASUAL", "SICK", "EARNED", "UNPAID"],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        appliedOn: {
            type: Date,
            default: Date.now(),
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials", // Admin user
        },
        reviewedAt: {
            type: Date,
        },
        reviewComment: {
            type: String,
            default: "",
        },
        superAdminAction: {
            type: Boolean,
            default: false
        },
        adminAction: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);

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
        dates: {
            type: [Date],
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
        adminReviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials", // Admin user
        },
        superAdminReviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCredentials", // Super admin user
        },
        adminReviewedAt: {
            type: Date,
        },
        adminReviewComment: {
            type: String,
            default: "",
        },
        superAdminReviewedAt: {
            type: Date,
        },
        superAdminReviewComment: {
            type: String,
            default: "",
        },
        superAdminAction: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },
        adminAction: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);

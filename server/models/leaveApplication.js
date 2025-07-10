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
            deafult: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Message cannot be empty"],
        maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
        required: true,
    },
    applicableTo: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Team",
    },
    applicableToAll: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Notification", notificationSchema);

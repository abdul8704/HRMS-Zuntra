const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true,
    },
    
    meetingTitle: {
        type: String,
        required: true,
        trim: true,
    },
    meetingDesc: {
        type: String,
        required: true,
        default: "meeting to discuss stuff",
        trim: true,
    },
    modeOfMeet: {
        type: String,
        enum: ["online", "offline"],
        required: true,
        trim: true,
    },
    dateOfMeet: {
        type: Date,
        required: true,
    },
    meetStartTime: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(v);
            },
            message: (props) =>
                `${props.value} is not a valid 12-hour time format (HH:MM AM/PM)!`,
        },
    },
    meetEndTime: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(v);
            },
            message: (props) =>
                `${props.value} is not a valid 12-hour time format (HH:MM AM/PM)!`,
        },
    },

    meetVenue: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("meetings", meetingSchema);

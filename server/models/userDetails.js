const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "default-profile-pic.png",
    },
    role: {
        type: String,
        enum: ["dev", "hr", "team_lead"],
        default: "dev",
    },
    designation: {
        type: String,
        default: "Software Engineer",
    },
    currentCourses: {
        type: [String],
        default: [],
    },
    assignedCourses:{
        type: [String],
        default: [],
    },
    phoneNumber: {
        type: String,
        required: true
    },

});

module.exports =
    mongoose.models.UserDetails ||
    mongoose.model("UserDetails", userDetailsSchema);
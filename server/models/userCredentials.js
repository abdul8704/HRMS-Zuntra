const mongoose = require("mongoose");

const userCredentialsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
    phoneNumber: {
        type: String,
        required: true
    },

});

module.exports =
    mongoose.models.UserCredentials ||
    mongoose.model("UserCredentials", userCredentialsSchema);
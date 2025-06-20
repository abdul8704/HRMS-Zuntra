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
        default: "https://www.pngitem.com/pimgs/m/678-6785829_my-account-instagram-profile-icon-hd-png-download.png",
    },
    role: {
        type: String,
        default: "unassigned"
    },
    phoneNumber: {
        type: String,
        required: true
    },

});

module.exports =
    mongoose.models.UserCredentials ||
    mongoose.model("UserCredentials", userCredentialsSchema);
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
        default:
            "https://www.pngitem.com/pimgs/m/678-6785829_my-account-instagram-profile-icon-hd-png-download.png",
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rolesDetails",
        default: undefined
    },
    phoneNumber: {
        type: String,
    },
    dateJoined: {
        type: Date,
        default: Date.now(),
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        default: undefined  
    },
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeoLocation",
        default: undefined  
    },
});

module.exports =
    mongoose.models.UserCredentials ||
    mongoose.model("UserCredentials", userCredentialsSchema);
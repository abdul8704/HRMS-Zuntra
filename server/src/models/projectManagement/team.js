const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamDescription: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Team", teamSchema);

const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    projectTitle: {
        type: String,
        required: true,
        trim: true,
    },
    projectDesc: {
        type: String,
        required: true,
        trim: true,
    },
    teamName: {
        type: String,
        required: true,
        trim: true,
    },
    teamMembers: {
        type: [String],
        default: []
    },
    teamLeader: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("projectDetails", projectSchema);
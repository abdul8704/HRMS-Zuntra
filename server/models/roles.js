const mongoose = require('mogoose')

const rolesDetail = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    onboarddingCourses:{
        type: [String],
        default: ['cs101']
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('rolesDetails', rolesDetail)
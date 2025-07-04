const mongoose = require('mongoose');

const geoLocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    campusName: {
        type: String,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    embedUrl:{
        type: String,
        required: true
    }
});

const geoLocationModel = mongoose.model('GeoLocation', geoLocationSchema);

module.exports = geoLocationModel;
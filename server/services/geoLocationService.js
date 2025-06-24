const GeoLocation = require("../models/geoLocations")
const GeoUtils = require('../utils/geoFencing')

const isWithinGeofence = async (latitude, longitude, campusName) => {
    const geofence = await GeoLocation.findOne({ campusName: campusName });
    const distance = GeoUtils.getDistanceFromLatLon(latitude, longitude, geofence.latitude, geofence.longitude);
    
    return distance <= geofence.radius;
};

const addNewCampusLocation = async (campusName, latitude, longitude, radius) => {
    const newLocation = new GeoLocation({
        latitude: latitude,
        longitude: longitude,
        campusName: campusName,
        radius: radius
    });
    await newLocation.save();
    return newLocation;
};

module.exports = { 
    isWithinGeofence, 
    addNewCampusLocation 
};
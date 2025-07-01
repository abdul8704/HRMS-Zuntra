const GeoLocation = require("../models/geoLocations")
const GeoUtils = require('../utils/geoFencing')

const isWithinGeofence = async (latitude, longitude, campusId) => {
    const geofence = await GeoLocation.findById(campusId);
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

const getAllCampusLocations = async () => {
    const locations = await GeoLocation.find({});
    return locations;
};

module.exports = { 
    isWithinGeofence, 
    addNewCampusLocation,
    getAllCampusLocations
};
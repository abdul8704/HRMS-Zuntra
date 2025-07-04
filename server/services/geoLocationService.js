const GeoUtils = require("../utils/geoFencing");
const GeoLocation = require("../models/geoLocations");

const isWithinGeofence = async (latitude, longitude, campusId) => {
    try {
        const geofence = await GeoLocation.findById(campusId);
        const distance = GeoUtils.getDistanceFromLatLon(
            latitude,
            longitude,
            geofence.latitude,
            geofence.longitude
        );
        return distance <= geofence.radius;
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to check if within campus radius",
            error.message
        );
    }
};

const addNewCampusLocation = async (
    campusName,
    latitude,
    longitude,
    radius
) => {
    try {
        const newLocation = new GeoLocation({
            latitude: latitude,
            longitude: longitude,
            campusName: campusName,
            radius: radius,
        });
        await newLocation.save();
        return newLocation;
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to add new campus location",
            error.message
        );
    }
};

const getAllCampusLocations = async () => {
    try {
        const locations = await GeoLocation.find({});
        return locations;
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to fetch campus locations",
            error.message
        );
    }
};

module.exports = {
    isWithinGeofence,
    addNewCampusLocation,
    getAllCampusLocations,
};

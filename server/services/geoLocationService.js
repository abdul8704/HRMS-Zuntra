const GeoUtils = require("../utils/geoFencing");
const GeoLocation = require("../models/geoLocations");
const ApiError = require("../errors/ApiError");

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
    embedURL,
    radius
) => {
    try {
        const { lat, lng } = GeoUtils.extractLatLngFromEmbed(embedURL);

        if (!lat || !lng)
            throw new ApiError(
                400,
                "Unable to extract latitude and longitude from the provided embed URL"
            );

        const newLocation = new GeoLocation({
            embedURL: embedURL,
            campusName: campusName,
            radius: radius,
            latitude: lat,
            longitude: lng,
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
        const locations = await GeoLocation.find({}, { campusName: 1, embedURL: 1, _id: 1 });
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

const GeoUtils = require("../utils/geoFencing");
const GeoLocation = require("../models/attendanceManagement/geoLocations");
const ApiError = require("../errors/ApiError");
const UserCreds = require("../models/userCredentials");

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
        if(error instanceof ApiError)
            throw error

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

const editCampusLocation = async (campusId, updates) => {
    const { campusName, embedURL, radius } = updates;
    const campus = await GeoLocation.findById(campusId);
    if (!campus) {
        throw new ApiError(404, "Campus location not found");
    }

    campus.campusName = campusName || campus.campusName;
    campus.embedURL = embedURL || campus.embedURL;
    campus.radius = radius || campus.radius;
    await campus.save();
};

const deleteCampusLocation = async (campusId, newCampusId) => {
    const campus = await GeoLocation.findById(campusId);
    console.log(campusId, newCampusId)
    if (!campus) {
        throw new ApiError(404, "Campus location not found");
    }

    let assignValue = null;

    if (newCampusId) {
        const newCampus = await GeoLocation.findById(newCampusId);
        if (!newCampus) {
            throw new ApiError(404, "New campus location not found");
        }
        assignValue = newCampusId; // only set if exists
    }

    await UserCreds.updateMany(
        { campus: campusId },
        { $set: { campus: assignValue } }
    );

    await GeoLocation.findByIdAndDelete(campusId);
};

module.exports = {
    isWithinGeofence,
    addNewCampusLocation,
    getAllCampusLocations,
    editCampusLocation,
    deleteCampusLocation,
};
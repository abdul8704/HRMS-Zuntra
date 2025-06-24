const asyncHandler = require("express-async-handler");
const GeoService = require("../services/geoLocationService");
const ApiError = require("../errors/ApiError");

const addNewCampusLocation = asyncHandler(async (req, res) => {
    const { campusName, latitude, longitude , radius} = req.body;
    if (!campusName || !latitude || !longitude || !radius)
        throw new ApiError(400, "Incomplete data");

    const newCampus = await GeoService.addNewCampusLocation(campusName, latitude, longitude, radius);
    res.status(201).json({ success: true, campus: newCampus });
})

module.exports = {
    addNewCampusLocation
}
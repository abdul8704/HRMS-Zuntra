const GeoService = require("../services/geoLocationService");
const asyncHandler = require("express-async-handler");

const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await GeoService.getAllCampusLocations();
    res.status(200).json(branches);
});

module.exports = {
    getAllBranches
}

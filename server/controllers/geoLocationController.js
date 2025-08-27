const GeoService = require("../services/geoLocationService");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/ApiError");
const GeoUtils = require("../utils/geoFencing");

const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await GeoService.getAllCampusLocations();
    res.status(200).json({ success: true, branches: branches });
});

const addNewBranch = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { campusName, embedURL, radius } = req.body;

    if (!campusName || !embedURL || !radius) 
        throw new ApiError(400, "Please provide all required fields to add new branch");
    
    const newBranch = await GeoService.addNewCampusLocation( campusName, embedURL, radius );
    res.status(201).json({ success: true, branch: newBranch });
});

const editCampusLocation = asyncHandler(async (req, res) => {
    const { oldCampusId, campusName, embedURL, radius } = req.body;

    if (!campusName && !embedURL && !radius) {
        throw new ApiError(400, "Please provide at least one field to update");
    }

    const updatedCampus = await GeoService.editCampusLocation(oldCampusId, {
        campusName,
        embedURL,
        radius
    });

    res.status(200).json({ success: true, campus: updatedCampus });
});

const deleteCampusLocation = asyncHandler(async (req, res) => {
    const { oldCampusId } = req.query;
    const newCampusId = req.query.newCampusId ? req.query.newCampusId : null;

    await GeoService.deleteCampusLocation(oldCampusId, newCampusId);
    res.status(204).send();
});

module.exports = {
    getAllBranches,
    addNewBranch,
    editCampusLocation,
    deleteCampusLocation
};

const asyncHandler = require("express-async-handler");
const GeoService = require("../services/geoLocationService");
const ApiError = require("../errors/ApiError");
const authService = require("../services/authService")
const UserCreds = require('../models/userCredentials')
const UserPersonal = require('../models/userPersonal')
const UserCourse = require('../models/userCourse')

const addNewCampusLocation = asyncHandler(async (req, res) => {
    const { campusName, latitude, longitude , radius} = req.body;
    if (!campusName || !latitude || !longitude || !radius)
        throw new ApiError(400, "Incomplete data");

    const newCampus = await GeoService.addNewCampusLocation(campusName, latitude, longitude, radius);
    res.status(201).json({ success: true, campus: newCampus });
})

const acceptUser = asyncHandler(async (req, res) => {
    const { email, shiftStart, shiftEnd, campus } = req.body;
    
    const userData = await authService.getUserByEmail(email);
    

})

module.exports = {
    addNewCampusLocation
}
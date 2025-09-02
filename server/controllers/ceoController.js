const adminDashService = require("../services/projectService/adminDash");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/ApiError");

const getUserCreditSummary = asyncHandler( async (req, res) => {
    const { userid } = req.params;

    if(!userid) 
        throw new ApiError(400, "User ID is required");

    const summary = await adminDashService.getUserCreditSummary(userid);
    res.status(200).json({success: true, summary});
})

const getUserAttendanceSummary = asyncHandler( async (req, res) => {
    const { userid } = req.params;
    const { startDate, endDate } = req.query;

    if(!userid) 
        throw new ApiError(400, "User ID is required");

    const summary = await adminDashService.getUserAttendanceSummary(userid, startDate, endDate);
    res.status(200).json({success: true, summary});
});

const getStandardPay = asyncHandler(async (req, res) => {
    const { userid } = req.params;
    const { startDate, endDate } = req.query;

    if (!userid)
        throw new ApiError(400, "User ID is required");

    const data = await adminDashService.getStandardPay(userid, startDate, endDate);
    res.status(200).json({ success: true, data });
});

module.exports = {
    getUserCreditSummary,
    getUserAttendanceSummary,
    getStandardPay,
};
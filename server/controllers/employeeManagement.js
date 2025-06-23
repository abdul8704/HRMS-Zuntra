const employeeService = require("../services/employeeService")
const ApiError = require("../errors/ApiError");
const asyncHandler = require("express-async-handler");

const handleLogout = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { logoutTime } = req.body;

    if(!logoutTime) 
        throw new ApiError(400, "Logout time not provided")

    await employeeService.markEndOfSession(userid, logoutTime);
    res.status(200).json({ success: true, message: "Logout time recorded" });
})

const getAttendanceData = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { startDate, endDate } = req.query;

    if(!startDate || !endDate)
        throw new ApiError(400, "Start date and end date not provided")

    const attendanceData = await employeeService.getAttendanceDataByUserId(
        userid,
        startDate,
        endDate
    );
    res.status(200).json({ success: true, attendanceData });
})

module.exports = {
    handleLogout,
    getAttendanceData
};
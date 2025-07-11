const asyncHandler = require("express-async-handler");
const GeoService = require("../services/geoLocationService");
const ApiError = require("../errors/ApiError");
const authService = require("../services/authService")

const HrService = require('../services/hrServices')

const addNewCampusLocation = asyncHandler(async (req, res) => {
    const { campusName, latitude, longitude , radius} = req.body;
    if (!campusName || !latitude || !longitude || !radius)
        throw new ApiError(400, "Incomplete data");

    const newCampus = await GeoService.addNewCampusLocation(campusName, latitude, longitude, radius);
    res.status(201).json({ success: true, campus: newCampus });
})

const acceptUser = asyncHandler(async (req, res) => {
    const { email, shiftId, campusId, roleId } = req.body;
    const userData = await authService.getUserByEmail(email);

    if(!userData)
        return res.status(404).json( {success:false, message:"User not found, this error should never ever never ever occur" })

    if(!shiftId || !campusId || !roleId)
            throw new Error("give me full data. shift, campus, role")
    await HrService.updateUserData(email, shiftId, campusId, roleId);
    await HrService.creatUserPersonal(userData._id);
    await HrService.createUserCourse(userData._id);
    return res.status(201).json({ success: true, message: "User updated successfully" });
})

const getPendingEmployees = asyncHandler(async (req, res) => {
    const pendingEmployees = await HrService.getPendingUsers();

    if (pendingEmployees.length === 0) 
        return res.status(404).json({ success: false, message: "No pending employees found" });
    
    const formattedPendingEmployees = pendingEmployees.map((emp) => ({
        name: emp.username,
        email: emp.email,
        phone: emp.phoneNumber,
        role: emp.role,
        date: emp.dateJoined.toISOString().split('T')[0], 
    }));

    res.status(200).json({ success: true, pendingEmployees: formattedPendingEmployees });
})

const getPendingLeaveReqs = asyncHandler(async (req, res) => {
    const pendingLeaveReqs = await HrService.getPendingLeaveRequests();

    const formattedRequest = pendingLeaveReqs.map((leaveReq) => ({
        leaveId: leaveReq._id, 
        leaveType: leaveReq.leaveType, 
        requestedBy: leaveReq.userid.username,
        requestedUserEmail: leaveReq.userid.email,
        appliedOn: leaveReq.appliedOn.toISOString().split("T")[0],
        leaveCategory: leaveReq.leaveCategory,
        dates: leaveReq.dates.map((date) => date.toISOString().split("T")[0]),
        reason: leaveReq.reason,
        status: leaveReq.status,
    }));

    res.status(200).json({ success: true, pendingLeaveReqs: formattedRequest });
});

const processLeaveReq = asyncHandler(async (req, res) => {
    const { leaveId, decision, comment } = req.body;
    const { userid } = req.user;

    if (!leaveId || !decision)
        throw new ApiError(400, "Incomplete data to process leave request");

    const updatedLeave = await HrService.processLeaveRequest(userid, leaveId, decision, comment);
    res.status(200).json({ success: true, updatedLeave });
})

const getAllLeaveReqs = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const leaveData = await HrService.fetchAllLeaveRequests();

    return res.status(200).json({ success: true, LeaveData: leaveData })
})

module.exports = {
    addNewCampusLocation,
    acceptUser,
    getPendingEmployees,
    getPendingLeaveReqs,
    processLeaveReq,
    getAllLeaveReqs,
};
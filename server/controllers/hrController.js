const asyncHandler = require("express-async-handler");
const GeoService = require("../services/geoLocationService");
const ApiError = require("../errors/ApiError");
const authService = require("../services/authService");

const HrService = require("../services/hrServices");

const acceptUser = asyncHandler(async (req, res) => {
    const { email, shiftId, campusId, roleId, salary } = req.body;
    const userData = await authService.getUserByEmail(email);

    if (!userData)
        return res
            .status(404)
            .json({
                success: false,
                message:
                    "User not found, this error should never ever never ever occur",
            });

    if (!shiftId || !campusId || !roleId || !salary)
        throw new Error("give me full data. shift, campus, role");
    await HrService.updateUserData(email, shiftId, campusId, roleId);
    await HrService.creatUserPersonal(userData._id, salary);
    await HrService.createUserCourse(userData._id); 
    await HrService.setOnboardingCourses(userData._id, roleId);

    return res
        .status(201)
        .json({ success: true, message: "User updated successfully" });
});

const getPendingEmployees = asyncHandler(async (req, res) => {
    const pendingEmployees = await HrService.getPendingUsers();

    const formattedEmployees = pendingEmployees.map((emp) => ({
        ...(emp.toObject?.() ?? emp),
        dateJoined: emp.dateJoined?.toISOString().split("T")[0] || null,
    }));

    res.status(200).json({
        success: true,
        pendingEmployees: formattedEmployees,
    });
});

const getPendingLeaveReqs = asyncHandler(async (req, res) => {
    const pendingLeaveReqs = await HrService.getPendingLeaveRequests();

    const formattedRequest = pendingLeaveReqs.map((leaveReq) => ({
        leaveId: leaveReq._id,
        leaveType: leaveReq.leaveType,
        requestedBy: leaveReq.userid.username,
        requestedId: leaveReq.userid._id,
        requestedUserEmail: leaveReq.userid.email,
        requestedPhone: leaveReq.userid.phoneNumber,
        appliedOn: leaveReq.appliedOn.toISOString().split("T")[0],
        dates: leaveReq.dates.map((date) => date.toISOString().split("T")[0]),
        reason: leaveReq.reason,
        status: leaveReq.status,
        TL: leaveReq.userid.AdminAction,
        HR: leaveReq.userid.superAdminAction,
        TLComment: leaveReq.userid.adminReviewComment,
        HRComment: leaveReq.userid.superAdminReviewComment,
    }));

    res.status(200).json({ success: true, pendingLeaveReqs: formattedRequest });
});

const processLeaveReq = asyncHandler(async (req, res) => {
    const { leaveId, decision, comment } = req.body;
    const { userid } = req.user;

    if (!leaveId || !decision)
        throw new ApiError(400, "Incomplete data to process leave request");

    const updatedLeave = await HrService.superAdminProcessLeaveRequest(
        userid,
        leaveId,
        decision,
        comment
    );

    res.status(200).json({ success: true, updatedLeave });
});

const getAllLeaveReqs = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const leaveData = await HrService.fetchAllLeaveRequests();
    const formattedRequest = leaveData.map((leaveReq) => ({
        leaveId: leaveReq._id,
        leaveType: leaveReq.leaveType,
        requestedBy: leaveReq.userid.username,
        requestedId: leaveReq.userid._id,
        requestedUserEmail: leaveReq.userid.email,
        requestedPhone: leaveReq.userid.phoneNumber,
        appliedOn: leaveReq.appliedOn.toISOString().split("T")[0],
        dates: leaveReq.dates.map((date) => date.toISOString().split("T")[0]),
        reason: leaveReq.reason,
        status: leaveReq.status,
        TL: leaveReq.userid.AdminAction,
        HR: leaveReq.userid.superAdminAction,
        TLComment: leaveReq.userid.adminReviewComment,
        HRComment: leaveReq.userid.superAdminReviewComment,
    }));

    res.status(200).json({ success: true, leaveData: formattedRequest });

    return res.status(200).json({ success: true, LeaveData: leaveData });
});

module.exports = {
    acceptUser,
    getPendingEmployees,
    getPendingLeaveReqs,
    processLeaveReq,
    getAllLeaveReqs,
};

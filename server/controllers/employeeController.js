const employeeService = require("../services/employeeService");
const attendanceService = require("../services/attendanceService");
const roleService = require("../services/rolesService");
const ApiError = require("../errors/ApiError");
const asyncHandler = require("express-async-handler");
const { processWorkBreakData } = require("../utils/attendanceHelper");
const AttendanceHelper = require("../utils/attendanceHelper");

const fetchAllEmployees = asyncHandler(async (req, res) => {
    const employees = await employeeService.getAllEmployees();

    const roleColorCache = new Map();
    const roleNameCache = new Map();

    const formattedEmployees = await Promise.all(
        employees.map(async (emp) => {
            const roleId = emp.role._id.toString();

            if (!roleColorCache.has(roleId)) {
                const roleDetails = await roleService.getRoleDetailsById(
                    roleId
                );
                roleColorCache.set(roleId, roleDetails?.color || null);
                roleNameCache.set(roleId, roleDetails?.role || null);
            }

            const employeeObject = emp.toObject?.() ?? emp;

            return {
                ...employeeObject,
                role: {
                    name: roleNameCache.get(roleId),
                    color: roleColorCache.get(roleId),
                },
            };
        })
    );
    res.status(200).json({ success: true, employees: formattedEmployees });
});

const getEmployeeByRole = asyncHandler(async (req, res) => {
    const { role } = req.params;

    if (!role) throw new ApiError(400, "Role not provided");

    const employees = await employeeService.getEmployeeByRole(role);

    res.status(200).json({ success: true, employees });
});

const getDetailsOfaEmployee = asyncHandler(async (req, res) => {
    const { empId } = req.params;
    if (!empId) throw new ApiError(400, "empId not provided");
    const employeeDetail = await employeeService.getDetailsOfaEmployee(empId);
    const personalDetail = await employeeService.getPersonalDetailsOfaEmployee(
        empId
    );
    res.status(200).json({
        success: true,
        employeeDetail: {
            ...employeeDetail.toObject(), // Convert Mongoose doc to plain JS object
            personalDetail: personalDetail || {}, // Nest personal details
        },
    });
});

const getEmployeeRequests = asyncHandler(async (req, res) => {
    const { userid } = req.user;

    const applicationData = await attendanceService.getLeaveRequests(userid);
    return res
        .status(200)
        .json({ success: true, leaveRequests: applicationData });
});

const getMyData = asyncHandler(async (req, res) => {
    const { userid, username, allowedAccess } = req.user;

    return res
        .status(200)
        .json({ success: true, data: { userid, username, allowedAccess } });
});

const updateEmpDataController = asyncHandler(async (req, res) => {
    const { dob, religion, address } = req.body;
    const { userid } = req.user;

    const updatedData = await employeeService.updateEmpData({
        userid,
        dob,
        religion,
        address,
    });

    res.status(200).json({
        success: true,
        message: "Employee personal details updated successfully",
        data: updatedData,
    });
});

const handleLogout = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { logoutTime } = req.body;

    if (!logoutTime) throw new ApiError(400, "Logout time not provided");

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    const logout = await attendanceService.markEndOfSession(userid, logoutTime);

    if (logout.success !== true)
        return res
            .status(400)
            .json({ success: false, message: logout.message });
    res.status(200).json({ success: true, message: "Logout time recorded" });
});

const applyForLeave = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { leaveCategory, dates, reason } = req.body;

    if (!leaveCategory || !dates || !reason) {
        throw new ApiError(400, "please send all data reqd to apply leave");
    }

    await attendanceService.applyLeave(
        userid,
        leaveCategory.split(" ")[0],
        dates,
        reason
    );

    return res
        .status(201)
        .json({ success: true, message: "Request sent successfully" });
});

const processLeaveRequest = asyncHandler(async (req, res) => {
    // TODO: logic to check if user is recpient's TL
    const { leaveId, decision, comment } = req.body;
    const { userid } = req.user;

    if (!leaveId || !decision)
        throw new ApiError(400, "Incomplete data to process leave request");

    const updatedLeave = await attendanceService.adminProcessLeaveRequest(
        userid,
        leaveId,
        decision,
        comment
    );

    res.status(200).json({ success: true, updatedLeave });
});

const editLeaveRequest = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { leaveId, leaveCategory, dates, reason } = req.body;

    if (!leaveId || !leaveCategory || !dates || !reason) {
        throw new ApiError(
            400,
            "Incomplete data given to update leave request"
        );
    }

    await attendanceService.editLeaveRequest(
        leaveId,
        userid,
        leaveCategory,
        dates,
        reason
    );

    res.status(200).json({ success: true, message: "successfullt updated" });
});

const deleteLeaveRequest = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { leaveId } = req.body;

    if (!leaveId) {
        throw new ApiError(
            400,
            "Incomplete data given to delete leave request"
        );
    }

    await attendanceService.deleteLeaveRequest(leaveId, userid);

    res.status(200).json({ success: true, message: "successfully deleted" });
});

const getCalendarData = asyncHandler(async (req, res) => {
    const { userid, startDate, endDate } = req.query;

    if (!userid || !startDate || !endDate)
        throw new ApiError(400, "Start date and end date not provided");

    const calendarData = await attendanceService.getCalendarDataOnly(
        userid,
        startDate,
        endDate
    );
    res.status(200).json({ success: true, calendarData });
});

const getWorkBreakComposition = asyncHandler(async (req, res) => {
    const { userid, startDate, endDate } = req.query;
    console.log(req.query);
    if (!userid || !startDate || !endDate)
        throw new ApiError(400, "Start date and end date not provided");

    const workBreakComposition = await attendanceService.getWorkBreakCompositionOnly(
        userid,
        startDate,
        endDate
    );

    if (!workBreakComposition || workBreakComposition.length === 0) {
        return res.status(200).json({ success: true, workBreakComposition: [] });
    }

    const work_breakData = processWorkBreakData(workBreakComposition, endDate );

    res.status(200).json({
        success: true,
        workBreakComposition: work_breakData,
    });
});

const getAttendanceData = asyncHandler(async (req, res) => {
    const { userid, startDate, endDate } = req.query;

    if (!userid || !startDate || !endDate)
        throw new ApiError(400, "Start date and end date not provided");

    const attendanceData = await attendanceService.getAttendanceDataOnly(
        userid,
        startDate,
        endDate
    );
    res.status(200).json({ success: true, attendanceData });
});

const getTimeCards = asyncHandler(async (req, res) => {
    const { userid, date } = req.query;

    console.log(userid, date)

    if (!userid || !date)
        throw new ApiError(400, "Insufficient data to request time cards.");

    const today = AttendanceHelper.normalizeToUTCDate(new Date(date));
    const timeCards = await attendanceService.getTimeCards(userid, today);

    res.status(200).json({ success: true, timeCards });
});

module.exports = {
    handleLogout,
    getAttendanceData,
    fetchAllEmployees,
    getEmployeeByRole,
    getDetailsOfaEmployee,
    applyForLeave,
    getEmployeeRequests,
    getMyData,
    updateEmpDataController,
    processLeaveRequest,
    deleteLeaveRequest,
    editLeaveRequest,
    getCalendarData,
    getWorkBreakComposition,
    getAttendanceData,
    getTimeCards,
};
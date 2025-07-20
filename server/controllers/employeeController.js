const employeeService = require("../services/employeeService");
const roleService = require("../services/rolesService");
const ApiError = require("../errors/ApiError");
const asyncHandler = require("express-async-handler");

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

    const logout = await employeeService.markEndOfSession(userid, logoutTime);

    if (logout.success !== true)
        return res
            .status(400)
            .json({ success: false, message: logout.message });
    res.status(200).json({ success: true, message: "Logout time recorded" });
});

const getAttendanceData = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate)
        throw new ApiError(400, "Start date and end date not provided");

    const attendanceData = await employeeService.getAttendanceDataByUserId(
        userid,
        startDate,
        endDate
    );
    res.status(200).json({ success: true, attendanceData });
});

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
    const personalDetail = await employeeService.getPersonalDetailsOfaEmployee(empId);
    res.status(200).json({
        success: true,
        employeeDetail: {
            ...employeeDetail.toObject(),  // Convert Mongoose doc to plain JS object
            personalDetail: personalDetail || {},  // Nest personal details
        },
    });
});


const applyForLeave = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { leaveCategory, dates, reason } = req.body;
    console.log(userid, leaveCategory, dates, reason);

    if (!leaveCategory || !dates || !reason) {
        throw new ApiError(400, "please send all data reqd to apply leave");
    }

    const applyLeave = await employeeService.applyLeave(
        userid,
        leaveCategory.split(" ")[0],
        dates,
        reason
    );

    return res
        .status(201)
        .json({ success: true, message: "Request sent successfully" });
});

const getEmployeeRequests = asyncHandler(async (req, res) => {
    const { userid } = req.user;

    const applicationData = await employeeService.getLeaveRequests(userid);
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

module.exports = {
    handleLogout,
    getAttendanceData,
    fetchAllEmployees,
    getEmployeeByRole,
    getDetailsOfaEmployee,
    applyForLeave,
    getEmployeeRequests,
    getMyData,
};

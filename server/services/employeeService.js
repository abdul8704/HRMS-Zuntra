const Attendance = require("../models/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const attendanceHelper = require("../utils/attendanceHelper.js");
const asyncHandler = require("express-async-handler");

const getAttendanceDataByUserId = async (
    userid,
    startDate,
    endDate,
    holidays = []
) => {
    try {
        const start = attendanceHelper.normalizeToUTCDate(startDate);
        start.setUTCHours(0, 0, 0, 0);

        const end = attendanceHelper.normalizeToUTCDate(endDate);
        end.setUTCHours(23, 59, 59, 999);

        // Fetch attendance records within the date range
        const attendanceRecords = await Attendance.find({
            userid,
            date: { $gte: start, $lte: end },
        }).sort({ date: 1 });

        // Create a map for quick lookup
        const attendanceMap = new Map();
        for (const record of attendanceRecords) {
            const dateStr = record.date.toISOString().split("T")[0];
            attendanceMap.set(dateStr, record);
        }

        // Prepare to iterate over each date in the range
        const result = [];
        let presentCount = 0;
        let holidayCount = 0;
        let absentCount = 0;

        const oneDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.ceil((end - start) / oneDay) + 1;

        for (let i = 0; i < totalDays; i++) {
            const current = new Date(start.getTime() + i * oneDay);
            const currentDateStr = current.toISOString().split("T")[0];

            if (holidays.includes(currentDateStr)) {
                holidayCount++;
                result.push({ date: currentDateStr, status: "holiday" });
            } else if (attendanceMap.has(currentDateStr)) {
                presentCount++;
                result.push({
                    date: currentDateStr,
                    status: "present",
                    ...attendanceMap.get(currentDateStr)._doc,
                });
            } else {
                absentCount++;
                result.push({ date: currentDateStr, status: "absent" });
            }
        }

        const workingDays = totalDays - holidayCount;

        return {
            success: true,
            summary: {
                totalDays,
                workingDays,
                holidays: holidayCount,
                present: presentCount,
                absent: absentCount,
            },
            detailedData: result,
        };
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to fetch attendance summary",
            error.message
        );
    }
};

const markAttendanceOnLogin = asyncHandler(async (userid, mode) => {
    const today = attendanceHelper.normalizeToUTCDate(new Date());

    try {
        const shiftData = await User.findById(userid).populate(
            "shift",
            "startTime endTime"
        );
        const shiftStart = new Date(shiftData.shift.shiftStart);
        const shiftEnd = new Date(shiftData.shift.shiftEnd);

        const shiftStartTime = attendanceHelper.toUTCTimeOnly(shiftStart);
        const shiftEndTime = attendanceHelper.toUTCTimeOnly(shiftEnd);

        const now = new Date();

        let attendance = await Attendance.findOne({ userid, date: today });

        // FIRST LOGIN OF THE DAY
        if (!attendance) {
            attendance = new Attendance({
                userid,
                date: today,
                sessions: [
                    {
                        loginTime: now,
                        mode:
                            now >= shiftStartTime && now <= shiftEndTime
                                ? mode
                                : "extra",
                    },
                ],
                workingMinutes: 0,
                breakMinutes: 0,
                status: mode === "remote" ? "remote" : "present",
            });

            await attendance.save();

            return {
                success: true,
                message: "Attendance marked (first login of the day)",
            };
        }

        // ✅ If status was remote and new mode is present, update status
        if (attendance.status === "remote" && mode === "onsite") {
            attendance.status = "onsite";
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        // 🕓 Previous session exists and has no logout time
        if (lastSession && !lastSession.logoutTime) {
            const sessionDurationMs = now - new Date(lastSession.loginTime);
            const sessionDurationMinutes = sessionDurationMs / (1000 * 60);

            lastSession.logoutTime = now;
            attendance.workingMinutes += sessionDurationMinutes;
        }

        // 🕒 If previous session had logoutTime, calculate break only if within shift hours
        if (lastSession?.logoutTime) {
            const breakDurationMs = now - new Date(lastSession.logoutTime);
            const breakDurationMinutes = breakDurationMs / (1000 * 60);

            const isWithinShift = now >= shiftStartTime && now <= shiftEndTime;

            attendance.sessions.push({
                loginTime: now,
                mode: isWithinShift ? mode : "extra",
            });

            if (isWithinShift && breakDurationMinutes > 1) {
                attendance.breakMinutes += breakDurationMinutes;
            }
        } else {
            // No previous session? Just push a new session (shouldn’t occur, but safe fallback)
            attendance.sessions.push({
                loginTime: now,
                mode: now >= shiftStart && now <= shiftEnd ? mode : "extra",
            });
        }

        await attendance.save();
        return {
            success: true,
            message: "Attendance updated (subsequent login)",
        };
    } catch (error) {
        console.log(error)
        throw new ApiError(
            500,
            "Failed to mark attendance on login",
            error.message
        );
    }
});

const markEndOfSession = async (userid, logoutTime) => {
    try {
        const today = attendanceHelper.normalizeToUTCDate(new Date());
        const attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            return {
                success: false,
                message: "No attendance found for today",
            };
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (lastSession && !lastSession.logoutTime) {
            const logout = new Date(logoutTime);
            lastSession.logoutTime = logout;

            const login = new Date(lastSession.loginTime);

            const sessionDurationMs = logout - login;
            const sessionDurationMinutes = sessionDurationMs / (1000 * 60); // convert ms to minutes

            attendance.workingMinutes += sessionDurationMinutes;

            await attendance.save();

            return {
                success: true,
                message: "Logout recorded and working minutes updated",
                sessionDurationMinutes: Math.round(sessionDurationMinutes),
                totalWorkingMinutes: Math.round(attendance.workingMinutes),
            };
        }

        return {
            success: false,
            message: "No active session to log out from",
        };
    } catch (error) {
        throw new ApiError(500, "Failed to mark end of session", error.message);
    }
};

const getAllEmployees = async () => {
    const employees = await User.find({ role: { $exists: true } })
        .select("username email role shift phoneNumber campus profilePicture")
        .populate({
            path: "shift",
            select: "startTime endTime shiftName",
        })
        .populate({
            path: "role",
            select: "role", // Assuming role schema has a 'role' field
        })
        .populate({
            path: "campus",
            select: "locationName", // Adjust based on your GeoLocation schema
        });

    return employees;
};

// @desc Get details of a user
const getDetailsOfaEmployee = async (userid) => {
    try {
        if (!userid) {
            throw new ApiError(400, "Employee ID is required");
        }

        const userCreds = await User.findById(userid, {passwordHash : 0})
            .populate("role", "role")
            .populate("shift", "startTime endTime")
            .populate("campus", "campusName");

        if (!userCreds) {
            throw new ApiError(404, "Employee not found");
        }

        return userCreds;
    } catch (error) {
        throw new ApiError(500, `Failed to fetch user details: ${error.message}`);
    }
};


const getEmployeeByRole = async (roleId) => {
    try {
        const userData = await User.find({ role: roleId }).populate(
            "role",
            "role color baseSalary"
        );
        return userData;
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to fetch users by role: ",
            error.message
        );
    }
};
  

module.exports = {
    getAttendanceDataByUserId,
    markAttendanceOnLogin,
    markEndOfSession,
    getAllEmployees,
    getDetailsOfaEmployee,
    getEmployeeByRole,
};

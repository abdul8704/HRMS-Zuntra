const Attendance = require("../models/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const attendanceHelper = require("../utils/attendanceHelper.js");
const { insertMany } = require("../models/reminder.js");

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

const markAttendanceOnLogin = async (userid, mode) => {
    const today = attendanceHelper.normalizeToUTCDate(new Date());

    try {
        const shiftData = await User.findById(userid).populate(
            "shift",
            "startTime endTime"
        );

        if (!shiftData) {
            throw new ApiError(404, "User not found");
        }
        if (!shiftData.shift) {
            throw new ApiError(400, "User does not have a shift assigned or assigned shift is invalid");
        }

        const shiftStart = new Date(shiftData.shift.startTime);
        const shiftEnd = new Date(shiftData.shift.endTime);

        const shiftStartTime = attendanceHelper.toUTCTimeOnly(shiftStart);
        const shiftEndTime = attendanceHelper.toUTCTimeOnly(shiftEnd);

        if (isNaN(shiftStartTime.getTime(), isNaN(shiftEndTime.getTime())))
            throw new ApiError(400, "Unable to process shift timings");

        const now = attendanceHelper.toUTCTimeOnly(new Date());

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
                mode:
                    now >= shiftStartTime && now <= shiftEndTime
                        ? mode
                        : "extra",
            });
        }

        await attendance.save();
        return {
            success: true,
            message: "Attendance updated (subsequent login)",
        };
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            500,
            "Failed to mark attendance on login",
            error.message
        );
    }
};

const markEndOfSession = async (userid, logoutTime) => {
    const today = attendanceHelper.normalizeToUTCDate(new Date());

    try {
        const attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            return {
                success: false,
                message: "No attendance found for today",
            };
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (!lastSession) {
            return {
                success: false,
                message: "No sessions found for today",
            };
        }

        if (lastSession.logoutTime) {
            return {
                success: false,
                message: "Session already logged out",
            };
        }

        const logout = new Date(logoutTime);
        if (isNaN(logout.getTime())) {
            throw new ApiError(400, "Invalid 'logoutTime' format");
        }

        const login = new Date(lastSession.loginTime);

        if (logout < login) {
            return {
                success: false,
                message: "Logout time cannot be before login time",
            };
        }

        const sessionDurationMs = logout - login;
        const sessionDurationMinutes = sessionDurationMs / (1000 * 60);

        lastSession.logoutTime = logout;
        attendance.workingMinutes += sessionDurationMinutes;

        await attendance.save();

        return {
            success: true,
            message: "Logout recorded and working minutes updated",
            sessionDurationMinutes: Math.round(sessionDurationMinutes),
            totalWorkingMinutes: Math.round(attendance.workingMinutes),
        };
    } catch (error) {
        if (error instanceof ApiError) throw error;
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

        const userCreds = await User.findById(userid, { passwordHash: 0 })
            .populate("role", "role")
            .populate("shift", "startTime endTime")
            .populate("campus", "campusName");

        if (!userCreds) {
            throw new ApiError(404, "Employee not found");
        }

        return userCreds;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            500,
            "Error while fetching details of a user",
            error.message
        );
    }
};

const getEmployeeByRole = async (roleId) => {
    const userData = await User.find({ role: roleId }).populate(
        "role",
        "role color baseSalary"
    );
    return userData;
};

module.exports = {
    getAttendanceDataByUserId,
    markAttendanceOnLogin,
    markEndOfSession,
    getAllEmployees,
    getDetailsOfaEmployee,
    getEmployeeByRole,
};

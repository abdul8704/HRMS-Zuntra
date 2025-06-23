const Attendance = require("../models/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");

const getAttendanceDataByUserId = async (
    userid,
    startDate,
    endDate,
    holidays = []
) => {
    try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

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

const markAttendanceOnLogin = async (userid) => {
    const now = new Date();
    const shiftData = User.findOne({ _id: userid });
    const shiftStart = shiftData.shiftStart;
    const shiftEnd = shiftData.shiftEnd;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        let attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            attendance = new Attendance({
                userid,
                date: today,
                sessions: [],
                workingMinutes: 0,
                breakMinutes: 0,
                status: "present",
            });
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (lastSession && !lastSession.logoutTime) {
            lastSession.logoutTime = now;
            const lastLogin = lastSession.loginTime;

            const sessionDurationMs = now - lastLogin;
            const sessionDurationMinutes = sessionDurationMs / (1000 * 60); // convert ms to minutes

            attendance.workingMinutes += sessionDurationMinutes;
        }

        if (now >= shiftStart && now <= shiftEnd && lastSession?.logoutTime) {
            const breakDurationMs = now - new Date(lastSession.logoutTime);
            const breakDurationMinutes = breakDurationMs / (1000 * 60);

            if (breakDurationMinutes > 1) {
                attendance.breakMinutes += breakDurationMinutes / 60; // Convert to hours
            }
        }

        attendance.sessions.push({ loginTime: now });

        await attendance.save();

        return { success: true, message: "Attendance marked on login" };
    } catch (error) {
        throw new ApiError(500, "Failed to mark attendance on login", error.message);
    }
};

const markEndOfSession = async (userid, logoutTime) => {
    try{
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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
    } catch(error){
        throw new ApiError(500, "Failed to mark end of session", error.message);
    }
};

module.exports = {
    getAttendanceDataByUserId,
    markAttendanceOnLogin,
    markEndOfSession,
};

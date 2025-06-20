const Attendance = require("../models/attendance")
const User = require("../models/userCredentials.js")

const getAttendaceByUserId = async (userid, startDate, endDate) => {
    try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const attendanceRecords = await Attendance.find({
            userid: userid,
            date: { $gte: start, $lte: end },
        }).sort({ date: 1 });

        return {
            success: true,
            data: attendanceRecords,
        };
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return {
            success: false,
            message: error.message,
        };
    }
};

const markAttendanceOnLogin = async (userid) => {
    const now = new Date();
    const shiftData = User.findOne({_id: userid})
    const shiftStart = shiftData.shiftStart
    const shiftEnd = shiftData.shiftEnd

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
        console.error("Login attendance error:", error);
        return { success: false, message: error.message };
    }
};


const markEndOfSession = async (userid, logoutTime) => {
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
};


module.exports = {
    getAttendaceByUserId,
    markAttendanceOnLogin,
    markEndOfSession
};

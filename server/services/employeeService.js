const Attendance = require("../models/attendance")
const User = requre("../models/userDetails.js")

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
}

const markAttendanceOnLogin = async (userid) => {
    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        let attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            // No attendance yet for today — create it
            attendance = new Attendance({
                userid,
                date: today,
                sessions: [],
                workingHours: 0,
                breakHours: 0,
                status: "present",
            });
        }

        // Add a new login session with loginTime set
        attendance.sessions.push({ loginTime: now });

        await attendance.save();
        return { success: true, message: "Attendance marked on login" };
    } catch (error) {
        console.error("Login attendance error:", error);
        return { success: false, message: error.message };
    }
};

module.exports = {
    getAttendaceByUserId,
    markAttendanceOnLogin
}
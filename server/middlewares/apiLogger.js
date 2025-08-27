const Attendance = require("../models/attendanceManagement/attendance");
const attendanceHelper = require("../utils/attendanceHelper"); // make sure path is correct

const apiLogger = async (req, res, next) => {
  const now = new Date();

  console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl}`);

  if (req.user && req.user._id) {
    try {
      const today = attendanceHelper.normalizeToUTCDate(new Date());
      const requestTime = attendanceHelper.toUTCTimeOnly(now); // 👈 format same as logoutTime

      // find today's attendance
      const attendance = await Attendance.findOne({ userid: req.user._id, date: today });

      if (attendance && attendance.sessions.length > 0) {
        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (!lastSession.logoutTime) {
          lastSession.lastRequest = requestTime; // 👈 same format as logoutTime
          await attendance.save();
        }
      }
    } catch (err) {
      console.error("Failed to update lastRequest:", err.message);
    }
  }

  next();
};

module.exports = apiLogger;

const Attendance = require("../models/attendanceManagement/attendance");
const attendanceHelper = require("../utils/attendanceHelper"); // make sure path is correct

const apiLogger = async (req, res, next) => {
  const now = new Date();

  if (req.user && req.user.userid) {
    try {
      const today = attendanceHelper.normalizeToUTCDate(new Date());
      const requestTime = attendanceHelper.toUTCTimeOnly(now); // 👈 format same as logoutTime
      
      const currSession = await Attendance.findOne(
        { userid: req.user.userid, date: today },
      );

      if (currSession) {
        currSession.sessions[currSession.sessions.length - 1].lastRequest = requestTime;
        await currSession.save();
      }
    } catch (err) {
      console.error("Failed to update lastRequest:", err.message);
    }
  }

  next();
};

module.exports = apiLogger;

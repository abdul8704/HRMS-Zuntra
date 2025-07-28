const Attendance = require("../models/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const attendanceHelper = require("../utils/attendanceHelper.js");
const LeaveApplication = require("../models/leaveApplication.js");

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
        end.setUTCHours(23, 59, 59, 99);
        
        if(!start || !end) {
            throw new ApiError(400, "Invalid start or end date format");
        }

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
            throw new ApiError(
                400,
                "User does not have a shift assigned or assigned shift is invalid"
            );
        }

        const shiftStartTime = new Date(shiftData.shift.startTime);
        const shiftEndTime = new Date(shiftData.shift.endTime);

        if (isNaN(shiftStartTime.getTime(), isNaN(shiftEndTime.getTime()))) {
            throw new ApiError(400, "Unable to process shift timings");
        }

        const now = attendanceHelper.toUTCTimeOnly(new Date());

        let attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            // this statement determines if, this is the first session of the day. create a record, mark present.
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

            if (shiftStartTime - now <= 60 * 60 * 1000 || now - shiftStartTime >= 0) {
                attendance.lateBy = (now - shiftStartTime) / 60_000;
            }

            await attendance.save();

            return {
                success: true,
                message: "Attendance marked (first login of the day)",
            };
        }

        // if employee previously logged in remotely, then starts another session onsite, update attendance type of day to onsite.
        if (attendance.status === "remote" && mode === "onsite") {
            attendance.status = "present";
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        // Previous session exists and has no logout time
        if (lastSession && !lastSession.logoutTime) {
            const sessionDurationMs = now - new Date(lastSession.loginTime);
            const sessionDurationMinutes = sessionDurationMs / (1000 * 60);

            lastSession.logoutTime = now;
            attendance.workingMinutes += sessionDurationMinutes;
        }

        // If previous session had logoutTime, calculate break only if within shift hours
        if (lastSession?.logoutTime) {
            const breakDurationMs = now - new Date(lastSession.logoutTime);
            const breakDurationMinutes = breakDurationMs / (1000 * 60);

            const isWithinShift = now >= shiftStartTime && now <= shiftEndTime;

            attendance.sessions.push({
                loginTime: now,
                mode: isWithinShift ? mode : "extra",
            });

            if(!attendance.lateBy && (shiftStartTime - now >= 60 * 60 * 1000 || now - shiftStartTime > 0))
                attendance.lateBy = (now - shiftStartTime) / 60_000;
            
            if (isWithinShift && breakDurationMinutes > 1) {
                // TODO: update this to whatever client wants
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

const markEndOfSession = async (userid, logout) => {
    const today = attendanceHelper.normalizeToUTCDate(new Date());
    const logoutTime = attendanceHelper.toUTCTimeOnly(new Date(logout));

    try {
        const attendance = await Attendance.findOne({ userid, date: today });

        if (!attendance) {
            throw new ApiError(400, "No attendance found for today", today);
        }

        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (!lastSession) {
            throw new ApiError(
                400,
                "No sessions found for today, cant close a session that doesnt exist"
            );
        }

        if (lastSession.logoutTime) {
            throw new ApiError(400, "Session already logged out");
        }

        const logout = attendanceHelper.toUTCTimeOnly(new Date(logoutTime));

        if (isNaN(logout.getTime())) {
            throw new ApiError(400, "Invalid 'logoutTime' format");
        }

        const login = attendanceHelper.toUTCTimeOnly(
            new Date(lastSession.loginTime)
        );

        if (logout < login) {
            throw new Error(
                400,
                "How did u even logout before u logged in? Time Travel?"
            );
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

const applyLeave = async (userid, leaveCategory, dates, reason) => {
    const leaveType = leaveCategory.toUpperCase();
    const leave = new LeaveApplication({
        userid: userid,
        leaveType: leaveType,
        dates: dates,
        reason: reason,
        status: "PENDING",
    });

    await leave.save();
};

const getLeaveRequests = async (userid) => {
    const leaveRequests = LeaveApplication.find({ userid: userid });
    return leaveRequests;
};

const adminProcessLeaveRequest = async (
    userid,
    leaveId,
    decision,
    comments = "NIL"
) => {
    const finalDecision = decision.toUpperCase();
    const leaveApplication = await LeaveApplication.findById(leaveId);
    const now = new Date();

    if (!leaveApplication) {
        throw new ApiError(400, "Requested Leave application not found");
    }
    if (leaveApplication.superAdminAction !== "PENDING") {
        if (leaveApplication.status !== finalDecision)
            throw new ApiError(
                403,
                "Leave already reviewed by super admin. You can't override."
            );
        else {
            leaveApplication.adminAction = finalDecision;
            leaveApplication.adminReviewer = userid;
            leaveApplication.adminReviewedAt = now;
            leaveApplication.adminReviewComment = comments;
            return;
        }
    }

    leaveApplication.status =
        finalDecision === "APPROVED" ? "APPROVED" : "REJECTED";
    leaveApplication.adminAction = finalDecision;
    leaveApplication.adminReviewer = userid;
    leaveApplication.adminReviewedAt = now;
    leaveApplication.adminReviewComment = comments;

    await leaveApplication.save();
};

const editLeaveRequest = async (leaveId, userid, leaveCategory, dates, reason) => {
    const leaveApplication = await LeaveApplication.findById(leaveId);
    const now = Date.now()

    if(String(leaveApplication.userid) !== userid){
        throw new ApiError(403, "YOU CANNOT CHANGE OTHER PEOPLE's LEAVE APPLICATION");
    }

    if(leaveApplication.status !== "PENDING"){
        throw new ApiError(403, "FORBIDDEN. ADMINS have already taken action. Cannot edit now.")
    }

    leaveApplication.leaveType = leaveCategory.toUpperCase();
    leaveApplication.dates = dates;
    leaveApplication.reason = reason;
    leaveApplication.appliedOn = now;

    await leaveApplication.save();
}

const deleteLeaveRequest = async(leaveId, userid) => {
    const leaveApplication = await LeaveApplication.findById(leaveId);

    if (String(leaveApplication.userid) !== userid) {
        throw new ApiError(
            403,
            "YOU CANNOT DELETE OTHER PEOPLE's LEAVE APPLICATION"
        );
    }

    if (leaveApplication.status !== "PENDING") {
        throw new ApiError(
            403,
            "FORBIDDEN. ADMINS have already taken action. Cannot delete now."
        );
    }

    await LeaveApplication.findByIdAndDelete(leaveId);
}

module.exports = {
    getAttendanceDataByUserId,
    markAttendanceOnLogin,
    markEndOfSession,
    applyLeave,
    getLeaveRequests,
    adminProcessLeaveRequest,
    editLeaveRequest,
    deleteLeaveRequest,
};
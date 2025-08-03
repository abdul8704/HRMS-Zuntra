const Attendance = require("../models/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const attendanceHelper = require("../utils/attendanceHelper.js");
const LeaveApplication = require("../models/leaveApplication.js");
const Holiday = require('./holidayService.js')

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

const fetchAttendanceRecords = async (
    userid,
    startDate,
    endDate,
) => {
    const start = attendanceHelper.normalizeToUTCDate(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = attendanceHelper.normalizeToUTCDate(endDate);
    end.setUTCHours(23, 59, 59, 999);

    if (!start || !end) {
        throw new ApiError(400, "Invalid start or end date format");
    }

    const holidays = await Holiday.getHolidaysInRange(start, end);

    const attendanceRecords = await Attendance.find({
        userid,
        date: { $gte: start, $lte: end },
    }, {sessions: 0}).sort({ date: 1 });

    const attendanceMap = new Map();
    for (const record of attendanceRecords) {
        const dateStr = record.date.toISOString().split("T")[0];
        attendanceMap.set(dateStr, record);
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays =
        Math.floor((end.getTime() - start.getTime()) / oneDay) + 1;

    return { start, totalDays, attendanceMap, holidays };
};

const getCalendarDataOnly = async (
    userid,
    startDate,
    endDate,
) => {
    const {
        start,
        totalDays,
        attendanceMap,
        holidays: hol,
    } = await fetchAttendanceRecords(userid, startDate, endDate);
    
    const calendar = [];

    for (let i = 0; i < totalDays; i++) {
        const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const currentDateStr = current.toISOString().split("T")[0];

        if (hol.includes(currentDateStr)) {
            calendar.push({ date: currentDateStr, status: "holiday" });
            continue;
        }

        const record = attendanceMap.get(currentDateStr);
        const status = record ? record.status || "present" : "absent";
        calendar.push({ date: currentDateStr, status });
    }

    return calendar
};

const getWorkBreakCompositionOnly = async (
    userid,
    startDate,
    endDate,
) => {
    const {
        start,
        totalDays,
        attendanceMap,
        holidays: hol,
    } = await fetchAttendanceRecords(userid, startDate, endDate);
    const workBreakComposition = [];
    for (let i = 0; i < totalDays; i++) {
        const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const currentDateStr = current.toISOString().split("T")[0];
        const name = `${current.getDate()}/${current.getMonth() + 1}`;
        const day = current.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
        if (hol.includes(currentDateStr)) {
            workBreakComposition.push({
                date: currentDateStr,
                name,
                day,
                work: 0,
                break: 0,
            });
            continue;
        }

        const record = attendanceMap.get(currentDateStr);
        workBreakComposition.push({
            date: currentDateStr,
            name,
            day,
            work: record?.workingMinutes || 0,
            break: record?.breakMinutes || 0,
        });
    }
    return workBreakComposition;
};

const getAttendanceDataOnly = async (userid, startDate, endDate) => {
    const {
        start,
        totalDays,
        attendanceMap,
        holidays: hol,
    } = await fetchAttendanceRecords(userid, startDate, endDate);

    const attendanceData = [];

    let holIndex = 0;
    const holidayCountRaw = hol.length;

    let presentCount = 0;
    let remoteCount = 0;
    let absentCount = 0;
    let holidayCount = 0;
    let totalDaysCount = totalDays;

    for (let i = 0; i < totalDays; i++) {
        const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const currentDateStr = current.toISOString().split("T")[0];

        let status = "";
        const record = attendanceMap.get(currentDateStr);

        let isHoliday = false;

        if (holIndex < holidayCountRaw) {
            const holDateStr = new Date(hol[holIndex].date)
                .toISOString()
                .split("T")[0];
            if (holDateStr === currentDateStr) {
                isHoliday = true;
                status = "holiday";
                holIndex++;
                holidayCount++;
            }
        }

        if (record) {
            const workingMins = record.workingMinutes || 0;
            const baseStatus = record.status || "present";

            if (typeof record.lateBy === "number") {
                if (record.lateBy > 0) {
                    status = `${baseStatus} - late by ${record.lateBy} minutes`;
                } else if (record.lateBy < 0) {
                    status = `${baseStatus} - early by ${Math.abs(
                        record.lateBy
                    )} minutes`;
                } else {
                    status = baseStatus;
                }
            } else {
                status = baseStatus;
            }

            if (baseStatus === "present") presentCount++;
            else if (baseStatus === "remote") remoteCount++;

            if (isHoliday) {
                status = `holiday - worked for ${workingMins} minutes`;
            }
        } else if (!isHoliday) {
            status = "absent";
            absentCount++;
        }

        attendanceData.push({ date: currentDateStr, status });
    }

    return {
        attendanceData,
        stats: {
            totalDaysCount,
            presentCount,
            remoteCount,
            absentCount,
            holidayCount,
        },
    };
};

module.exports = {
    markAttendanceOnLogin,
    markEndOfSession,
    applyLeave,
    getLeaveRequests,
    adminProcessLeaveRequest,
    editLeaveRequest,
    deleteLeaveRequest,
    getCalendarDataOnly,
    getWorkBreakCompositionOnly,
    getAttendanceDataOnly,
};
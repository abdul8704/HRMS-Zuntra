const Attendance = require("../models/attendanceManagement/attendance.js");
const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const attendanceHelper = require("../utils/attendanceHelper.js");
const LeaveApplication = require("../models/attendanceManagement/leaveApplication.js");
const Holiday = require("./holidayService.js");

const markAttendanceOnLogin = async (userid, mode) => {
    const today = attendanceHelper.normalizeToUTCDate(new Date());
    const now = attendanceHelper.toUTCTimeOnly(new Date());
    const shiftData = await User.findById(userid).populate(
        "shift",
        "startTime endTime"
    );

    if (!shiftData) {
        throw new ApiError(404, "User not found");
    }

    const shiftStartTime = shiftData.shift
        ? new Date(shiftData.shift.startTime)
        : new Date(new Date().setHours(0, 0, 0, 0));
    const shiftEndTime = (shiftData.shift)
        ? new Date(shiftData.shift.endTime)
        : new Date(new Date().setHours(23, 59, 0, 0));
        
    if (isNaN(shiftStartTime.getTime()) || isNaN(shiftEndTime.getTime())) {
        throw new ApiError(400, "Unable to process shift timings");
    }

    let attendance = await Attendance.findOne({ userid, date: today });

    if (!attendance) {
        attendance = new Attendance({
            userid,
            date: today,
            sessions: [
                {
                    loginTime: now,
                    lastRequest: now,
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

        if (
            shiftStartTime - now <= 60 * 60 * 1000 ||
            now - shiftStartTime >= 0
        ) {
            attendance.lateBy = (now - shiftStartTime) / 60_000;
        }

        await attendance.save();
        return {
            success: true,
            message: "Attendance marked (first login of the day)",
        };
    }

    // 👇 If an attendance record exists, auto-close last session if it's still open
    if (attendance.sessions.length > 0) {
        const lastSession = attendance.sessions[attendance.sessions.length - 1];

        if (
            (lastSession &&
                !lastSession.logoutTime &&
                lastSession.lastRequest) ||
            (lastSession && lastSession.logoutTime && lastSession.lastRequest && lastSession.logoutTime < lastSession.lastRequest)
        ) {
            // Use lastRequest as logoutTime
            const logoutTime = lastSession.lastRequest;

            if (logoutTime > new Date(lastSession.loginTime)) {
                const sessionDurationMs =
                    logoutTime - new Date(lastSession.loginTime);
                const sessionDurationMinutes = sessionDurationMs / (1000 * 60);

                lastSession.logoutTime = logoutTime;
                attendance.workingMinutes += sessionDurationMinutes;
                await attendance.save();
            }
        }
    }
    // Existing record → create new session
    if (attendance.status === "remote" && mode === "onsite") {
        attendance.status = "present";
    }

    attendance.sessions.push({
        loginTime: now,
        lastRequest: now,
        mode: now >= shiftStartTime && now <= shiftEndTime ? mode : "extra",
    });

    await attendance.save();
    return { success: true, message: "Attendance updated (subsequent login)" };
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
    const leaveRequests = await LeaveApplication.find({ userid: userid })
        .populate({
            path: "userid",
            select: "username email phoneNumber profilePicture",
        })
        .populate({
            path: "adminReviewer superAdminReviewer",
            select: "username email phoneNumber profilePicture",
        })
        .sort({ dates: -1 })
        .lean();

    const formattedRequest = leaveRequests.map((leaveReq) => ({
        leaveId: leaveReq._id,
        leaveType: leaveReq.leaveType,
        requestedBy: leaveReq.userid.username,
        requestedId: leaveReq.userid._id,
        requestedUserEmail: leaveReq.userid.email,
        requestedPhone: leaveReq.userid.phoneNumber,
        appliedOn: leaveReq.appliedOn.toISOString().split("T")[0],
        dates: leaveReq.dates.map((date) => date.toISOString().split("T")[0]),
        reason: leaveReq.reason,
        status: leaveReq.status,
        TL: leaveReq.adminAction,
        HR: leaveReq.superAdminAction,
        TLComment: leaveReq.adminReviewComment,
        HRComment: leaveReq.superAdminReviewComment,
    }));

    return formattedRequest;
};

const adminProcessLeaveRequest = async (
    userid,
    leaveId,
    decision,
    comments = "NIL"
) => {
    const finalDecision =
        decision.toUpperCase() === "APPROVED" ? "APPROVED" : "REJECTED";
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
        }
    } else {
        leaveApplication.status = finalDecision;
        leaveApplication.adminAction = finalDecision;
        leaveApplication.adminReviewer = userid;
        leaveApplication.adminReviewedAt = now;
        leaveApplication.adminReviewComment = comments;
    }

    await leaveApplication.save();
};

const editLeaveRequest = async (
    leaveId,
    userid,
    payload
) => {
    const leaveApplication = await LeaveApplication.findById(leaveId);

    if (String(leaveApplication.userid) !== userid) {
        throw new ApiError(
            403,
            "YOU CANNOT CHANGE OTHER PEOPLE's LEAVE APPLICATION"
        );
    }

    if (leaveApplication.status !== "PENDING") {
        throw new ApiError(
            403,
            "FORBIDDEN. ADMINS have already taken action. Cannot edit now."
        );
    }

    leaveApplication.leaveType = payload.leaveType;
    leaveApplication.dates = payload.dates;
    leaveApplication.reason = payload.reason;

    await leaveApplication.save();
};

const deleteLeaveRequest = async (leaveId, userid) => {
    const leaveApplication = await LeaveApplication.findById(leaveId);

    if (String(leaveApplication.userid) !== userid) {
        throw new ApiError(
            403,
            "YOU CANNOT DELETE OTHER PEOPLE's LEAVE APPLICATION"
        );
    }

    await LeaveApplication.findByIdAndDelete(leaveId);
};

const fetchAttendanceRecords = async (userid, startDate, endDate) => {
    const start = attendanceHelper.normalizeToUTCDate(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = attendanceHelper.normalizeToUTCDate(endDate);
    end.setUTCHours(23, 59, 59, 999);

    if (!start || !end) {
        throw new ApiError(400, "Invalid start or end date format");
    }

    const holidays = await Holiday.getHolidaysInRange(start, end, userid);

    const attendanceRecords = await Attendance.find(
        {
            userid,
            date: { $gte: start, $lte: end },
        },
        { sessions: 0 }
    ).sort({ date: 1 });

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

const getCalendarDataOnly = async (userid, startDate, endDate) => {
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

    return calendar;
};

const getWorkBreakCompositionOnly = async (userid, todayStr) => {
    const today = new Date(todayStr);
    today.setHours(0, 0, 0, 0);

    // Utility to calculate past N days
    const getPastDate = (date, daysAgo) => {
        const d = new Date(date);
        d.setDate(d.getDate() - daysAgo);
        return d;
    };

    // Calculate start dates
    const startDate7 = getPastDate(today, 6); // include today (7 total days)
    const startDate30 = getPastDate(today, 29);

    // Fetch records once, covering 30 days
    const {
        start,
        totalDays,
        attendanceMap,
        holidays: hol,
    } = await fetchAttendanceRecords(userid, startDate30, todayStr);

    const workBreakComposition7 = [];
    const workBreakComposition30 = [];

    for (let i = 0; i < totalDays; i++) {
        const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const currentDateStr = current.toISOString().split("T")[0];
        const name = `${current.getDate()}/${current.getMonth() + 1}`;
        const day = current
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase();

        const dataPoint = {
            date: currentDateStr,
            name,
            day,
            work: 0,
            break: 0,
        };

        if (!hol.includes(currentDateStr)) {
            const record = attendanceMap.get(currentDateStr);
            dataPoint.work = record?.workingMinutes || 0;
            dataPoint.break = record?.breakMinutes || 0;
        }

        // Push to both 30-day and 7-day arrays as needed
        if (current >= startDate7) {
            workBreakComposition7.push(dataPoint);
        }

        workBreakComposition30.push(dataPoint);
    }

    return {
        last7Days: workBreakComposition7,
        last30Days: workBreakComposition30,
    };
};

const getAttendanceDataOnly = async (userid, startDate, endDate) => {
    const {
        start,
        totalDays,
        attendanceMap,
        holidays: hol, // now each holiday has `dates: []`
    } = await fetchAttendanceRecords(userid, startDate, endDate);

    const attendanceData = [];

    let presentCount = 0;
    let remoteCount = 0;
    let absentCount = 0;
    let holidayCount = 0;
    let totalDaysCount = totalDays;

    // Flatten holidays into a Set of YYYY-MM-DD strings for quick lookup
    const holidayDatesSet = new Set();
    hol.forEach((h) => {
        (h.dates || []).forEach((d) => {
            const dateStr = new Date(d).toISOString().split("T")[0];
            holidayDatesSet.add(dateStr);
        });
    });

    for (let i = 0; i < totalDays; i++) {
        const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const currentDateStr = current.toISOString().split("T")[0];

        let status = "";
        const record = attendanceMap.get(currentDateStr);

        let isHoliday = holidayDatesSet.has(currentDateStr);
        if (isHoliday) {
            status = "holiday";
            holidayCount++;
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
                if (workingMins > 0)
                    status = `holiday - worked for ${workingMins} minutes`;
                else status = "holiday";
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

const getTimeCards = async (userid, date) => {
    const attendance = await Attendance.findOne({ userid, date });

    if (!attendance) {
        return {
            login: "N/A",
            logout: "N/A",
            work: "N/A",
            break: "N/A",
        };
    }

    const N = attendance.sessions.length;

    let loginTime = "N/A";
    let logoutTime = "N/A";
    let breakTime = "N/A";
    let workTime = "N/A";

    if (attendance.sessions[0].loginTime)
        loginTime = attendanceHelper.formatTime(
            attendance.sessions[0].loginTime
        );

    if (attendance.sessions[N - 1].logoutTime)
        logoutTime = attendanceHelper.formatTime(
            attendance.sessions[N - 1].logoutTime
        );

    if (attendance.workingMinutes)
        workTime = attendanceHelper.convertMinutes(attendance.workingMinutes);

    if (attendance.breakMinutes)
        breakTime = attendanceHelper.convertMinutes(attendance.breakMinutes);

    const timeCards = {
        login: loginTime,
        logout: logoutTime,
        work: workTime,
        break: breakTime,
    };

    return timeCards;
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
    getTimeCards,
};

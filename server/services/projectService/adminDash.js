const Timesheet = require("../../models/projectManagement/timeSheet");
const UserPersonal = require("../../models/userPersonal");
const Attendance = require("../../models/attendanceManagement/attendance");

const WORK_HOURS = 8;

const getUserCreditSummary = async (userId) => {
    // Find all timesheet records for the user, populate task info
    const timesheets = await Timesheet.find({ userId })
        .populate({
            path: "taskId",
            select: "title status description expectedMinutes deadline completedAt",
        })
        .lean();

    // Filter positive and negative credits
    const positiveCredits = timesheets.filter((ts) => ts.credit > 0);
    const negativeCredits = timesheets.filter((ts) => ts.credit < 0);

    // Tasks not yet submitted (endTime not defined)
    const notSubmitted = timesheets.filter((ts) => !ts.endTime);

    // Count variables
    const totalTasks = timesheets.length;
    let doneOnTime = 0;
    let lateSubmissions = 0;
    let deadlinesMissed = 0;

    timesheets.forEach((ts) => {
        if (ts.endTime && ts.taskId && ts.taskId.deadline) {
            if (ts.endTime <= ts.taskId.deadline) {
                doneOnTime++;
            } else {
                lateSubmissions++;
                // Missed deadline if endTime > deadline
                deadlinesMissed++;
            }
        }
    });

    // Total credits and possible credits
    const totalCredits = timesheets.reduce(
        (sum, ts) => sum + (ts.credit || 0),
        0
    );
    const totalPossibleCredits = totalTasks * 2;

    // Map to include relevant task info, now with description
    const format = (ts) => ({
        timesheetId: ts._id,
        credit: ts.credit,
        type: ts.type,
        reviewStatus: ts.reviewStatus,
        startTime: ts.startTime,
        endTime: ts.endTime,
        task: ts.taskId
            ? {
                  taskId: ts.taskId._id,
                  title: ts.taskId.title,
                  description: ts.taskId.description,
                  status: ts.taskId.status,
                  expectedMinutes: ts.taskId.expectedMinutes,
                  deadline: ts.taskId.deadline,
                  completedAt: ts.taskId.completedAt,
              }
            : null,
    });

    return {
        positiveCredits: positiveCredits.map(format),
        negativeCredits: negativeCredits.map(format),
        notSubmitted: notSubmitted.map(format),
        totalPositive: positiveCredits.length,
        totalNegative: negativeCredits.length,
        totalTasks,
        doneOnTime,
        lateSubmissions,
        deadlinesMissed,
        totalCredits,
        totalPossibleCredits,
    };
};

const getUserAttendanceSummary = async (userId, startDate, endDate) => {
    // Default date range: start of this month to today
    const now = new Date();
    const start = startDate
        ? new Date(startDate)
        : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = endDate ? new Date(endDate) : now;

    // Get attendance records in range
    const attendanceRecords = await Attendance.find({
        userid: userId,
        date: { $gte: start, $lte: end },
    }).lean();

    let totalMinutes = 0;
    let onsiteMinutes = 0;
    let remoteMinutes = 0;
    let extraMinutes = 0;

    let presentDays = 0;
    let remoteDays = 0;

    attendanceRecords.forEach((record) => {
        record.sessions.forEach((session) => {
            if (session.loginTime && session.logoutTime) {
                const minutes =
                    (new Date(session.logoutTime) -
                        new Date(session.loginTime)) /
                    (1000 * 60);
                totalMinutes += minutes;
                if (session.mode === "onsite") onsiteMinutes += minutes;
                else if (session.mode === "remote") remoteMinutes += minutes;
                else if (session.mode === "extra") extraMinutes += minutes;
            }
        });

        if (record.status === "present") presentDays++;
        else if (record.status === "remote") remoteDays++;
    });

    // Get salary info
    const userPersonal = await UserPersonal.findById(userId).lean();
    const salary = userPersonal?.Salary || 0;

    // Calculate net amount payable (assuming salary is monthly and 8 hours/day, 22 working days/month)
    const totalHours = totalMinutes / 60;
    const onsiteHours = onsiteMinutes / 60;
    const remoteHours = remoteMinutes / 60;
    const extraHours = extraMinutes / 60;

    // Example: salary per hour
    const workingDays = 22;
    const WORK_HOURS_PER_DAY = 8;
    const totalWorkingHours = workingDays * WORK_HOURS_PER_DAY;
    const salaryPerHour = salary / totalWorkingHours;
    const netPayable = +(totalHours * salaryPerHour).toFixed(2);

    const standardPay =
        (presentDays + remoteDays) * (WORK_HOURS * salaryPerHour);

    return {
        standardPay: +standardPay.toFixed(2),
        totalHours: +totalHours.toFixed(2),
        onsiteHours: +onsiteHours.toFixed(2),
        remoteHours: +remoteHours.toFixed(2),
        extraHours: +extraHours.toFixed(2),
        salary,
        netPayable,
    };
};

const getStandardPay = async (userId, startDate, endDate) => {
    const now = new Date();
    const start = startDate
        ? new Date(startDate)
        : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = endDate ? new Date(endDate) : now;

    // Get present/remote attendance records
    const attendanceRecords = await Attendance.find({
        userid: userId,
        date: { $gte: start, $lte: end },
        status: { $in: ["present", "remote"] },
    }).lean();
    let presentOrRemoteDays = attendanceRecords.length;

    // Get all days in range
    const workingDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Subtract holidays
    const HolidayService = require("../../services/holidayService");
    const holidays = await HolidayService.getHolidaysInRange(
        start,
        end,
        userId
    );
    let holidayDates = new Set();
    holidays.forEach((h) => {
        h.dates.forEach((d) => {
            if (d >= start && d <= end)
                holidayDates.add(new Date(d).toDateString());
        });
    });
    const numHolidays = holidayDates.size;
    const numWorkingDays = workingDays - numHolidays;

    // Get salary info
    const userPersonal = await UserPersonal.findById(userId).lean();
    const salary = userPersonal?.Salary || 0;

    const WORK_HOURS_PER_DAY = 8;
    const standardPay = +(
        presentOrRemoteDays *
        WORK_HOURS_PER_DAY *
        (salary / (22 * WORK_HOURS_PER_DAY))
    ).toFixed(2);

    return {
        standardPay: +standardPay.toFixed(2),
        workingDays: numWorkingDays,
        holidays: numHolidays,
        presentOrRemoteDays,
    };
};

module.exports = {
    getUserCreditSummary,
    getUserAttendanceSummary,
    getStandardPay,
};

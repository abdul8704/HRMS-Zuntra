const Team = require("../../models/projectManagement/team");
const TeamMember = require("../../models/projectManagement/teamMember");
const { getMembersOfTeamService } = require("./teamService");
const Phase = require("../../models/projectManagement/phase");
const Timesheet = require("../../models/projectManagement/timeSheet");
const UserPersonal = require("../../models/userPersonal");
const Attendance = require("../../models/attendanceManagement/attendance");
const constants = require("../../constants/appConstants");

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
    const totalWorkingHours = workingDays * constants.WORK_HOURS_PER_DAY;
    const salaryPerHour = salary / totalWorkingHours;
    const netPayable = +(totalHours * salaryPerHour).toFixed(2);

    const standardPay =
        (presentDays + remoteDays) * (constants.WORK_HOURS_PER_DAY * salaryPerHour);

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

    const standardPay = +(
        presentOrRemoteDays *
        constants.WORK_HOURS_PER_DAY *
        (salary / (22 * constants.WORK_HOURS_PER_DAY))
    ).toFixed(2);

    return {
        standardPay: +standardPay.toFixed(2),
        workingDays: numWorkingDays,
        holidays: numHolidays,
        presentOrRemoteDays,
    };
};

const getPhaseToolCost = async (phaseId) => {
    const phase = await Phase.findById(phaseId).lean();

    if (!phase) throw new ApiError(400, "Phase not found");

    if (!phase.startDate || !phase.endDate)
        throw new ApiError(400, "Phase startDate or endDate missing");

    // Calculate duration in months (partial months count as full)
    const start = new Date(phase.startDate);
    const end = new Date(phase.endDate);
    let months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    // If end day is after start day, add 1 month
    if (end.getDate() >= start.getDate()) months++;
    if (months < 1) months = 1;

    let totalCost = 0;
    let breakdown = [];
    if (Array.isArray(phase.tools)) {
        phase.tools.forEach((toolSnap) => {
            const cost =
                (toolSnap.unitCost || 0) * (toolSnap.quantity || 1) * months;
            totalCost += cost;
            breakdown.push({
                name: toolSnap.name,
                quantity: toolSnap.quantity,
                unitCost: toolSnap.unitCost,
                months,
                cost,
                currency: toolSnap.currency || "",
            });
        });
    }
    return { totalCost, months, breakdown };
};

const getPhaseTeamMemberPay = async (phaseId, startDate, endDate) => {
    const phase = await Phase.findById(phaseId)
        .populate({
            path: "teams",
            select: "teamName teamLead teamDescription",
        })
        .lean();
    if (!phase) throw new ApiError(404, "Phase not found");
    const teams = phase.teams || [];
    let result = [];

    for (const team of teams) {
        const { teamMembers, teamLead } = await getMembersOfTeamService(
            team._id
        );
        let totalPay = 0;
        // Team lead pay
        if (teamLead) {
            const pay = await getStandardPay(teamLead._id, startDate, endDate);
            totalPay += pay.standardPay || 0;
        }
        // Team members pay
        for (const member of teamMembers) {
            if (member.userId) {
                const pay = await getStandardPay(
                    member.userId._id,
                    startDate,
                    endDate
                );
                totalPay += pay.standardPay || 0;
            }
        }
        result.push({
            teamId: team._id,
            teamName: team.teamName,
            pay: +totalPay.toFixed(2),
        });
    }
    return result;
};

const getProjectPhaseCosts = async (projectId) => {
    const phases = await Phase.find({ project: projectId })
        .select("_id name startDate endDate tools teams")
        .lean();
    let result = [];
    for (const phase of phases) {
        // Tool cost
        const toolCostResult = await getPhaseToolCost(phase._id);
        const toolCost = toolCostResult.totalCost || 0;
        // Employee cost
        const empCostResult = await getPhaseTeamMemberPay(
            phase._id,
            phase.startDate,
            phase.endDate
        );
        const employeeCost = empCostResult.reduce(
            (sum, t) => sum + (t.pay || 0),
            0
        );
        result.push({
            phaseId: phase._id,
            phaseName: phase.name,
            toolCost: +toolCost.toFixed(2),
            employeeCost: +employeeCost.toFixed(2),
        });
    }
    return result;
};

module.exports = {
    getUserCreditSummary,
    getUserAttendanceSummary,
    getStandardPay,
    getPhaseToolCost,
    getPhaseToolCost,
    getPhaseTeamMemberPay,
    getProjectPhaseCosts,
};

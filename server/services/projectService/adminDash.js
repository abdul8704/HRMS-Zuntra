const Timesheet = require("../../models/projectManagement/timeSheet");

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

module.exports = {
    getUserCreditSummary,
};

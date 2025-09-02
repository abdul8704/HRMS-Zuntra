const Task = require("../../models/projectManagement/task");
const ApiError = require("../../errors/ApiError");
const phaseService = require("./phaseService");
const Timesheet = require("../../models/projectManagement/timeSheet");

const createTask = async (data, user) => {
    let assignment = {
        mode: data.assignment.mode,
    };
    let status = "open";
    if (data.assignment.mode === "direct") {
        assignment.assignedTo = data.assignment.assignedTo;
        status = "assigned";
    }
    const task = await Task.create({
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        phaseId: data.phaseId,
        createdBy: user.userid,
        assignment,
        status,
        expectedMinutes: data.expectedMinutes,
        deadline: data.deadline,
    });
    return task;
};

const editTask = async (taskId, updateData) => {
    let assignment = {
        mode: updateData.assignment.mode,
    };
    let status = "open";
    if (updateData.assignment.mode === "direct") {
        assignment.assignedTo = updateData.assignment.assignedTo;
        status = "assigned";
    }
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
            title: updateData.title,
            description: updateData.description,
            projectId: updateData.projectId,
            phaseId: updateData.phaseId,
            assignment,
            status,
            expectedMinutes: updateData.expectedMinutes,
            deadline: updateData.deadline,
        },
        { new: true }
    );
    return updatedTask;
};

const getTasksAssignedToUser = async (userId) => {
    return Task.find({
        "assignment.mode": "direct",
        "assignment.assignedTo": userId,
    }).lean();
};

const getOpenTasksForTeams = async (teamIds, phaseId) => {
    // Get teams in the phase
    const phaseTeams = await phaseService.getPhaseTeams(phaseId);
    // Check if any of user's teams are part of this phase
    const userTeamsInPhase = teamIds.filter((teamId) =>
        phaseTeams.some((pt) => pt._id.toString() === teamId.toString())
    );
    if (userTeamsInPhase.length === 0) {
        return [];
    }
    // Return open tasks for the phase
    return Task.find({
        "assignment.mode": "open",
        status: { $in: ["open", "rework"] },
        phaseId,
    }).lean();
};

const acceptOpenTask = async ({ taskId, userId }) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    // Only allow accepting if assignment.mode is 'open' and status is 'open'
    if (task.assignment.mode !== "open" || task.status !== "open") {
        throw new ApiError(400, "Task is not open for acceptance");
    }

    // Update assignment.acceptedBy and status
    task.assignment.acceptedBy = userId;
    task.assignment.acceptedAt = new Date();
    task.status = "in_progress";
    await task.save();

    // Create timesheet entry
    await Timesheet.create({
        userId,
        projectId: task.projectId,
        phaseId: task.phaseId,
        taskId: task._id,
        startTime: new Date(),
        endTime: null,
        type: "initial",
    });

    return task;
};
const acceptAssignedTask = async ({ taskId, userId }) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    // Only allow accepting if assignment.mode is 'direct' and status is 'assigned'
    if (
        task.assignment.mode !== "direct" ||
        task.status !== "assigned" ||
        task.assignment.assignedTo.toString() !== userId.toString()
    ) {
        throw new ApiError(400, "Task is not for you");
    }

    // Update assignment.acceptedBy and status
    task.assignment.acceptedBy = userId;
    task.assignment.acceptedAt = new Date();
    task.status = "in_progress";
    await task.save();

    // Create timesheet entry
    await Timesheet.create({
        userId,
        projectId: task.projectId,
        phaseId: task.phaseId,
        taskId: task._id,
        startTime: new Date(),
        endTime: null,
        type: "initial",
    });

    return task;
};

const getMyTasks = async (userId) => {
    return Task.find({
        $or: [
            { "assignment.mode": "direct", "assignment.assignedTo": userId },
            { "assignment.mode": "open", "assignment.acceptedBy": userId },
        ],
        status: ["in_progress", "rework"],
    }).lean();
};

const submitTaskForReview = async ({ taskId, userId, note }) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    let first = !task.history || task.history.length === 0;

    // Only allow if user accepted the task and it's in progress
    if (
        task.status !== "in_progress" ||
        !task.assignment.acceptedBy ||
        task.assignment.acceptedBy.toString() !== userId.toString()
    ) {
        throw new ApiError(400, "You cannot submit this task for review");
    }

    // Update status, completedAt, and add history
    task.status = "submitted";
    task.completedAt = new Date();

    if (!task.history) task.history = [];

    task.history.push({
        by: userId,
        at: new Date(),
        note: note || "",
    });

    if (first) {
        const timesheet = await Timesheet.findOne({
            userId,
            projectId: task.projectId,
            phaseId: task.phaseId,
            taskId: task._id,
            type: "initial",
        });

        timesheet.endTime = new Date();
        await timesheet.save();
    } else {
        const timesheet = await Timesheet.create({
            userId,
            projectId: task.projectId,
            phaseId: task.phaseId,
            taskId: task._id,
            type: "review",
            endTime: new Date(),
        });

        await timesheet.save();
    }

    await task.save();
    return task;
};

const tlAcceptTask = async (
    taskId,
    note = undefined,
    credit = undefined,
    userid
) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    if (!["submitted", "rework"].includes(task.status)) {
        throw new ApiError(400, "Task is not awaiting review");
    }

    task.review = {
        reviewer: userid,
        status: "accepted",
        comments: note || "",
        reviewedAt: new Date(),
    };

    const timeSheet = await Timesheet.findOne({
        userId: task.assignment.acceptedBy,
        projectId: task.projectId,
        phaseId: task.phaseId,
        taskId: task._id,
    });

    timeSheet.endTime = task.completedAt || new Date();

    if (credit === undefined) {
        const durationMinutes = Math.floor(
            (timeSheet.endTime - timeSheet.startTime) / 60000
        );
        const delta = task.expectedMinutes - durationMinutes;

        if (delta > 0) 
            timeSheet.credit = 2;
        else if (task.completedAt <= task.deadline) 
            timeSheet.credit = 1;
        else if (delta < 0 && task.completedAt < task.deadline)
            timeSheet.credit = -1;
        else if (delta < 0 && task.completedAt >= task.deadline)
            timeSheet.credit = -2;
        else 
            timeSheet.credit = 0;
    } else {
        timeSheet.credit = credit;
    }

    task.status = "accepted";
    task.history.push({
        status: "accepted",
        by: userid,
        at: new Date(),
        note: note || "",
    });

    await timeSheet.save();
    await task.save();
    return "done";
};

const getTasksForReview = async (userId) => {
    return Task.find({
        createdBy: userId,
        status: "submitted",
    }).lean();
};

const tlReworkTask = async (
    taskId,
    reviewerId,
    note,
    assignToSameEmp,
    newDeadline,
    newExpectedMinutes
) => {
    console.log(
        taskId,
        reviewerId,
        note,
        assignToSameEmp,
        newDeadline,
        newExpectedMinutes
    );
    const task = await Task.findOne({ _id: taskId });

    if (!task) throw new ApiError(404, "Task not foundddd");

    if (!["submitted", "rework"].includes(task.status)) {
        throw new ApiError(400, "Task is not awaiting review");
    }

    // ---- Update Task ----
    task.status = "rework";
    task.deadline = newDeadline;
    task.expectedMinutes = newExpectedMinutes;
    task.acceptedAt = null;
    task.completedAt = null;

    // Review object
    task.review = {
        reviewer: reviewerId,
        status: "rework",
        comments: note || "",
        reviewedAt: new Date(),
    };

    // History
    if (!task.history) task.history = [];
    task.history.push({
        status: "rework",
        by: reviewerId,
        at: new Date(),
        note: note || "",
    });

    // ---- Assignment logic ----
    if (assignToSameEmp && task.assignment?.acceptedBy) {
        // Keep the same employee assigned
        task.assignment.mode = "direct";
        task.assignment.assignedTo = task.assignment.acceptedBy;
        task.assignment.acceptedBy = null;
        task.assignment.acceptedAt = null;
    } else {
        // Open to all
        task.assignment.mode = "open";
        task.assignment.assignedTo = null;
        task.assignment.acceptedBy = null;
        task.assignment.acceptedAt = null;
    }

    // ---- Create Timesheet for rework ----
    const reworkTimesheet = new Timesheet({
        userId: assignToSameEmp ? task.assignment.assignedTo : null, // filled later if open
        projectId: task.projectId,
        phaseId: task.phaseId,
        taskId: task._id,
        startTime: new Date(),
        type: "rework",
        reviewStatus: "rework",
        reviewedBy: reviewerId,
    });

    await reworkTimesheet.save();
    await task.save();

    return task;
};


// ...existing code...

const deleteTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    console.log(taskId, userId, task.createdBy);

    if (task.createdBy.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this task");
    }

    // Remove all timesheets related to this task
    await Timesheet.deleteMany({ taskId: task._id });

    // Remove the task itself
    await Task.deleteOne({ _id: task._id });

    return { success: true };
};

module.exports = {
    createTask,
    editTask,
    getTasksAssignedToUser,
    getOpenTasksForTeams,
    acceptOpenTask,
    acceptAssignedTask,
    submitTaskForReview,
    getMyTasks,
    tlAcceptTask,
    getTasksForReview,
    tlReworkTask,
    deleteTask,
    // ...other services
};

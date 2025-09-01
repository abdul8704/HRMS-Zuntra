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
        createdBy: user._id,
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
        status: "open",
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
    if (task.assignment.mode !== "direct" || task.status !== "assigned" || task.assignment.assignedTo.toString() !== userId.toString()) {
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

module.exports = {
    createTask,
    editTask,
    getTasksAssignedToUser,
    getOpenTasksForTeams,
    acceptOpenTask,
    acceptAssignedTask,
    // ...other services
};

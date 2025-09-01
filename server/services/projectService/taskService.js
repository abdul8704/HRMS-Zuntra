const Task = require("../../models/projectManagement/task");
const ApiError = require("../../errors/ApiError");
const phaseService = require("./phaseService");

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

module.exports = {
    createTask,
    editTask,
    getTasksAssignedToUser,
    getOpenTasksForTeams,
    // ...other services
};

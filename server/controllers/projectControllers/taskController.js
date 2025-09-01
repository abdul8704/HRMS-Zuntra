const asyncHandler = require("express-async-handler");
const TaskService = require("../../services/projectService/taskService");
const phaseService = require("../../services/projectService/phaseService");
const teamService = require("../../services/projectService/teamService");
const ApiError = require("../../errors/ApiError");

const createTask = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        projectId,
        phaseId,
        assignment,
        expectedMinutes,
        deadline,
    } = req.body;
    if (
        !title ||
        !expectedMinutes ||
        !description ||
        !deadline ||
        !projectId ||
        !phaseId ||
        !assignment ||
        !assignment.mode
    ) {
        throw new ApiError(400, "Missing required fields");
    }

    // Check if user is team leader for the phase
    const teamsLed = await phaseService.getTeamsLedByUserInPhase(
        phaseId,
        req.user.userid
    );
    if (!teamsLed || teamsLed.length === 0) {
        throw new ApiError(403, "User is not a team leader for this phase");
    }
    const task = await TaskService.createTask(req.body, req.user);
    res.status(201).json({ success: true, task });
});

const editTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body;
    // Validate required fields (same as create)
    const {
        title,
        description,
        projectId,
        phaseId,
        assignment,
        expectedMinutes,
        deadline,
    } = updateData;
    if (
        !title ||
        !expectedMinutes ||
        !description ||
        !deadline ||
        !projectId ||
        !phaseId ||
        !assignment ||
        !assignment.mode
    ) {
        throw new ApiError(400, "Missing required fields");
    }
    // Check TL for phase
    const teamsLed = await phaseService.getTeamsLedByUserInPhase(
        phaseId,
        req.user.userid
    );
    if (!teamsLed || teamsLed.length === 0) {
        throw new ApiError(403, "User is not a team leader for this phase");
    }
    const updatedTask = await TaskService.editTask(taskId, updateData);
    res.status(200).json({ success: true, task: updatedTask });
});

const getMyAssignedTasks = asyncHandler(async (req, res) => {
    const userId = req.user.userid;
    const tasks = await TaskService.getTasksAssignedToUser(userId);
    res.status(200).json({ success: true, tasks });
});

const getOpenTasksForMyTeams = asyncHandler(async (req, res) => {
    const userId = req.user.userid;
    const { phaseId } = req.params;

    if (!phaseId) {
        throw new ApiError(400, "phaseId is required");
    }
    const teamIds = await teamService.getTeamIdsUserPartOf(userId);
    const tasks = await TaskService.getOpenTasksForTeams(teamIds, phaseId);
    res.status(200).json({ success: true, tasks });
});

module.exports = {
    createTask,
    editTask,
    getMyAssignedTasks,
    getOpenTasksForMyTeams,
    // ...other controllers
};

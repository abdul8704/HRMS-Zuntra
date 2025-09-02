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

const acceptOpenTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const userId = req.user.userid; // assuming userId is available in req.user

    if (!taskId || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Missing taskId or userId" });
    }

    const updatedTask = await TaskService.acceptOpenTask({ taskId, userId });
    res.status(200).json({ success: true, task: updatedTask });
});

const acceptAssignedTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const userId = req.user.userid;

    if (!taskId || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Missing taskId or userId" });
    }

    const updatedTask = await TaskService.acceptAssignedTask({ taskId, userId });
    res.status(200).json({ success: true, task: updatedTask });
});

const getMyTasks = asyncHandler(async (req, res) => {
    const userId = req.user.userid;
    const tasks = await TaskService.getMyTasks(userId);
    res.status(200).json({ success: true, tasks });
});

const submitTaskForReview = asyncHandler(async (req, res) => {
    const { taskId, note } = req.body;
    const userId = req.user.userid;

    if (!taskId) {
        throw new ApiError(400, "Missing taskId");
    }

    const updatedTask = await TaskService.submitTaskForReview({
        taskId,
        userId,
        note,
    });
    res.status(200).json({ success: true, task: updatedTask });
});

const tlAcceptTask = asyncHandler(async (req, res) => {
    const { taskId, note, credit } = req.body;
    const userId = req.user.userid;

    if (!taskId) {
        throw new ApiError(400, "Missing taskId");
    }

    const result = await TaskService.tlAcceptTask(taskId, note, credit, userId);
    res.status(200).json({ success: true, message: result });
});

const getTasksForReview = asyncHandler(async (req, res) => {
    const userId = req.user.userid;
    const tasks = await TaskService.getTasksForReview(userId);
    res.status(200).json({ success: true, tasks });
});

const tlReworkTask = asyncHandler(async (req, res) => {
    const { taskId, note = '', assignToSameEmp = false, newDeadline, newExpectedMinutes} = req.body;
    const userid = req.user.userid;

    await TaskService.tlReworkTask(String(taskId), userid, note, assignToSameEmp, newDeadline, newExpectedMinutes);
    res.status(201).json({ success: true, data: "succesfully sent to rework "});
})

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const result = await TaskService.deleteTask(taskId, req.user.userid);
    res.status(200).json({ success: true, message: "Task deleted successfully", data: result });
})

module.exports = {
    createTask,
    editTask,
    getMyAssignedTasks,
    getOpenTasksForMyTeams,
    acceptOpenTask,
    acceptAssignedTask,
    submitTaskForReview,
    getMyTasks,
    tlAcceptTask,
    getTasksForReview,
    tlReworkTask,
    deleteTask,
};

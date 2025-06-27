const mongoose = require("mongoose");
const taskService = require('../services/taskService');
const projectService = require('../services/projectService');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

// @desc Get all tasks based on projectId and status ["issued", "accepted", "under_review", "rework", "completed", "todo"]
// @route GET /api/task/:projectId/:taskStatus
const getTasksBasedOnStatus = asyncHandler(async (req, res) => {
    const { projectId, taskStatus } = req.params;
    const project = await projectService.getAProject(projectId);
    if (!project) {
        throw new ApiError(404, 'Invalid Project Id');
    }
    const validStatuses = ["issued", "accepted", "under_review", "rework", "completed", "todo"];
    if (!validStatuses.includes(taskStatus)) {
        throw new ApiError(400, 'Invalid task status');
    }
    let tasks = [];
    if (taskStatus === "todo") {
        const issuedTasks = await taskService.getTasksBasedOnStatus(new mongoose.mongo.ObjectId(projectId), "issued");
        const reworkTasks = await taskService.getTasksBasedOnStatus(new mongoose.mongo.ObjectId(projectId), "rework");
        tasks = [...reworkTasks, ...issuedTasks];
    } else {
        tasks = await taskService.getTasksBasedOnStatus(new mongoose.mongo.ObjectId(projectId), taskStatus);
    }

    if (tasks.length === 0) {
        throw new ApiError(404, 'No tasks found');
    }

    return res.status(200).json(tasks);
});

module.exports = {
    getTasksBasedOnStatus,
};

const Task = require("../models/tasks");

// @desc Get all tasks based on projectId and status ["issued", "accepted", "under_review", "rework", "completed"]
const getTasksBasedOnStatus = async (projectId, status) => {
    const tasks = await Task.find({ projectId: projectId, status: status },{title: 1, description: 1, status: 1, assignedTo: 1});
    return tasks;
};

module.exports = {
    getTasksBasedOnStatus
};
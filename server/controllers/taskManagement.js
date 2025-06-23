const taskService = require('../services/taskService');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

const getAlltask = asyncHandler(async (req, res) => {
    const tasks = await taskService.getAllTasks();
    if(tasks.length === 0)  
        throw new ApiError(404, 'No tasks found');

    return res.status(200).json(tasks);
});

module.exports = {
    getAlltask,
};
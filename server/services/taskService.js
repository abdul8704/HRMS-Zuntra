const Task = require("../models/tasks")

const getAllTasks = async () => {
    const tasks = await Task.find({});
    return tasks;
}

module.exports = {
    getAllTasks
}
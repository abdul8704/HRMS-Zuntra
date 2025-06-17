const taskService = require('../services/taskService');

const getAlltask = async (req, res) => {
    const tasks = await taskService.getAllTasks();
    if(tasks.length === 0){
        res.status(404)
        throw new Error("No tasks found");
    }
    return res.status(200).json(tasks);
};

module.exports = {
    getAlltask,
};
const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/projectControllers/taskController");

// Create new task
router.post("/", taskController.createTask);
// Edit existing task
router.put("/:taskId", taskController.editTask);
// Get tasks assigned directly to me
router.get("/assigned-to-me", taskController.getMyAssignedTasks);
// Get all open tasks issued to teams I'm part of
router.get("/open-for-my-teams/:phaseId", taskController.getOpenTasksForMyTeams);

router.post("/accept-open-task", taskController.acceptOpenTask);

router.post("/accept-assigned-task", taskController.acceptAssignedTask);

module.exports = router;

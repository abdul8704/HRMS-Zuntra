const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskManagement')

router.get("/:projectId/:taskStatus", taskController.getTasksBasedOnStatus)

module.exports = router
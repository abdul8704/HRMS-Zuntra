const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectManagement")
router.get('/all/ongoing', projectController.getAllOnGoingProjects)
router.get('/all/finished', projectController.getAllFinishedProjects)
router.get('/:projectId', projectController.getAProject)
router.post('/create', projectController.createNewProject)

module.exports = router;

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectManagement")
router.get('/ongoing', projectController.getAllOnGoingProjects)
router.get('/:projectId', projectController.getAProject)
router.get('/finished', projectController.getAllFinishedProjects)
router.post('/create', projectController.createNewProject)

module.exports = router;

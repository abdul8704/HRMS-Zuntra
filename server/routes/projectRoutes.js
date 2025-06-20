const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectManagement")
router.get('/ongoing', projectController.getAllOnGoingProjects)
router.get('/finished', projectController.getAllFinishedProjects)

module.exports = router;

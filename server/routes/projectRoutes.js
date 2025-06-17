const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectManagement")
router.get('/current', projectController.getAllCurrentProjects)
module.exports = router;

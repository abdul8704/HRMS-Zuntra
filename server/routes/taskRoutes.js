const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskManagement')

router.get("/", taskController.getAlltask)

module.exports = router
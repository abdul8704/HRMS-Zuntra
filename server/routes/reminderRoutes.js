const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");

router.post('/create', reminderController.createReminder);
router.get('/all', reminderController.getAllReminders);
router.get('/all/today', reminderController.getTodaysReminders);

module.exports = router;

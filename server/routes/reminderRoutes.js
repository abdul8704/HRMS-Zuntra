const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");

router.post('/create', reminderController.createReminder);
router.get('/all', reminderController.getAllReminders);
router.get('/all/today', reminderController.getTodaysReminders);
router.patch('/toggle-completion', reminderController.toggleReminderCompletion);
router.patch('/edit', reminderController.editRemainder);
router.delete('/delete', reminderController.deleteReminder);

module.exports = router;

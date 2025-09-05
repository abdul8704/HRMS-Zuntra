const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");
const { requirePermission } = require("../middlewares/requirePermission");

router.post("/create", requirePermission("general"), reminderController.createReminder);
router.get("/all", requirePermission("general"), reminderController.getAllReminders);
router.get("/all/today", requirePermission("general"), reminderController.getTodaysReminders);
router.put("/toggle", requirePermission("general"), reminderController.toggleReminderCompletion);
router.put("/edit", requirePermission("genreral"), reminderController.editReminder);
router.delete("/delete", requirePermission("general"), reminderController.deleteReminder);

module.exports = router;

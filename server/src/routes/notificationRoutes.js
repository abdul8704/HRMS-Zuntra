const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");

router.post("/", notificationController.createNotification);

// Get all notifications for the user
router.get("/", notificationController.getAllNotifications);

router.get("/:notificationId", notificationController.getNotificationById);

// Edit notification (only by the person who posted it)
router.put("/:notificationId", notificationController.editNotification);

// Delete notification (only by the person who posted it)
router.delete("/:notificationId", notificationController.deleteNotification);

module.exports = router;

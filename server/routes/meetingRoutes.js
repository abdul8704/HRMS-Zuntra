const express = require("express");
const router = express.Router();
const meetingController = require('../controllers/meetingController')

router.get("/all-meeting", meetingController.getAllMeetingsData)

module.exports = router;
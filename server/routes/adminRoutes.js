const express = require("express");
const router = express.Router();
const adminController = require("../controllers/ceoController");

router.get("/user/:userid/credit-summary", adminController.getUserCreditSummary);
router.get("/user/:userid/attendance-summary", adminController.getUserAttendanceSummary);
router.get("/user/:userid/standard-pay", adminController.getStandardPay);
module.exports = router;
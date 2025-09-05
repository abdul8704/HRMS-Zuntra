const express = require("express");
const router = express.Router();
const adminController = require("../controllers/ceoController");
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

router.get("/user/:userid/credit-summary", requirePermission("projectManagement"), adminController.getUserCreditSummary);
router.get("/user/:userid/attendance-summary", requirePermission("projectManagement"), adminController.getUserAttendanceSummary);
router.get("/user/:userid/standard-pay", requirePermission("projectManagement"), adminController.getStandardPay);
router.get("/phase/:phaseId/tool-cost", requirePermission("projectManagement"), adminController.getPhaseToolCost);
router.get("/phase/:phaseId/employee-cost", requirePermission("projectManagement"), adminController.getPhaseEmployeeCost);
router.get("/project/:projectId/total-cost", requirePermission("projectManagement"), adminController.getProjectCost);

module.exports = router;
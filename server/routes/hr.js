const employeeController = require('../controllers/employeeController');
const hrController = require('../controllers/hrController');
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

const express = require('express');
const router = express.Router();

router.get("/", requirePermission("employeeManagement"), employeeController.fetchAllEmployees);
router.get("/pending", requirePermission("employeeManagement"), hrController.getPendingEmployees);
router.post("/accept", requirePermission("employeeManagement"), hrController.acceptUser);
router.get('/leave/pending-req', requirePermission("leaveManagement"), hrController.getPendingLeaveReqs)
router.post('/leave/process-req', requirePermission("leaveManagement"), hrController.processLeaveReq)
router.get('/leave/all-req', requirePermission("leaveManagement"), hrController.getAllLeaveReqs)
router.post('/leave/process-req', requirePermission("leaveManagement"), hrController.processLeaveReq)
router.patch('/leave/edit-req-action', requirePermission("leaveManagement"), employeeController.processLeaveRequest);

module.exports = router;

// TODO: isolate leave mgmt from employee mgmt

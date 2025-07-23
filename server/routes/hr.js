const employeeController = require('../controllers/employeeController');
const hrController = require('../controllers/hrController');
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

const express = require('express');
const router = express.Router();

router.get("/", requirePermission("employeeManagement"), employeeController.fetchAllEmployees);
router.get("/pending", requirePermission("employeeManagement"), hrController.getPendingEmployees);
router.post("/accept", requirePermission("employeeManagement"), hrController.acceptUser);
router.get('/leave/pending-req', requirePermission("employeeManagement"), hrController.getPendingLeaveReqs)
router.post('/leave/process-req', requirePermission("employeeManagement"), hrController.processLeaveReq)
router.get('/leave/all-req', requirePermission("employeeManagement"), hrController.getAllLeaveReqs)

module.exports = router;

// TODO: isolate leave mgmt from employee mgmt

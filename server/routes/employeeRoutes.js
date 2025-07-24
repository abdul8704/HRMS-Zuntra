const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");
const hrController = require("../controllers/hrController")

// public routes
router.post("/logout", requirePermission("general"), employeeController.handleLogout);
router.post("/leave/apply-leave", requirePermission("general"), employeeController.applyForLeave);
router.get("/emp-data/me", requirePermission("general"), employeeController.getMyData);
router.patch("/updateprofile", requirePermission("general"), employeeController.updateEmpDataController);

// either user himself or admin
router.get("/attendance", requireAdminOrMe("employeeManagement"), employeeController.getAttendanceData);
router.get("/:empId", requireAdminOrMe("employeeManagement"), employeeController.getDetailsOfaEmployee);

// private routes
router.get("/", requirePermission("employeeManagement"), employeeController.fetchAllEmployees);
router.get("/role/:role", requirePermission("employeeManagement"), employeeController.getEmployeeByRole);
router.get("/leave/requests", requirePermission("leaveManagement"), employeeController.getEmployeeRequests)
router.post('/leave/process-req', requirePermission("leaveManagement"), employeeController.processLeaveRequest);
router.patch('/leave/edit-req-action', requirePermission("leaveManagement"), employeeController.processLeaveRequest);



router.patch('/leave/update-req', employeeController.editLeaveRequest);
router.delete('/leave/delete-req', employeeController.deleteLeaveRequest) //TODO: need a rbac controller that check if only me

module.exports = router;

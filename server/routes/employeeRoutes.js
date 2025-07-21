const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

// public routes
router.post("/logout",employeeController.handleLogout);
router.post("/leave/apply-leave", employeeController.applyForLeave);
router.get("/emp-data/me", employeeController.getMyData);
router.patch("/updateprofile", employeeController.updateEmpDataController);

// either user himself or admin
router.get("/attendance", requireAdminOrMe("employeeManagement"), employeeController.getAttendanceData);
router.get("/:empId", requireAdminOrMe("employeeManagement"), employeeController.getDetailsOfaEmployee);

// private routes
router.get("/", employeeController.fetchAllEmployees);
router.get("/role/:role", employeeController.getEmployeeByRole);
router.get("/leave/requests", employeeController.getEmployeeRequests)

module.exports = router;

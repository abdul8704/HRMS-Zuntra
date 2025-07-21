const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController")

router.post("/logout", employeeController.handleLogout);
router.get("/attendance", employeeController.getAttendanceData);
router.get("/", employeeController.fetchAllEmployees);
router.get("/role/:role", employeeController.getEmployeeByRole);
router.get("/:empId", employeeController.getDetailsOfaEmployee);
router.post("/leave/apply-leave", employeeController.applyForLeave);
router.get("/leave/requests", employeeController.getEmployeeRequests)
router.get("/emp-data/me", employeeController.getMyData);
router.patch("/updateprofile", employeeController.updateEmpDataController);

module.exports = router;

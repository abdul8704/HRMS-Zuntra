const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController")

router.post("/logout", employeeController.handleLogout);
router.get("/attendance", employeeController.getAttendanceData);
router.get("/", employeeController.fetchAllEmployees);
router.get("/role/:role", employeeController.getEmployeeByRole);

module.exports = router;

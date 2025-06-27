const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeManagement")

router.post("/logout", employeeController.handleLogout);
router.get("/attendance", employeeController.getAttendanceData);
router.get("/", employeeController.fetchAllEmployees);

module.exports = router;

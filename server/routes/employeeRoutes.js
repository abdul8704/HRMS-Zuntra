const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeManagement")

router.post("/logout", employeeController.handleLogout);

module.exports = router;

const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController")
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");


router.get('/', requirePermission("employeeManagement"), shiftController.getAllShifts); 
router.post("/new-shift", requirePermission("employeeManagement"), shiftController.addShift);
router.put("/:shiftName", requirePermission("employeeManagement"), shiftController.editShift); 
router.delete("/:shiftName", requirePermission("employeeManagement"), shiftController.deleteShift); 

module.exports = router;
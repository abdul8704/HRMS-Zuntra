const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController")
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");


router.get('/', requirePermission("employeeManagement"), shiftController.getAllShifts); 
router.get("/one-shift/:shiftId", requirePermission("employeeManagement"), shiftController.getShiftById);   
router.post("/new-shift", requirePermission("employeeManagement"), shiftController.addShift);
router.put("/:shiftId", requirePermission("employeeManagement"), shiftController.editShift); 
router.delete("/delete-shift", requirePermission("employeeManagement"), shiftController.deleteShift); 

module.exports = router;
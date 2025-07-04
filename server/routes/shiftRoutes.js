const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController")

router.get('/', shiftController.getAllShifts); 
router.post("/new-shift", shiftController.addShift);
router.put("/:shiftName", shiftController.editShift); 
router.delete("/:shiftName", shiftController.deleteShift); 

module.exports = router;

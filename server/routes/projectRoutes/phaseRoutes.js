const express = require("express");
const router = express.Router();
const phaseController = require("../../controllers/projectControllers/phaseController");

router.post("/create", phaseController.createPhase);
router.patch("/update/:id", phaseController.updatePhase);
router.patch("/delete/:id", phaseController.deletePhase);

module.exports = router;

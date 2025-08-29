const express = require("express");
const router = express.Router();
const phaseController = require("../../controllers/projectControllers/phaseController");

// Create/Update/Delete
router.post("/create", phaseController.createPhase);
router.patch("/update/:phaseId", phaseController.updatePhase);
router.patch("/delete/:phaseId", phaseController.deletePhase);

// Reads
router.get("/all", phaseController.getAllPhases);
router.get("/:phaseId", phaseController.getPhaseById);
router.get("/project/:projectId", phaseController.getPhasesByProject);
router.get(
    "/project/:projectId/ongoing",
    phaseController.getOngoingPhasesByProject
);
router.get("/status/overview", phaseController.getNotStartedAndCompletedPhases);

// Team related endpoints (now handled by phases)
router.get("/phase-teams/:phaseId/teams", phaseController.getPhaseTeams);
router.get(
    "/phase-teams/:phaseId/teams/with-members",
    phaseController.getAllTeamsWithMembers
);
router.put("/add-teams/:phaseId", phaseController.addTeamsToPhase);

module.exports = router;

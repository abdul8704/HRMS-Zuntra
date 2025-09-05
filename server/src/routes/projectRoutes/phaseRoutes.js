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
router.get("/project-teams/:projectId", phaseController.getAllTeamsOfProject);
router.put("/add-teams/:phaseId", phaseController.addTeamsToPhase);
router.post("/is-team-leader", phaseController.isTeamLeaderInPhase);

// tools related routes

router.put("/add-tools/:phaseId", phaseController.addToolsToPhase);
router.delete("/remove-tools/:phaseId", phaseController.removeToolsFromPhase);
router.get("/tools/:phaseId", phaseController.getToolsByPhase);
router.get("/tools/overview/:projectId", phaseController.getNotStartedAndCompletedTools);
router.get("/project/:projectId/tools", phaseController.getAllToolsByProject);

module.exports = router;

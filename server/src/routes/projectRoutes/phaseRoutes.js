const express = require("express");
const router = express.Router();
const phaseController = require("../../controllers/projectControllers/phaseController");
const { requirePermission } = require("../../middlewares/requirePermission");

// Create/Update/Delete
router.post("/create", requirePermission("projectManagement"), phaseController.createPhase);
router.patch("/update/:phaseId", requirePermission("projectManagement"), phaseController.updatePhase);
router.patch("/delete/:phaseId", requirePermission("projectManagement"), phaseController.deletePhase);

// Reads
router.get("/all", requirePermission("projectManagement"), phaseController.getAllPhases);
router.get("/:phaseId", requirePermission("general"), phaseController.getPhaseById);
router.get("/project/:projectId", requirePermission("general"), phaseController.getPhasesByProject);
router.get(
    "/project/:projectId/ongoing",
    requirePermission("general"),
    phaseController.getOngoingPhasesByProject
);
router.get("/status/overview", requirePermission("general"), phaseController.getNotStartedAndCompletedPhases);

// Team related endpoints (now handled by phases)
router.get("/phase-teams/:phaseId/teams", requirePermission("general"), phaseController.getPhaseTeams);
router.get(
    "/phase-teams/:phaseId/teams/with-members",
    requirePermission("general"),
    phaseController.getAllTeamsWithMembers
);
router.get("/project-teams/:projectId", requirePermission("general"), phaseController.getAllTeamsOfProject);
router.put("/add-teams/:phaseId", requirePermission("general"), phaseController.addTeamsToPhase);
router.post("/is-team-leader", requirePermission("general"), phaseController.isTeamLeaderInPhase);

// tools related routes

router.put("/add-tools/:phaseId", requirePermission("projectManagement"),phaseController.addToolsToPhase);
router.delete("/remove-tools/:phaseId", requirePermission("projectManagement"), phaseController.removeToolsFromPhase);
router.get("/tools/:phaseId", requirePermission("general"),phaseController.getToolsByPhase);
router.get("/tools/overview/:projectId", requirePermission("general"), phaseController.getNotStartedAndCompletedTools);
router.get("/project/:projectId/tools", requirePermission("general"), phaseController.getAllToolsByProject);

module.exports = router;

const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/projectControllers/projectController");
const { requirePermission } = require("../../middlewares/requirePermission");

// Project CRUD operations
router.get("/all", requirePermission("projectManagement"), projectController.getAllProjects);
router.get("/all/ongoing", requirePermission("projectManagement"), projectController.getAllOngoingProjects);
router.get("/all/not-started", requirePermission("projectManagement"), projectController.getAllNotStartedProjects);
router.get("/all/on-hold", requirePermission("projectManagement"), projectController.getAllOnHoldProjects);
router.get("/all/completed", requirePermission("projectManagement"), projectController.getAllCompletedProjects);
router.get("/all/cancelled", requirePermission("projectManagement"), projectController.getAllCancelledProjects);

router.get("/my/:userId/all", requirePermission("general"), projectController.getAllProjectsOfUser);
router.get("/my/:userId/ongoing", requirePermission("general"), projectController.getOngoingProjectsByUser);
router.get("/my/:userId/not-started", requirePermission("general"), projectController.getNotStartedProjectsByUser);
router.get("/my/:userId/on-hold", requirePermission("general"), projectController.getOnHoldProjectsByUser);
router.get("/my/:userId/completed", requirePermission("general"), projectController.getCompletedProjectsByUser);
router.get("/my/:userId/cancelled", requirePermission("general"), projectController.getCancelledProjectsByUser);

router.get("/one/:projectId", requirePermission("general"), projectController.getProjectById);
router.post("/create", requirePermission("projectManagement"), projectController.createProject);
router.patch("/update/:projectId", requirePermission("projectManagement"), projectController.updateProject);
router.delete("/delete/:projectId", requirePermission("projectManagement"), projectController.deleteProject);

router.get("/deadlines", requirePermission("general"), projectController.getUserProjectPhaseDeadlines);

module.exports = router;

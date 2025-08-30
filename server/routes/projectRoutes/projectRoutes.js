const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/projectControllers/projectController");

// Project CRUD operations
router.get("/all", projectController.getAllProjects);
router.get("/all/ongoing", projectController.getAllOngoingProjects);
router.get("/all/not-started", projectController.getAllNotStartedProjects);
router.get("/all/on-hold", projectController.getAllOnHoldProjects);
router.get("/all/completed", projectController.getAllCompletedProjects);
router.get("/all/cancelled", projectController.getAllCancelledProjects);

router.get("/my/:userId/all", projectController.getAllProjectsOfUser);
router.get("/my/:userId/ongoing", projectController.getOngoingProjectsByUser);
router.get("/my/:userId/not-started", projectController.getNotStartedProjectsByUser);
router.get("/my/:userId/on-hold", projectController.getOnHoldProjectsByUser);
router.get("/my/:userId/completed", projectController.getCompletedProjectsByUser);
router.get("/my/:userId/cancelled", projectController.getCancelledProjectsByUser);

router.get("/one/:projectId", projectController.getProjectById);
router.post("/create", projectController.createProject);
router.patch("/update/:projectId", projectController.updateProject);
router.delete("/delete/:projectId", projectController.deleteProject);

module.exports = router;

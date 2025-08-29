const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/projectControllers/projectController");

// Project CRUD operations
router.get("/all", projectController.getAllProjects);
router.get("/ongoing", projectController.getAllOngoingProjects);
router.get("/not-started", projectController.getAllNotStartedProjects);
router.get("/on-hold", projectController.getAllOnHoldProjects);
router.get("/completed", projectController.getAllCompletedProjects);
router.get("/cancelled", projectController.getAllCancelledProjects);

router.get("/one/:projectId", projectController.getProjectById);
router.post("/create", projectController.createProject);
router.patch("/update/:projectId", projectController.updateProject);
router.delete("/delete/:projectId", projectController.deleteProject);

module.exports = router;

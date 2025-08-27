const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/projectControllers/projectController");


router.get("/all/ongoing", projectController.getAllOnGoingProjects);
router.get("/all/finished", projectController.getAllFinishedProjects);
router.get("/all/date/:date", projectController.getAllProjectsOnDate);
router.get("/:projectId", projectController.getAProject);
router.post("/create", projectController.createNewProject);

module.exports = router;

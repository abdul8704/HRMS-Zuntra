const express = require("express");
const router = express.Router();
const TeamController = require("../../controllers/projectControllers/teamController");

router.get("/all-team", TeamController.getAllTeamsController);
router.get("/details/:teamId", TeamController.getMembersOfTeamController);
router.post("/create", TeamController.createTeamController);
router.put("/add-members", TeamController.addMembersToTeamController);

module.exports = router;

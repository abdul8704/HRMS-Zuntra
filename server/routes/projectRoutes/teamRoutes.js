const express = require("express");
const router = express.Router();
const TeamController = require("../../controllers/projectControllers/teamController");

router.get("/all-team", TeamController.getAllTeamsController);
router.get("/details/:teamId", TeamController.getMembersOfTeamController);
router.post("/create", TeamController.createTeamController);
router.put("/add-members", TeamController.addMembersToTeamController);
router.post("/check-tl", TeamController.checkUserTL);
router.post("/check-tl-proj", TeamController.checkUserTLOfProj);
router.get("/user-teams/:userId", TeamController.getTeamsUserIn);
router.put("/update-team/:teamId", TeamController.updateTeam);
router.delete("/delete-this-team/:teamId", TeamController.deleteTeam);
router.delete("/delete-team-member/:teamId/:userId", TeamController.deleteTeamMember);

module.exports = router;

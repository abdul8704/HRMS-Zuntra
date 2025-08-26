const asyncHandler = require("express-async-handler");
const ApiError = require("../../errors/ApiError");
const teamService = require("../../services/projectService/teamService");

const createTeamController = asyncHandler(async (req, res) => {
    const { teamLeadId, teamName, teamDescription, teamMembers } = req.body;

    if (
        !teamLeadId ||
        !teamName ||
        !teamMembers ||
        !Array.isArray(teamMembers) ||
        teamMembers.length === 0
    ) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    await teamService.createNewTeamService({
        teamLeadId,
        teamName,
        teamDescription,
        teamMembers,
    });

    return res.status(201).json({
        status: "success",
        message: "Team created successfully",
    });
});

const getAllTeamsController = asyncHandler(async (req, res) => {
    const teams = await teamService.getAllTeamsService();

    return res.status(200).json({
        status: "success",
        data: teams,
    });
});

const getMembersOfTeamController = asyncHandler(async (req, res) => {
    const { teamId } = req.params;

    if (!teamId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const team = await teamService.getMembersOfTeamService(teamId);

    return res.status(200).json({
        status: "success",
        team,
    });
});

const addMembersToTeamController = asyncHandler(async (req, res) => {
    const { teamId, users } = req.body;

    if (!teamId || !users || !Array.isArray(users) || users.length === 0) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    await teamService.addMembersToTeamService(teamId, users);

    return res.status(200).json({
        status: "success",
        message: "Members added successfully",
    });
});

module.exports = {
    getAllTeamsController,
    getMembersOfTeamController,
    createTeamController,
    addMembersToTeamController,
};

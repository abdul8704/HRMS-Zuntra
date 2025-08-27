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

const checkUserTL = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const isTL = await teamService.isUserThisTL(userId);

    if(!isTL)
        return res.status(200).json({
            success: false,
            message: "User is not the TL of any team",
        });

    return res.status(200).json({
        success: true,
        isTL,
    });
});

const checkUserTLOfProj = asyncHandler(async (req, res) => {
    const { userId, teamId } = req.body;

    if(!userId || !teamId)
        throw new ApiError(400, "Please provide all the required fields");

    const isTL = await teamService.userTLofProj(userId, teamId);

    if(isTL.length === 0)
        return res.status(200).json({
            success: false,
            message: "User is not the TL of the project",
        });
    
    return res.status(200).json({
        success: true,
        isTL,
    });
})

const getTeamsUserIn = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if(!userId)
        throw new ApiError(400, "Please provide all the required fields");

    const teams = await teamService.getTeamsUserPartOf(userId);

    return res.status(200).json({
        success: true,
        memberOf: teams.teams,
        leaderOf: teams.teamLeads
    });
});

const updateTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const data = req.body;

    if(!data.teamName && !data.teamDescription && !data.teamMembers)
        throw new ApiError(400, "Please provide some data to update team");

    const updatedTeam = await teamService.updateTeamService(teamId, data);

    return res.status(203).json({ success: true, team: updatedTeam })
})

const deleteTeamMember = asyncHandler(async (req, res) => {
    const { teamId, userId } = req.params;

    if(!teamId || !userId)
        throw new ApiError(400, "Please provide all the required fields");

    const updatedTeam = await teamService.deleteTeamMemberService(teamId, userId);

    return res.status(203).json({ success: true, team: updatedTeam })
})

const deleteTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    console.log("hi ", teamId)
    if(!teamId)
        throw new ApiError(400, "Please provide all the required fields");

    const updatedTeam = await teamService.deleteTeam(teamId);

    return res.status(203).json({ success: true, team: updatedTeam })
})

module.exports = {
    getAllTeamsController,
    getMembersOfTeamController,
    createTeamController,
    addMembersToTeamController,
    checkUserTL,
    checkUserTLOfProj,
    getTeamsUserIn,
    updateTeam,
    deleteTeamMember,
    deleteTeam,
};

const asyncHandler = require('express-async-handler');
const projectService = require("../services/projectService")
const userService = require("../services/user")

// @desc Get all ongoing projects
// @route GET /api/project/ongoing
const getAllOnGoingProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllOnGoingProjects();
    if (projectsList.length === 0) {
        res.status(404);
        throw new Error("No Projects Currently OnGoing")
    }
    const formattedResult = await Promise.all(
        projectsList.map(async (project) => {
            const teamLeaderDetail = await userService.getDetailsOfaUser(project.teamLeader);
            return {
                id: project._id.toString(),
                clientName: project.clientName,
                projectTitle: project.projectTitle,
                projectDesc: project.projectDesc,
                teamLeader: teamLeaderDetail.username,
                teamLeaderRole: teamLeaderDetail.role,
                teamLeaderProfile: teamLeaderDetail.profilePicture,
                deadline: project.deadLine,
                teamName: project.teamName,
            };
        })
    );
    return res.status(200).json({
        success: true,
        data: formattedResult,
    });
});

// @desc Get all finished projects
// @route GET /api/project/finished
const getAllFinishedProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllFinishedProjects();
    if (projectsList.length === 0) {
        res.status(404);
        throw new Error("No Finished Projects Available")
    }
    const formattedResult = await Promise.all(
        projectsList.map(async (project) => {
            const teamLeaderDetail = await userService.getDetailsOfaUser(project.teamLeader);
            return {
                id: project._id.toString(),
                clientName: project.clientName,
                projectTitle: project.projectTitle,
                projectDesc: project.projectDesc,
                teamLeader: teamLeaderDetail.username,
                teamLeaderRole: teamLeaderDetail.role,
                teamLeaderProfile: teamLeaderDetail.profilePicture,
                deadline: project.deadLine,
                teamName: project.teamName,
            };
        })
    );
    return res.status(200).json({
        success: true,
        data: formattedResult,
    });
});


module.exports = { getAllOnGoingProjects, getAllFinishedProjects };
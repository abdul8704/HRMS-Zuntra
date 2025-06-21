const asyncHandler = require('express-async-handler');
const projectService = require("../services/projectService")
const userService = require("../services/user")
const ApiError = require("../errors/ApiError");

// @desc Get all ongoing projects
// @route GET /api/project/ongoing
const getAllOnGoingProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllOnGoingProjects();
    if (projectsList.length === 0) 
        throw new ApiError(404, "No Ongoing Projects Available")

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
    
    if (projectsList.length === 0) 
        throw new ApiError(404, "No Finished Projects Available");
    
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

// @desc Create new course
// @route post /api/project/create
const createNewProject = asyncHandler( async(req,res) => {
    const projectDetails = await projectService.createNewProject(req.body);
    return res.status(201).json({
        success: true,
        message: "Project Created Successfully!!",
    })
})

// @desc Delete a course
// @route delete /api/project/delete/:courseId

module.exports = { getAllOnGoingProjects, getAllFinishedProjects, createNewProject };
const asyncHandler = require('express-async-handler');
const projectService = require("../services/projectService");
const userService = require("../services/user");
const ApiError = require("../errors/ApiError");
const dateUtils = require("../utils/dateUtils");
// @desc Get all ongoing projects
// @route GET /api/project/ongoing
const getAllOnGoingProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllOnGoingProjects();

    if (projectsList.length === 0) {
        throw new ApiError(404, "No Ongoing Projects Available");
    }

    const formattedResult = await Promise.all(
        projectsList.map(async (project) => {
            const teamLeaderDetail = await userService.getDetailsOfaUser(project.teamLeader);

            const diffArray = dateUtils.dateDiff(project.endDate);
            const totalDaysLeft = diffArray[3].replace("Total days: ", "");
            return {
                id: project._id.toString(),
                clientName: project.clientName,
                projectTitle: project.projectTitle,
                projectDesc: project.projectDesc,
                teamLeader: teamLeaderDetail.username,
                teamLeaderRole: teamLeaderDetail.role,
                teamLeaderProfile: teamLeaderDetail.profilePicture,
                teamName: project.teamName,
                startDate: dateUtils.formatDateToDDMMYYYY(project.startDate),
                deadline: totalDaysLeft,
            };
        })
    );

    res.status(200).json({
        success: true,
        data: formattedResult,
    });
});


// @desc Get all finished projects
// @route GET /api/project/finished
const getAllFinishedProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllFinishedProjects();
    
    if (projectsList.length === 0) {
        throw new ApiError(404, "No Finished Projects Available");
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
                teamName: project.teamName,
                startDate: dateUtils.formatDateToDDMMYYYY(project.startDate),
                endDate: dateUtils.formatDateToDDMMYYYY(project.endDate),
            };
        })
    );

    return res.status(200).json({
        success: true,
        data: formattedResult,
    });
});


// @desc Get a project details
// @route GET /api/project/:projectId
const getAProject = asyncHandler(async (req, res) => {
  const projectDetails = await projectService.getAProject(req.params.projectId);

  const teamLeaderDetail = await userService.getDetailsOfaUser(projectDetails.teamLeader);

  const teamMembersDetails = await Promise.all(
    projectDetails.teamMembers.map((memberId) =>
      userService.getDetailsOfaUser(memberId)
    )
  );

  const formattedProject = {
    id: projectDetails._id.toString(),
    clientName: projectDetails.clientName,
    projectTitle: projectDetails.projectTitle,
    projectDesc: projectDetails.projectDesc,
    teamName: projectDetails.teamName,
    status: projectDetails.status,
    startDate: dateUtils.formatDateToDDMMYYYY(projectDetails.startDate),
    endDate: dateUtils.formatDateToDDMMYYYY(projectDetails.endDate),
    teamLeader: {
      id: teamLeaderDetail._id.toString(),
      username: teamLeaderDetail.username,
      role: teamLeaderDetail.role,
      profilePicture: teamLeaderDetail.profilePicture,
    },
    teamMembers: teamMembersDetails.map((member) => ({
      id: member._id.toString(),
      username: member.username,
      role: member.role,
      profilePicture: member.profilePicture,
    })),
  };

  return res.status(200).json({
    success: true,
    data: formattedProject,
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


module.exports = { getAllOnGoingProjects, getAllFinishedProjects, createNewProject, getAProject, };
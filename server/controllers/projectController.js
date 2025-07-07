const asyncHandler = require('express-async-handler');
const projectService = require("../services/projectService");
const EmployeeService = require("../services/employeeService");
const ApiError = require("../errors/ApiError");
const dateUtils = require("../utils/dateUtils");
const roleService = require("../services/rolesService")


// @desc Get all ongoing projects
// @route GET /api/project/ongoing
const getAllOnGoingProjects = asyncHandler(async (req, res) => {
    const projectsList = await projectService.getAllOnGoingProjects();
    console.log(projectsList);

    if (projectsList.length === 0) {
        throw new ApiError(404, "No Ongoing Projects Available");
    }

    const formattedResult = await Promise.all(
        projectsList.map(async (project) => {
            const teamLeaderDetail = await EmployeeService.getDetailsOfaEmployee(project.teamLeader);
            console.log(teamLeaderDetail);
            const roleDetail = teamLeaderDetail.role;
            const roleColor = roleDetail?.color || "#000000";

            const diffArray = dateUtils.dateDiff(project.endDate);
            const totalDaysLeft = diffArray[3].replace("Total days: ", "");

            return {
                _id: project._id,
                clientName: project.clientName,
                projectTitle: project.projectTitle,
                projectDesc: project.projectDesc,
                teamLeader: teamLeaderDetail.username,
                teamLeaderRole: teamLeaderDetail.role,
                teamLeaderProfile: teamLeaderDetail.profilePicture,
                color: roleColor,
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
            const teamLeaderDetail = await EmployeeService.getDetailsOfaEmployee(project.teamLeader);
            const roleDetail = await roleService.getRoleDetailsByName(teamLeaderDetail.role);
            const roleColor = roleDetail?.color || "#000000";

            return {
                id: project._id,
                clientName: project.clientName,
                projectTitle: project.projectTitle,
                projectDesc: project.projectDesc,
                teamLeader: teamLeaderDetail.username,
                teamLeaderRole: teamLeaderDetail.role,
                teamLeaderProfile: teamLeaderDetail.profilePicture,
                color: roleColor,
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

// @desc Get all projects based on date
// @route GET /api/project/all/date/:date 30072025
const getAllProjectsOnDate = asyncHandler(async (req, res) => {
    const input = req.params.date; 
    const day = input.substring(0, 2);
    const month = input.substring(2, 4);
    const year = input.substring(4, 8);

    const startOfDay = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const endOfDay = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

    const projectsList = await projectService.getAllProjectsOnDate(startOfDay, endOfDay);
    if (!projectsList.length) {
        throw new ApiError(404, "No Projects Available");
    }

    const formattedResult = projectsList.map((project) => ({
        id: project._id,
        projectTitle: project.projectTitle,
        teamName: project.teamName,
    }));

    res.status(200).json({
        success: true,
        data: formattedResult,
    });
});


// @desc Get a project details
// @route GET /api/project/:projectId
const getAProject = asyncHandler(async (req, res) => {
  const projectDetails = await projectService.getAProject(req.params.projectId);

  const teamLeaderDetail = await EmployeeService.getDetailsOfaEmployee(
      projectDetails.teamLeader
  );
  const roleDetail = await roleService.getRoleDetailsByName(teamLeaderDetail.role);
  const roleColor = roleDetail?.color || "#000000";

  const teamMembersDetails = await Promise.all(
    projectDetails.teamMembers.map((memberId) =>
      EmployeeService.getDetailsOfaEmployee(memberId)
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
      color: roleColor
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


module.exports = { getAllOnGoingProjects, getAllFinishedProjects, createNewProject, getAProject, getAllProjectsOnDate, };
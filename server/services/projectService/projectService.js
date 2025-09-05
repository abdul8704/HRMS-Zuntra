const Project = require("../../models/projectManagement/project");
const Phase = require("../../models/projectManagement/phase");
const ApiError = require("../../errors/ApiError");
const TeamService = require("./teamService");
const PhaseService = require("./phaseService");
const project = require("../../models/projectManagement/project");

// Get all projects
const getAllProjects = async () => {
    return Project.find({}).lean(); 
};

// Get all ongoing projects
const getAllOngoingProjects = async () => {
    return Project.find({ status: "ongoing" }).lean();
};

// Get all not started projects
const getAllNotStartedProjects = async () => {
    return Project.find({ status: "not_started" }).lean();
};

// Get all on hold projects
const getAllOnHoldProjects = async () => {
    return Project.find({ status: "on_hold" }).lean();
};

// Get all completed projects
const getAllCompletedProjects = async () => {
    return Project.find({ status: "completed" }).lean();
};

// Get all cancelled projects
const getAllCancelledProjects = async () => {
    return Project.find({ status: "cancelled" }).lean();
};

// Get project by ID
const getProjectById = async (projectId) => {
    return Project.findById(projectId).lean();
};

const getAllProjectsOfUserService = async (userId) => {
    const teams = await TeamService.getTeamIdsUserPartOf(userId);
    const projectIds = await PhaseService.getProjectIdOfTeams(teams);

    if (projectIds.length === 0) return [];

    const projects = await Promise.all(
        projectIds.map((projectId) => Project.findById(projectId).lean())
    );

    return projects;
};

const getOngoingProjectsByUserService = async (userId) => {
    const projects = await getAllProjectsOfUserService(userId);

    const res = projects.filter((proj) => proj && proj.status === "ongoing");

    return res;
};

const getNotStartedProjectsByUserService = async (userId) => {
    const projects = await getAllProjectsOfUserService(userId);

    const res = projects.filter(
        (proj) => proj && proj.status === "not_started"
    );

    return res;
};

const getOnHoldProjectsByUserService = async (userId) => {
    const projects = await getAllProjectsOfUserService(userId);

    const res = projects.filter((proj) => proj && proj.status === "on_hold");

    return res;
};

const getCompletedProjectsByUserService = async (userId) => {
    const projects = await getAllProjectsOfUserService(userId);

    const res = projects.filter((proj) => proj && proj.status === "completed");

    return res;
};

const getCancelledProjectsByUserService = async (userId) => {
    const projects = await getAllProjectsOfUserService(userId);

    const res = projects.filter((proj) => proj && proj.status === "cancelled");

    return res;
};

// Create new project
const createProject = async (projectData) => {
    const project = new Project(projectData);
    return project.save();
};

// Update project
const updateProjectById = async (projectId, updateData) => {
    return Project.findByIdAndUpdate(projectId, updateData, { new: true });
};

// Delete project and associated phases
const deleteProjectById = async (projectId) => {
    await Phase.deleteMany({ project: projectId });
    return Project.findByIdAndDelete(projectId);
};

const getUserProjectPhaseDeadlines = async (userId, allProjects = false) => {
    let phases;

    if (allProjects) {
        phases = await Phase.find({
            status: "ongoing",
            endDate: { $exists: true, $ne: null },
        })
            .populate("project", "name")
            .lean();
    } else {
        const userTeamIds = await TeamService.getTeamIdsUserPartOf(userId);

        phases = await Phase.find({
            teams: { $in: userTeamIds },
            endDate: { $exists: true, $ne: null },
        })
            .populate("project", "name")
            .lean();
    }

    const today = new Date();
    const projectPhaseDeadlines = [];

    phases.forEach((phase) => {
        if (phase.endDate) {
            const deadline = new Date(phase.endDate);
            const daysLeft = Math.ceil(
                (deadline - today) / (1000 * 60 * 60 * 24)
            );

            projectPhaseDeadlines.push({
                project: phase.project.name,
                phase: phase.name,
                deadline: deadline.toISOString().split("T")[0], // YYYY-MM-DD
                daysLeft: daysLeft,
                status: phase.status,
            });
        }
    });

    // Sort by closest deadlines first
    projectPhaseDeadlines.sort((a, b) => a.daysLeft - b.daysLeft);

    return projectPhaseDeadlines;
};


module.exports = {
    getAllProjects,
    getAllOngoingProjects,
    getAllNotStartedProjects,
    getAllOnHoldProjects,
    getAllCompletedProjects,
    getAllCancelledProjects,
    getProjectById,
    getAllProjectsOfUserService,
    getOngoingProjectsByUserService,
    getNotStartedProjectsByUserService,
    getOnHoldProjectsByUserService,
    getCompletedProjectsByUserService,
    getCancelledProjectsByUserService,
    createProject,
    updateProjectById,
    deleteProjectById,
    getUserProjectPhaseDeadlines,
};

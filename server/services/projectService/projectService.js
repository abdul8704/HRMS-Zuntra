const Project = require("../../models/projectManagement/project");
const Phase = require("../../models/projectManagement/phase");
const ApiError = require("../../errors/ApiError");

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

module.exports = {
    getAllProjects,
    getAllOngoingProjects,
    getAllNotStartedProjects,
    getAllOnHoldProjects,
    getAllCompletedProjects,
    getAllCancelledProjects,
    getProjectById,
    createProject,
    updateProjectById,
    deleteProjectById,
};

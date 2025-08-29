const asyncHandler = require("express-async-handler");
const ApiError = require("../../errors/ApiError");
const projectService = require("../../services/projectService/projectService");
const dateUtils = require("../../utils/dateUtils");

// Helper function to calculate deadline
const calculateDeadline = (endDate) => {
    if (!endDate) return null;
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs > 0) {
        return `${diffDays} days left`;
    } else {
        return `Overdue by ${Math.abs(diffDays)} days`;
    }
};

// Helper function to format project response
const formatProjectResponse = (project) => {
    return {
        ...project,
        deadline: calculateDeadline(project.endDate),
    };
};

// Get all projects
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
            deadline: calculateDeadline(projects.endDate),
        });
});

// Get all ongoing projects
const getAllOngoingProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllOngoingProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
        });
});

// Get all not started projects
const getAllNotStartedProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllNotStartedProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
        });
});

// Get all on hold projects
const getAllOnHoldProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllOnHoldProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
        });
});

// Get all completed projects
const getAllCompletedProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllCompletedProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
        });
});

// Get all cancelled projects
const getAllCancelledProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllCancelledProjects();
    const formattedProjects = projects.map(formatProjectResponse);
    return res
        .status(200)
        .json({
            success: true,
            data: formattedProjects,
        });
});

// Get project by ID
const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const project = await projectService.getProjectById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const formattedProject = formatProjectResponse(project);
    return res.status(200).json({ success: true, data: formattedProject });
});

// Create new project
const createProject = asyncHandler(async (req, res) => {
    const {
        name,
        client,
        description,
        startDate,
        endDate,
        estimatedBudget,
        teams,
        createdBy,
        status,
    } = req.body;

    if (!name || !client || !description || !startDate || !endDate) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    if (!client.name || !client.contactName || !client.contactEmail) {
        throw new ApiError(400, "Please provide all client details");
    }

    const projectData = {
        name,
        client,
        description,
        startDate,
        endDate,
        estimatedBudget,
        teams: teams || [],
        createdBy,
        status: status || "not_started",
    };

    const created = await projectService.createProject(projectData);

    return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: created,
        deadline: calculateDeadline(created.endDate),
    });
});

// Update project
const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const updateData = req.body;

    if (!projectId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ApiError(400, "Please provide some data to update");
    }

    const updated = await projectService.updateProjectById(
        projectId,
        updateData
    );
    if (!updated) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updated,
        deadline: calculateDeadline(updated.endDate),
    });
});

// Delete project
const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const deleted = await projectService.deleteProjectById(projectId);
    if (!deleted) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: { id: deleted._id, name: deleted.name },
    });
});

module.exports = {
    getAllProjects,
    getAllOngoingProjects,
    getAllNotStartedProjects,
    getAllOnHoldProjects,
    getAllCompletedProjects,
    getAllCancelledProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};

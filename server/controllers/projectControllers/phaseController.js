const asyncHandler = require("express-async-handler");
const ApiError = require("../../errors/ApiError");
const phaseService = require("../../services/projectService/phaseService");

const getAllPhases = asyncHandler(async (req, res) => {
    const phases = await phaseService.getAllPhases();
    return res.status(200).json({ success: true, data: phases });
});

const getPhaseById = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;

    if (!phaseId)
        throw new ApiError(400, "Please provide all the required fields");

    const phase = await phaseService.getPhaseById(phaseId);

    if (!phase) throw new ApiError(404, "Phase not found");

    return res.status(200).json({ success: true, data: phase });
});

const getPhasesByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId)
        throw new ApiError(400, "Please provide all the required fields");

    const phases = await phaseService.getPhasesByProject(projectId);

    return res.status(200).json({ success: true, data: phases });
});

const getOngoingPhasesByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId)
        throw new ApiError(400, "Please provide all the required fields");

    const phases = await phaseService.getOngoingPhasesByProject(projectId);

    return res.status(200).json({ success: true, data: phases });
});

const getNotStartedAndCompletedPhases = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId)
        throw new ApiError(400, "Please provide all the required fields");

    const data = await phaseService.getNotStartedAndCompletedPhases(projectId);

    return res.status(200).json({ success: true, data });
});

const getAllTeamsOfProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId)
        throw new ApiError(400, "Please provide all the required fields");

    const teams = await phaseService.getAllTeamsOfProjectService(projectId);

    return res.status(200).json({ success: true, teams });
});
// Controller for creating a phase
const createPhase = asyncHandler(async (req, res) => {
    const phaseData = req.body;

    if (
        !phaseData.project ||
        !phaseData.name ||
        !phaseData.description ||
        !phaseData.startDate
    )
        throw new ApiError(400, "Please provide all the required fields");

    if (!phaseData.status) phaseData.status = "not_started";
    if (!phaseData.teams) phaseData.teams = [];
    if (!phaseData.tools) phaseData.tools = [];
    if (!phaseData.notes) phaseData.notes = "";

    const newPhase = await phaseService.createPhase(phaseData);

    if (!newPhase) {
        throw new ApiError(400, "Phase creation failed");
    }

    const formattedResult = {
        id: newPhase._id,
        project: newPhase.project,
        name: newPhase.name,
        description: newPhase.description,
        startDate: newPhase.startDate,
        endDate: newPhase.endDate,
        status: newPhase.status,
        teams: newPhase.teams,
        tools: newPhase.tools,
        notes: newPhase.notes,
    };

    res.status(201).json({
        success: true,
        message: "Phase created successfully",
        data: formattedResult,
    });
});

// Controller for updating a phase
const updatePhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;
    const updateData = req.body;

    const updatedPhase = await phaseService.updatePhaseById(
        phaseId,
        updateData
    );

    if (!updatedPhase) {
        throw new ApiError(404, "Phase not found or update failed");
    }

    const formattedResult = {
        id: updatedPhase._id,
        name: updatedPhase.name,
        description: updatedPhase.description,
        startDate: updatedPhase.startDate,
        endDate: updatedPhase.endDate,
        status: updatedPhase.status,
        teams: updatedPhase.teams,
        tools: updatedPhase.tools,
        notes: updatedPhase.notes,
    };

    res.status(200).json({
        success: true,
        message: "Phase updated successfully",
        data: formattedResult,
    });
});

// Controller to delete a phase
const deletePhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;

    const deletedPhase = await phaseService.deletePhaseById(phaseId);

    if (!deletedPhase) {
        throw new ApiError(404, "Phase not found or already deleted");
    }

    res.status(200).json({
        success: true,
        message: "Phase deleted successfully",
        data: {
            id: deletedPhase._id,
            name: deletedPhase.name,
            project: deletedPhase.project,
        },
    });
});

// Get all teams of a project (from phases)
const getPhaseTeams = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;

    if (!phaseId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const teams = await phaseService.getPhaseTeams(phaseId);
    return res.status(200).json({ success: true, data: teams });
});

// Get all teams with members for a project
const getAllTeamsWithMembers = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;

    if (!phaseId) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const teams = await phaseService.getAllTeamsWithMembers(phaseId);
    return res.status(200).json({ success: true, data: teams });
});

const addTeamsToPhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;
    const { teamIds } = req.body;

    if (
        !phaseId ||
        !teamIds ||
        !Array.isArray(teamIds) ||
        teamIds.length === 0
    ) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    await phaseService.addTeamsToPhaseById(phaseId, teamIds);

    return res
        .status(200)
        .json({ success: true, message: "Teams added successfully" });
});

// Tool management controllers
const addToolsToPhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;
    const { toolIds } = req.body;

    if (
        !phaseId ||
        !toolIds ||
        !Array.isArray(toolIds) ||
        toolIds.length === 0
    ) {
        throw new ApiError(400, "Please provide phase ID and tool IDs array");
    }

    const updatedPhase = await phaseService.addToolsToPhase(phaseId, toolIds);

    return res.status(200).json({
        success: true,
        message: "Tools added to phase successfully",
        data: updatedPhase,
    });
});

const removeToolsFromPhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;
    const { toolIds } = req.body;

    if (
        !phaseId ||
        !toolIds ||
        !Array.isArray(toolIds) ||
        toolIds.length === 0
    ) {
        throw new ApiError(400, "Please provide phase ID and tool IDs array");
    }

    const updatedPhase = await phaseService.removeToolsFromPhase(
        phaseId,
        toolIds
    );

    return res.status(200).json({
        success: true,
        message: "Tools removed from phase successfully",
        data: updatedPhase,
    });
});

const getToolsByPhase = asyncHandler(async (req, res) => {
    const { phaseId } = req.params;

    if (!phaseId) {
        throw new ApiError(400, "Please provide phase ID");
    }

    const tools = await phaseService.getToolsByPhase(phaseId);

    return res.status(200).json({
        success: true,
        data: tools,
    });
});

const getNotStartedAndCompletedTools = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Please provide project ID");
    }

    const toolsOverview = await phaseService.getNotStartedAndCompletedTools(
        projectId
    );

    return res.status(200).json({
        success: true,
        data: toolsOverview,
    });
});

const getAllToolsByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Please provide project ID");
    }

    const projectTools = await phaseService.getAllToolsByProject(projectId);

    return res.status(200).json({
        success: true,
        data: projectTools,
    });
});

module.exports = {
    getAllPhases,
    getPhaseById,
    getPhasesByProject,
    getOngoingPhasesByProject,
    getNotStartedAndCompletedPhases,
    createPhase,
    updatePhase,
    deletePhase,
    getPhaseTeams,
    getAllTeamsWithMembers,
    addTeamsToPhase,
    getAllTeamsOfProject,
    addToolsToPhase,
    removeToolsFromPhase,
    getToolsByPhase,
    getNotStartedAndCompletedTools,
    getAllToolsByProject,
};

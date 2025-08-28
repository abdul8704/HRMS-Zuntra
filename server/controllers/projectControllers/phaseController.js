const asyncHandler = require("express-async-handler")
const ApiError = require("../../errors/ApiError");
const phaseService = require("../../services/projectService/phaseService");


// Controller for creating a phase
const createPhase = asyncHandler(async (req, res) => {
    const phaseData = req.body;

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

    const updatedPhase = await phaseService.updatePhaseById(phaseId, updateData);

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

module.exports = { createPhase, updatePhase, deletePhase };

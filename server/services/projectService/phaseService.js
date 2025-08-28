const Phase = require("../../models/projectManagement/phase");
const ApiError = require("../../errors/ApiError");

// Create a new phase
const createPhase = async (phaseData) => {
    const newPhase = await Phase.create(phaseData);

    if (!newPhase) {
        throw new ApiError(400, "Failed to create Phase");
    }

    return newPhase;
};


// Service to update a phase by ID
const updatePhaseById = async (phaseId, updateData) => {
    const phase = await Phase.findById(phaseId);
    if (!phase) {
        throw new ApiError(404, "Phase not found");
    }

    // Apply only provided updates
    Object.keys(updateData).forEach((key) => {
        phase[key] = updateData[key];
    });

    await phase.save();
    return phase;
};

// Delete a phase by ID
const deletePhaseById = async (phaseId) => {
    const deletedPhase = await Phase.findByIdAndDelete(phaseId);

    if (!deletedPhase) {
        throw new ApiError(404, "Phase not found");
    }

    return deletedPhase;
};


module.exports = { createPhase, updatePhaseById, deletePhaseById };

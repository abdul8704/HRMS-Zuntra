const Phase = require("../../models/projectManagement/phase");
const Project = require("../../models/projectManagement/project");
const Team = require("../../models/projectManagement/team");
const TeamMember = require("../../models/projectManagement/teamMember");
const UserCredentials = require("../../models/userCredentials");
const ApiError = require("../../errors/ApiError");

// Read services
const getAllPhases = async () => {
    return Phase.find({}).lean();
};

const getPhaseById = async (phaseId) => {
    return Phase.findById(phaseId).lean();
};

const getPhasesByProject = async (projectId) => {
    return Phase.find({ project: projectId }).lean();
};

const getOngoingPhasesByProject = async (projectId) => {
    return Phase.find({ project: projectId, status: "ongoing" }).lean();
};

const getNotStartedAndCompletedPhases = async (projectId) => {
    const [notStarted, completed] = await Promise.all([
        Phase.find({ project: projectId, status: "not_started" }).lean(),
        Phase.find({ project: projectId, status: "completed" }).lean(),
    ]);
    return { notStarted, completed };
};

// Create a new phase
const createPhase = async (phaseData) => {
    // Validate project exists
    const project = await Project.findById(phaseData.project);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Validate teams exist if provided
    if (phaseData.teams && phaseData.teams.length > 0) {
        const teamIds = phaseData.teams;
        const existingTeams = await Team.find({ _id: { $in: teamIds } });

        if (existingTeams.length !== teamIds.length) {
            const existingTeamIds = existingTeams.map((team) =>
                team._id.toString()
            );
            const missingTeamIds = teamIds.filter(
                (id) => !existingTeamIds.includes(id.toString())
            );
            throw new ApiError(
                404,
                `Teams not found: ${missingTeamIds.join(", ")}`
            );
        }
    }

    const newPhase = await Phase.create(phaseData);

    if (!newPhase) {
        throw new ApiError(400, "Failed to create Phase");
    }

    // Check if phase endDate is greater than project endDate
    if (phaseData.endDate) {
        if (project.endDate) {
            const phaseEndDate = new Date(phaseData.endDate);
            const projectEndDate = new Date(project.endDate);

            if (phaseEndDate > projectEndDate) {
                // Update project's endDate to match phase's endDate
                await Project.findByIdAndUpdate(project._id, {
                    endDate: phaseData.endDate,
                });
            }
        }
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

// Get all teams of a project (from phases)
const getPhaseTeams = async (phaseId) => {
    const phases = await Phase.find({ _id: phaseId }).populate("teams").lean();
    // Extract teams from the phases
    const allTeams = [];
    phases.forEach((phase) => {
        if (phase.teams && phase.teams.length > 0) {
            allTeams.push(...phase.teams);
        }
    });
    return allTeams;
};

const getProjectIdOfTeams = async (teamIds) => {
    if (!Array.isArray(teamIds) || teamIds.length === 0) {
        return [];
    }

    // Find phases that include any of the given teamIds
    const phases = await Phase.find(
        { teams: { $in: teamIds } },
        { project: 1 } // only fetch project field
    ).lean();

    // Extract unique projectIds
    const projectIds = [
        ...new Set(phases.map((phase) => String(phase.project))),
    ];

    return projectIds;
}

// Get all teams with members for a project
const getAllTeamsWithMembers = async (phaseId) => {
    const phases = await Phase.find({ _id: phaseId }).populate("teams").lean();
    const allTeams = [];

    phases.forEach((phase) => {
        if (phase.teams && phase.teams.length > 0) {
            allTeams.push(...phase.teams);
        }
    });

    const teamsWithMembers = await Promise.all(
        allTeams.map(async (team) => {
            // fetch members
            const members = await TeamMember.find({
                teamId: team._id,
                active: true,
            })
                .populate("userId", "username")
                .populate("role", "role")
                .lean();

            // fetch team lead
            const teamLead = await UserCredentials.findById(team.teamLead)
                .populate("role", "role")
                .lean();

            return {
                id: team._id,
                name: team.teamName,
                description: team.teamDescription,
                teamLead: teamLead
                    ? {
                          id: teamLead._id,
                          name: teamLead.username,
                          role: teamLead.role?.role || "No Role",
                      }
                    : null,
                members: members.map((member) => ({
                    id: member.userId._id,
                    name: member.userId.username,
                    profilePicture: member.userId.profilePicture,
                    role: member.role?.role || "No Role",
                })),
            };
        })
    );

    return teamsWithMembers;
};

const addTeamsToPhaseById = async (phaseId, teamIds) => {
    const phase = await Phase.findById(phaseId).lean();
    if (!phase) {
        throw new ApiError(404, "Phase not found");
    }

    // Ensure ObjectId comparison works correctly
    const existingTeamIds = phase.teams.map((t) => t.toString());

    // Filter only new teams (not already present)
    const newTeams = teamIds.filter(
        (id) => !existingTeamIds.includes(id.toString())
    );

    if (newTeams.length === 0) {
        return;
    }

    await Phase.findByIdAndUpdate(
        phaseId,
        { $addToSet: { teams: { $each: newTeams } } }, // ✅ prevents duplicates
        { new: true }
    ).populate("teams", "teamName teamDescription");

    return;
};

module.exports = {
    createPhase,
    updatePhaseById,
    deletePhaseById,
    getAllPhases,
    getPhaseById,
    getPhasesByProject,
    getOngoingPhasesByProject,
    getNotStartedAndCompletedPhases,
    getPhaseTeams,
    getAllTeamsWithMembers,
    addTeamsToPhaseById,
    getProjectIdOfTeams,
};

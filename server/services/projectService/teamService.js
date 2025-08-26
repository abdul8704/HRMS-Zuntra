const ApiError = require("../../errors/ApiError");
const Team = require("../../models/team");
const TeamMember = require("../../models/projectManagement/teamMember");
const UserCredentials = require("../../models/userCredentials");

const getMembersOfTeamService = async (teamId) => {
    const teamMembers = await TeamMember.find(
        { teamId },
        { role: 1, userId: 1, _id: 0 } // only keep role + userId
    ).populate({
        path: "userId",
        select: "username role _id", // userId fields
        populate: {
            path: "role", // role reference inside UserCredentials
            select: "role", // 👈 adjust if it's `name` in rolesDetails schema
        },
    });

    return teamMembers;
};

const getAllTeamsService = async () => {
    const teams = await Team.find({})
        .select("teamName teamDescription") // only include these from Team
        .populate({
            path: "teamLead",
            select: "username role _id", // username, role, userid
            populate: {
                path: "role", // populate role reference
                select: "role", // 👈 make sure this matches your schema field
            },
        });

    return teams;
};

const createNewTeamService = async (data) => {
    const { teamLeadId, teamName, teamDescription = "", teamMembers } = data;

    // 1. Create new team
    const newTeam = new Team({
        teamLead: teamLeadId,
        teamName,
        teamDescription,
    });

    await newTeam.save();

    const newTeamId = newTeam._id;

    // 2. Insert team members
    const membersToInsert = await Promise.all(
        teamMembers.map(async (userId) => {
            const user = await UserCredentials.findById(userId).populate(
                "role",
                "_id"
            );

            return {
                userId: userId,
                teamId: newTeamId,
                role: user.role?._id || null, // safely get roleId
            };
        })
    );

    await TeamMember.insertMany(membersToInsert); // bulk insert

    return newTeam; // return team (optional)
};

const addMembersToTeamService = async (teamId, users) => {
    const teamExists = await Team.findById(teamId);
    if (!teamExists) {
        throw new ApiError("Team not found");
    }

    await Promise.all(
        users.map(async ({ userid, role }) => {
            const exists = await TeamMember.findOne({ teamId, userId: userid });

            if (!exists) {
                await TeamMember.create({ teamId, userId: userid, role });
            }
        })
    );

    return;
};

module.exports = {
    createNewTeamService,
    getMembersOfTeamService,
    getAllTeamsService,
    addMembersToTeamService,
};

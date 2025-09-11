const ApiError = require("../../errors/ApiError");
const Team = require("../../models/projectManagement/team");
const TeamMember = require("../../models/projectManagement/teamMember");
const UserCredentials = require("../../models/userCredentials");
const Phase = require("../../models/projectManagement/phase");
const attendanceService = require("../attendanceService")

const getMembersOfTeamService = async (teamId) => {
    const teamLead = await Team.findById(teamId, {
        teamDescription: 1,
        teamLead: 1,
        teamName: 1
    }).populate({
        path: "teamLead",
        select: "_id username role",
        populate: {
            path: "role", // nested populate for role
            select: "role",
        },
    });

    const teamMembers = await TeamMember.find(
        { teamId },
        { role: 1, userId: 1, _id: 0 }
    ).populate({
        path: "userId",
        select: "username role _id",
        populate: {
            path: "role",
            select: "role",
        },
    });

    return { teamMembers, teamLead };
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

const isUserThisTL = async (userId) => {
    const proj = await Team.find(
        { teamLead: userId },
        {
            teamName: 1,
            teamDescription: 1,
            teamLead: 1,
            _id: 1,
        }
    );

    if (proj.length === 0) return false;

    return proj;
};


const userTLofProj = async (userId, teamId) => {
    const proj = await Team.findById({ _id: teamId }, {
        teamName: 1,
        teamDescription: 1,
        teamLead: 1,
        _id: 1
    });

    if(proj.length == 0 || proj.teamLead != userId)
        return false;

    return proj;

}
const getTeamMemberLeaves = async (teamIds) => {
    const members = new Set();

    for(const teamId of teamIds) {
        const { teamMembers } = await getMembersOfTeamService(teamId);
        teamMembers.forEach(member => members.add(member.userId));
    }

    let leaveRequests = [];
    for(const userid of members){
        const req = await attendanceService.getLeaveRequests(userid);
        
        if(req.length > 0)
            leaveRequests.push(req);
    }

    return leaveRequests;
}

const getTeamsUserPartOf = async (userId) => {
    const teams = await TeamMember.find({ userId }, {
        teamId: 1,
        _id: 0
    }).populate({
        path: "teamId",
        select: "teamName teamDescription teamLead",
        populate: {
            path: "teamLead",
            select: "username _id"
        }
    });

    const teamLeads = await isThisUserTL(userId);

    return { teams, teamLeads };
}

const getTeamIdsUserPartOf = async (userId) => {
    const { teams, teamLeads } = await getTeamsUserPartOf(userId);

    let teamId = [];

    if(teams.length > 0){
        teams.forEach((team) => {
            teamId.push(team.teamId._id);
        });
    }

    if (teamLeads) {
        teamLeads.forEach((teamLead) => {
            teamId.push(teamLead._id);
        });
    }
    return teamId;
}

const updateTeamService = async (teamId, data) => {
    const team = await Team.findById(teamId);

    if(!team)
        throw new ApiError(404, "Team not found");

    team.teamName = data.teamName || team.teamName;
    team.teamLead = data.teamLead || team.teamLead;
    team.teamDescription = data.teamDescription || team.teamDescription;

    await team.save();

    return team;
}

const deleteTeamMemberService = async (teamId, userId) => {
    const team = await TeamMember.findOneAndDelete({ teamId, userId });

    if(!team)
        throw new ApiError(404, "Team member not found");

    return team;
}

const deleteTeam = async (teamId) => {
    const teamMembers = await TeamMember.deleteMany({ teamId });

    if(teamMembers.length > 0)
        throw new ApiError(400, "Team has members. Please remove them first");

    const team = await Team.findByIdAndDelete(teamId);

    if(!team)
        throw new ApiError(404, "Team not found");
    
    return team;
}

module.exports = {
    createNewTeamService,
    getMembersOfTeamService,
    getAllTeamsService,
    addMembersToTeamService,
    isUserThisTL,
    getTeamMemberLeaves,
    userTLofProj,
    getTeamsUserPartOf,
    getTeamIdsUserPartOf,
    updateTeamService,
    deleteTeamMemberService,
    deleteTeam,
};

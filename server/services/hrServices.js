const UserCredentials = require("../models/userCredentials");
const UserPersonal = require("../models/userPersonal");
const UserCourse = require("../models/userCourse");
const attendanceHelper = require("../utils/attendanceHelper");
const ApiError = require("../errors/ApiError");
const LeaveApplication = require('../models/leaveApplication')

const updateUserData = async (email, shiftId, campusId, roleId) => {
    try {

        const update = await UserCredentials.updateOne(
            { email: email },
            {
                $set: {
                    shift: shiftId,
                    campus: campusId,
                    role: roleId,
                },
            }
        );

        return update;
    } catch (error) {
        throw new ApiError(500, `Failed to update user data for ${email}`, error.message);
    }
};

const getPendingUsers = async () => {
    try {
        const users = await UserCredentials.find({ role: { $exists: false }},{passwordHash: 0, __v: 0});
        return users;
    } catch (error) {
        throw new ApiError(`Failed to fetch pending users`, error.message);
    }
};

const creatUserPersonal = async (userid, salary) => {
    try {
        const userPersonal = new UserPersonal({
            _id: userid,
            Salary: salary,
        });

        await userPersonal.save();
    } catch (error) {
        throw new ApiError(500, `Failed to create user personal data for ${userid}`, error.message);
    }
};

const createUserCourse = async (userid) => {
    try {
        const userCourse = new UserCourse({
            _id: userid,
        });

        await userCourse.save();
    } catch (error) {
        throw new ApiError(500, `Failed to create user course data for ${userid}`, error.message);
    }
};

// TODO: control access
const getPendingLeaveRequests = async () => {
    const pendingReqs = await LeaveApplication.find({ status: 'PENDING' }, {}).populate({
        path: "userid",
        select: "username email phoneNumber profilePicture"
    });
    return pendingReqs;
}

const processLeaveRequest = async (userid, leaveId, decision, comments = '') => {
    const user = await UserCredentials.findById(userid).populate({
        path: 'role',
        select: 'role'
    });

    if (!user || !user.role || !user.role.role) {
        throw new ApiError(403, 'User role not found or invalid');
    }
    const finalDecision = decision.toUpperCase();
    const roleName = user.role.role.toUpperCase();
    const leaveApplication = await LeaveApplication.findById(leaveId);
    const now = new Date();

    if (!leaveApplication) {
        throw new ApiError(400, 'Requested Leave application not found');
    }

    const isApproved = finalDecision === "APPROVED";

    // ⛔ If Super Admin has already acted, no one else can override
    if (
        leaveApplication.superAdminAction !== "PENDING" &&
        roleName !== "HR MANAGER"
    ) {
        if (leaveApplication.status !== finalDecision)
            throw new ApiError(
                403,
                "Leave already reviewed by super admin. You can't override."
            );
        else {
            leaveApplication.adminAction = finalDecision;
            leaveApplication.adminReviewer = userid;
        }
    }

    // ✅ TEAM_LEAD logic
    if (roleName != "HR MANAGER") {
        leaveApplication.status = isApproved ? "APPROVED" : "REJECTED";
        leaveApplication.adminAction = finalDecision;
        leaveApplication.adminReviewer = userid;
    }

    // ✅ HR / SUPER_ADMIN logic
    else if (
        roleName === "HR MANAGER" ||
        roleName === "SUPER_ADMIN" ||
        roleName === "CEO"
    ) {
        leaveApplication.status = isApproved ? "APPROVED" : "REJECTED";
        leaveApplication.superAdminAction = finalDecision;
        leaveApplication.superAdminReviewer = userid;
    }

    leaveApplication.reviewComment = comments;
    leaveApplication.reviewedAt = now;

    await leaveApplication.save();
};


const fetchAllLeaveRequests = async () => {
    const leaveData = await LeaveApplication.find({})
        .populate({
            path: "userid",
            select: "username email phoneNumber profilePicture",
        })
        .populate({
            path: "reviewedBy",
            select: "username email phoneNumber profilePicture"
        });
        return leaveData;
}

module.exports = {
    updateUserData,
    getPendingUsers,
    creatUserPersonal,
    createUserCourse,
    getPendingLeaveRequests,
    processLeaveRequest,
    fetchAllLeaveRequests,
};

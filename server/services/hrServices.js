const UserCredentials = require("../models/userCredentials");
const UserPersonal = require("../models/userPersonal");
const UserCourse = require("../models/userCourse");
const attendanceHelper = require("../utils/attendanceHelper");
const ApiError = require("../errors/ApiError");
const LeaveApplication = require('../models/leaveApplication')

const updateUserData = async (email, shiftId, campusId, roleId) => {
    try {
        console.log(
            "Updating user data for email:",
            email,
            shiftId,
            campusId,
            roleId
        );
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
        const users = await UserCredentials.find({ role: { $exists: false } });
        return users;
    } catch (error) {
        throw new ApiError(`Failed to fetch pending users`, error.message);
    }
};

const creatUserPersonal = async (userid) => {
    try {
        const userPersonal = new UserPersonal({
            _id: userid,
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

    const roleName = user.role.role.toUpperCase();
    console.log(roleName)
    const leaveApplication = await LeaveApplication.findById(leaveId);
    const now = new Date();

    if (!leaveApplication) {
        throw new ApiError(400, 'Requested Leave application not found');
    }

    const isApproved = decision.toUpperCase() === 'APPROVED';

    // ⛔ If Super Admin has already acted, no one else can override
    if (leaveApplication.superAdminAction && roleName === "TEAM LEAD" ) {
        if (leaveApplication.status !== decision.toUpperCase())
            throw new ApiError(
                403,
                "Leave already reviewed by super admin. You can't override."
            );
        else{
            leaveApplication.adminAction = true;    
            console.log("TL and HR agreed on same decision")
        }
    }

    // ✅ TEAM_LEAD logic
    if (roleName === "TEAM LEAD") {
        leaveApplication.status = isApproved ? 'APPROVED' : 'REJECTED';
        leaveApplication.adminAction = true;
        console.log("TL made his decison")
    }

    // ✅ HR / SUPER_ADMIN logic
    else if (roleName === "HR" || roleName === "SUPER_ADMIN" || roleName === 'CEO') {
        leaveApplication.status = isApproved ? 'APPROVED' : 'REJECTED';
        leaveApplication.superAdminAction = true;
        console.log("TL made his decison");
    }

    leaveApplication.reviewComment = comments;
    leaveApplication.reviewedAt = now;
    leaveApplication.reviewedBy = userid;

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
        console.log("DFVFD", leaveData)
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

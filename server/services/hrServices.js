const UserCredentials = require("../models/userCredentials");
const UserPersonal = require("../models/userPersonal");
const UserCourse = require("../models/userCourse");
const Role = require("../models/roles");
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

const superAdminProcessLeaveRequest = async (userid, leaveId, decision, comments = 'NIL') => {
    const finalDecision = decision.toUpperCase();
    const leaveApplication = await LeaveApplication.findById(leaveId);
    const now = new Date();

    if (!leaveApplication) {
        throw new ApiError(400, 'Requested Leave application not found');
    }

   leaveApplication.status = finalDecision === "APPROVED" ? "APPROVED" : "REJECTED";
   leaveApplication.superAdminAction = finalDecision;
   leaveApplication.superAdminReviewer = userid;
   leaveApplication.superAdminReviewComment = comments;
   leaveApplication.superAdminReviewedAt = now;

    await leaveApplication.save();
};


const fetchAllLeaveRequests = async () => {
    const leaveData = await LeaveApplication.find({})
        .populate({
            path: "userid",
            select: "username email phoneNumber profilePicture",
        })
        .populate({
            path: "adminReviewer superAdminReviewer",
            select: "username email phoneNumber profilePicture",
        });
        return leaveData;
}

//@desc onboarding courses by role id
const setOnboardingCourses = async (userId, roleid) => {
    try {
        const roleDetail = await Role.findById(roleid).select("onboardingCourses");
        const courses = roleDetail?.onboardingCourses || [];
        console.log(courses);

        if (courses.length === 0) return;

        const user = await UserCourse.findByIdAndUpdate(
            userId,
            { assignedCourses: courses },
            { new: true }
        );
        console.log(user);
    } catch (error) {
        throw new ApiError(500, "Failed to assign onboarding courses: " + error.message);
    }
};


module.exports = {
    updateUserData,
    getPendingUsers,
    creatUserPersonal,
    createUserCourse,
    getPendingLeaveRequests,
    superAdminProcessLeaveRequest,
    fetchAllLeaveRequests,
    setOnboardingCourses,
};

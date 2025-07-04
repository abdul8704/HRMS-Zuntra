const UserCredentials = require("../models/userCredentials");
const UserPersonal = require("../models/userPersonal");
const UserCourse = require("../models/userCourse");
const attendanceHelper = require("../utils/attendanceHelper");
const ApiError = require("../errors/ApiError");


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
        throw new ApiError(`Failed to update user data`, error.message);
    }
};

const getPendingUsers = async () => {
    try {
        const users = await UserCredentials.find({ role: { $exists: false } });
        return users;
    } catch (error) {
        throw new ApiError(`Failed to get pending users`, error.message);
    }
};

const creatUserPersonal = async (userid) => {
    try {
        const userPersonal = new UserPersonal({
            _id: userid,
        });

        await userPersonal.save();
    } catch (error) {
        throw new ApiError(`Failed to create user personal data`, error.message);
    }
};

const createUserCourse = async (userid) => {
    try {
        const userCourse = new UserCourse({
            _id: userid,
        });

        await userCourse.save();
    } catch (error) {
        throw new ApiError(`Failed to create user course data`, error.message);
    }
};

module.exports = {
    updateUserData,
    getPendingUsers,
    creatUserPersonal,
    createUserCourse,
};

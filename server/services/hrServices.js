const UserCredentials = require("../models/userCredentials");
const UserPersonal = require('../models/userPersonal')
const UserCourse = require('../models/userCourse')
const attendanceHelper = require('../utils/attendanceHelper')

const updateUserData = async (email, shiftId, campusId, roleId) => {    
    
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
};

const getPendingUsers = async () => {
    const users = await UserCredentials.find({ role: { $exists: false } });
    return users;
}

const creatUserPersonal = async (userid) => {
    const userPersonal = new UserPersonal({
        _id: userid,
    });

    await userPersonal.save();
}

const createUserCourse = async (userid) => {
    const userCourse = new UserCourse({
        _id: userid,
    });

    await userCourse.save();
}



module.exports = {
    updateUserData,
    getPendingUsers,
    creatUserPersonal,
    createUserCourse,
};
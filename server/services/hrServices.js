const UserCredentials = require("../models/userCredentials");
const UserPersonal = require('../models/userPersonal')
const UserCourse = require('../models/userCourse')

const updateUserData = async (email, shiftStart, shiftEnd, campus, role) => {
    const update = await UserCredentials.updateOne(
        { email: email },
        {
            $set: {
                shiftStart: shiftStart,
                shiftEnd: shiftEnd,
                campus: campus,
                role: role,
            },
        }
    );

    return update;
};

const getPendingUsers = async () => {
    const users = await UserCredentials.find({ role: "unassigned" });
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
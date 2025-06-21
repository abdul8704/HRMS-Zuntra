const userCredentials = require("../models/userCredentials");

const getAllUserDetails = async () => {
    const userData = await UserDetails.find({});
    return userData;
};

// @desc Get details of a user
const getDetailsOfaUser = async (userid) => {
    const userCreds = await userCredentials.findById(userid);
    return userCreds;
};

module.exports = {
    getAllUserDetails,
    getDetailsOfaUser,
};

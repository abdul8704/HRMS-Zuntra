const UserCredentials = require("../models/userCredentials");

const getAllUserDetails = async () => {
    const userData = await UserDetails.find({}).populate({
        path: "role",
        select: "role -_id", // customize as needed
    });
    return userData;
};

// @desc Get details of a user
const getDetailsOfaUser = async (userid) => {
    const userCreds = await UserCredentials.findById(userid);
    return userCreds;
};



module.exports = {
    getAllUserDetails,
    getDetailsOfaUser,
};

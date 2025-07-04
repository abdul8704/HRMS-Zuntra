const UserCredentials = require("../models/userCredentials");

const getAllUserDetails = async () => {
    try {
        const userData = await UserDetails.find({}).populate({
            path: "role",
            select: "role -_id", // customize as needed
        });
        return userData;
    } catch (error) {
        throw new Error(`Failed to fetch user details: ${error.message}`);
    }
};

// @desc Get details of a user
const getDetailsOfaUser = async (userid) => {
    try {
        const userCreds = await UserCredentials.findById(userid)
            .populate("role", "roleName")
            .populate("shift", "startTime startTime")
            .populate("campus", "campusName");
        return userCreds;
    } catch (error) {
        throw new Error(`Failed to fetch user details: ${error.message}`);
    }
};

module.exports = {
    getAllUserDetails,
    getDetailsOfaUser,
};

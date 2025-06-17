const UserDetails = require('../models/userDetails');

const getAllUserDetails = async () => {
    const userData = await UserDetails.find({});
    return userData;
}

module.exports = {
    getAllUserDetails,
}
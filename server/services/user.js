const UserDetails = require('../models/UserDetails');

const getAllUserDetails = async () => {
    const userData = await UserDetails.find({});
    return userData;
}

module.exports = {
    getAllUserDetails,
}
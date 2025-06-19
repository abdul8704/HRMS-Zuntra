const UserCredentials = require('../models/userCredentials');

const getAllUserDetails = async () => {
    const userData = await UserDetails.find({});
    return userData;
}

module.exports = {
    getAllUserDetails,
}
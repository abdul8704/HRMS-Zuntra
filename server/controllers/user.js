const UserService = require('../services/user');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUserDetails();
    
    if (!users || users.length == 0) 
        throw new ApiError(404, 'No users found');

    return res.status(200).json({
        success: true,
        data: users
    });
})

module.exports = {
    getAllUsers,
}
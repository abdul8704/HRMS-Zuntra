const UserService = require('../services/user');

const getAllUsers = async (req, res) => {
    const users = await UserService.getAllUserDetails();
    if (!users || !users.length) {
        res.status(404).json({
            success: false,
            message: 'No users found.'
        })
    }
    return res.status(200).json({
        success: true,
        data: users
    });
}

module.exports = {
    getAllUsers,
}
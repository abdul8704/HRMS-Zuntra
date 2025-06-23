const rolesService = require('../services/rolesService')
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

const getAllroles = asyncHandler(async (req, res) => {
    const roles = await rolesService.getAllRolesData();
    if (roles.length === 0) 
        throw new ApiError(404, 'No roles found');
    
    return res.status(200).json(roles);
});

module.exports = {
    getAllroles,
};
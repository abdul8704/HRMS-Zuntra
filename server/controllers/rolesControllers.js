const rolesService = require('../services/rolesService')

const getAllroles = async (req, res) => {
    const roles = await rolesService.getAllRolesData();
    if (roles.length === 0) {
        res.status(404)
        throw new Error("No roles found");
    }
    return res.status(200).json(roles);
};

module.exports = {
    getAllroles,
};
const Role = require("../models/roles");

// Get all roles
const getAllRolesData = async () => {
    const rolesData = await Role.find({});
    return rolesData;
};

//@desc Get role details by role name
const getRoleDetailsByName = async (roleCode) => {
    const roleDetail = await Role.findOne({ role: roleCode });
    return roleDetail;
};

module.exports = {
    getAllRolesData,
    getRoleDetailsByName,
};

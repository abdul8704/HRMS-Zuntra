const Role = require("../models/roles");

const getAllRolesData = async () => {
    const rolesData = await Role.find({});
    return rolesData;
};

module.exports = {
    getAllRolesData,
};

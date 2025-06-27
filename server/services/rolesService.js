const Role = require("../models/roles");
// Get all roles
const getAllRolesData = async () => {
    const rolesData = await Role.find({});
    return rolesData;
};

//@desc Get role details by role name
const getRoleDetailsByName = async (roleName) => {
    const roleDetail = await Role.findOne({ role: roleName });
    return roleDetail;
};

const createNewRole = async (roleData) => {
    await Role.create(roleData);
    return { sucess: true, message: "done" };
};

const editRole = async (roleName, updatedData) => {
    const updatedRole = await Role.findOneAndUpdate(
        { role: roleName },
        { $set: updatedData },
        { new: true }
    );

    if (!updatedRole) 
        return { success: false, message: "Role not found" };
    
    return { success: true, message: "Role updated successfully", updatedRole };
};

const deleteRole = async (roleName) => {
    const deletedRole = await Role.findOneAndDelete({ role: roleName });
    
    if (!deletedRole) 
        return { success: false, message: "Role not found" };
    
    return { success: true, message: "Role deleted successfully" };
};

module.exports = {
    getAllRolesData,
    getRoleDetailsByName,
    createNewRole,
    editRole,
    deleteRole,
}

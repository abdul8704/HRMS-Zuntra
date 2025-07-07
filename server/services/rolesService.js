const Role = require("../models/roles");
// Get all roles
const getAllRolesData = async () => {
    try {
        const rolesData = await Role.find({}, {
            role: 1,
            color: 1,
            _id: 1,
        });
        return rolesData;
    } catch (error) {
        throw new ApiError(500, "Failed to fetch roles data: ", error.message);
    }
};

//@desc Get role details by role id
const getRoleDetailsById = async (roleid) => {
    try {
        const roleDetail = await Role.findOne({ _id: roleid });
        return roleDetail;
    } catch (error) {
        throw new ApiError(500, "failed to fetch role details: ", error.message);
    }
};

const createNewRole = async (roleData) => {
    try {
        await Role.create(roleData);
        return { success: true, message: "done" };
    } catch (error) {
        throw new ApiError(500, "Failed to create new role: ", error.message);
    }
};

const editRole = async (roleName, updatedData) => {
    try {
        const updatedRole = await Role.findOneAndUpdate(
            { role: roleName },
            { $set: updatedData },
            { new: true }
        );
        return {
            success: true,
            message: "Role updated successfully",
            updatedRole,
        };
    } catch (error) {
        throw new ApiError(500,"Failed to update role: ", error.message);
    }
};

const deleteRole = async (roleName) => {
    try {
        const deletedRole = await Role.findOneAndDelete({ role: roleName });
        if (!deletedRole) {
            return { success: false, message: "Role not found" };
        }
        return { success: true, message: "Role deleted successfully" };
    } catch (error) {
        throw new ApiError(500, "Failed to delete role: ", error.message);
    }
};

module.exports = {
    getAllRolesData,
    getRoleDetailsById,
    createNewRole,
    editRole,
    deleteRole,
};

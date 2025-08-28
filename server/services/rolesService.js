const Role = require("../models/roles");
const UserCredentials = require("../models/userCredentials");
const ApiError = require("../errors/ApiError");
// Get all roles
const getAllRolesData = async () => {
    try {
        const rolesData = await Role.find({}, {
            role: 1,
            color: 1,
            baseSalary: 1,
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
        if(!roleid){
            return null;
        }
        const roleDetail = await Role.findOne({ _id: roleid });

        if(!roleDetail){
            return null;
        }
        const userCount = await UserCredentials.countDocuments({ role : roleid });
        return { ...roleDetail.toObject(), userCount};
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

const editRole = async (roleId, updatedData) => {
    try {
        const updatedRole = await Role.findOneAndUpdate(
            { _id: roleId },
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

const deleteRole = async (roleId) => {
    try {
        await UserCredentials.updateMany({ role: roleId }, { $unset: { role: 1 } });
        const deletedRole = await Role.findOneAndDelete({ _id: roleId });

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

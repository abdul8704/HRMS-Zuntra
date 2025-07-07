const RoleService = require("../services/rolesService");
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

const getAllroles = asyncHandler(async (req, res) => {

    const roles = await RoleService.getAllRolesData();
    
    if (roles.length === 0) 
        throw new ApiError(404, 'No roles found');
    return res.status(200).json(roles);
});

const getRoleDetails = asyncHandler(async (req, res) => {
    const { roleid } = req.params;

    const role = await RoleService.getRoleDetailsById(roleid);
    if (!role) throw new ApiError(404, "Role not found");

    return res.status(200).json(role);
});

const getAllShifts = asyncHandler(async (req, res) => {
    const shifts = await RoleService.getAllShiftsData();

    if (shifts.length === 0) throw new ApiError(404, "No shifts found");

    return res.status(200).json(shifts);
});

const addNewRole = asyncHandler(async (req, res) => {
    const { userid } = req.user;
    const { role, color, onboardingCourses, baseSalary } = req.body;
    
    if (!role || !color || !onboardingCourses || !baseSalary)
        throw new ApiError(400, "Incomplete role data");

    const newRole = await RoleService.createNewRole(req.body);
    res.status(201).json({ success: true, role: newRole });
});

const addShift = asyncHandler(async (req, res) => {
    const { shiftName, startTime, endTime } = req.body;
    
    if (!shiftName || !startTime || !endTime)
        throw new ApiError(400, "Incomplete shift data");

    const newShift = await RoleService.createNewShift(req.body);
    res.status(201).json({ success: true, shift: newShift });
});



const editRole = asyncHandler(async (req, res) => {
    const { roleName } = req.params;
    const updatedData = req.body;

    if (
        !roleName ||
        !updatedData.role ||
        !updatedData.color ||
        !updatedData.onboarddingCourses ||
        !updatedData.baseSalary
    )
        throw new ApiError(400, "Incomplete role data for update");

    const result = await RoleService.editRole(roleName, updatedData);
    
    if (!result.success) 
        throw new ApiError(404, result.message);

    return res.status(200).json(result.updatedRole);
});

const editShift = asyncHandler(async (req, res) => {
    const { shiftName } = req.params;
    const updatedData = req.body;

    const result = await RoleService.editShift(shiftName, updatedData);
    if (!result.success) throw new ApiError(404, result.message);

    return res.status(200).json(result.updatedShift);
});

const deleteShift = asyncHandler(async (req, res) => {
    const { shiftName } = req.params;

    const result = await RoleService.deleteShift(shiftName);
    if (!result.success) throw new ApiError(404, result.message);

    return res.status(200).json({ message: result.message });
});

const deleteRole = asyncHandler(async (req, res) => {
    const { roleName } = req.params;

    const result = await RoleService.deleteRole(roleName);
    if (!result.success) throw new ApiError(404, result.message);

    return res.status(200).json({ message: result.message });
});

module.exports = {
    getAllroles,
    getRoleDetails,
    getAllShifts,
    addNewRole,
    addShift,
    editRole,
    editShift,
    deleteShift,
    deleteRole,
};
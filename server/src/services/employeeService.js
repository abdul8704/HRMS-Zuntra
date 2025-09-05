const User = require("../models/userCredentials.js");
const ApiError = require("../errors/ApiError.js");
const userPersonal = require("../models/userPersonal.js");

const getAllEmployees = async () => {
    const employees = await User.find({ role: { $exists: true } })
        .select("username email role shift phoneNumber campus profilePicture")
        .populate({
            path: "shift",
            select: "startTime endTime shiftName",
        })
        .populate({
            path: "role",
            select: "role", // Assuming role schema has a 'role' field
        })
        .populate({
            path: "campus",
            select: "locationName", // Adjust based on your GeoLocation schema
        });

    return employees;
};

// @desc Get details of a user
const getDetailsOfaEmployee = async (empId) => {
    try {
        if (!empId) {
            throw new ApiError(400, "Employee ID is required");
        }

        const userCreds = await User.findById(empId, { passwordHash: 0 })
            .populate("role", "role color")
            .populate("shift", "shiftName")
            .populate("campus", "campusName embedURL");
        if (!userCreds) {
            throw new ApiError(404, "Employee not found");
        }

        return userCreds;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            500,
            "Error while fetching details of a user",
            error.message
        );
    }
};
// @desc Get personal details of a user
const getPersonalDetailsOfaEmployee = async (empId) => {
    try {
        if (!empId) {
            throw new ApiError(400, "Employee ID is required");
        }

        const userPersonalDetails = await userPersonal.findById(empId);

        if (!userPersonalDetails) {
            throw new ApiError(404, "Employee not found");
        }

        return userPersonalDetails;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            500,
            "Error while fetching details of a user",
            error.message
        );
    }
};

const getEmployeeByRole = async (roleId) => {
    const userData = await User.find({ role: roleId }).populate(
        "role",
        "role color baseSalary"
    );
    return userData;
};

// TODO: if employee sends multiple request for same day, handle it


//@desc User Personal Data update
const updateEmpData = async ({ userid, dob, religion, address }) => {
    try {
        if (!userid) {
            throw new ApiError(400, "User ID is required");
        }

        const updateFields = {};

        if (dob) updateFields.DOB = new Date(dob);
        if (religion) updateFields.religion = religion;
        if (address) updateFields.Address = address;

        const updatedUser = await userPersonal.findByIdAndUpdate(
            userid,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        return updatedUser;
    } catch (error) {
        if (error instanceof ApiError) throw error;

        throw new ApiError(
            500,
            "Failed to update personal details",
            error.message
        );
    }
};


module.exports = {
    getAllEmployees,
    getDetailsOfaEmployee,
    getEmployeeByRole,
    getPersonalDetailsOfaEmployee,
    updateEmpData,
};

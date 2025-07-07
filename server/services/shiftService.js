const Shift = require("../models/shift");

const getAllShiftsData = async () => {
    try {
        const shiftsData = await Shift.find({});
        return shiftsData;
    } catch (error) {
        throw new ApiError(500, "Failed to fetch shifts data:", error.message);
    }
};

const createNewShift = async (shiftData) => {
    try {
        await Shift.create(shiftData);
        return { success: true, message: "Shift created successfully" };
    } catch (error) {
        throw new ApiError(500, "Failed to create new shift:", error.message);
    }
};

const editShift = async (shiftName, updatedData) => {
    try {
        const updatedShift = await Shift.findOneAndUpdate(
            { shiftName: shiftName },
            { $set: updatedData },
            { new: true }
        );
        return {
            success: true,
            message: "Shift updated successfully",
            updatedShift,
        };
    } catch (error) {
        throw new ApiError(500, "Failed to update shift:", error.message);
    }
};

const deleteShift = async (shiftName) => {
    try {
        const deletedShift = await Shift.findOneAndDelete({
            shiftName: shiftName,
        });

        if (!deletedShift)
            return { success: false, message: "Shift not found" };

        return { success: true, message: "Shift deleted successfully" };
    } catch (error) {
        throw new ApiError(500, "Failed to delete shift:", error.message);
    }
};

module.exports = {
    getAllShiftsData,
    createNewShift,
    editShift,
    deleteShift,
};

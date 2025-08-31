const Shift = require("../models/shift");
const UserCredentials = require("../models/userCredentials");

const getAllShiftsData = async () => {
  try {
    // Fetch all shifts
    const shiftsData = await Shift.find({});

    const shiftsWithUserCount = await Promise.all(
      shiftsData.map(async (shift) => {
        const userCount = await UserCredentials.countDocuments({ shift: shift._id });
        
        return {
          ...shift.toObject(),
          userCount
        };
      })
    );

    return shiftsWithUserCount;
  } catch (error) {
    throw new ApiError(500, "Failed to fetch shifts data:", error.message);
  }
};

const getShiftByIdService = async (shiftId) => {
    const shift = await Shift.findById(shiftId);
    return shift;
};

const createNewShift = async (shiftData) => {
    try {
        await Shift.create(shiftData);
        return { success: true, message: "Shift created successfully" };
    } catch (error) {
        throw new ApiError(500, "Failed to create new shift:", error.message);
    }
};

const editShift = async (shiftId, updatedData) => {
    try {
        const updatedShift = await Shift.findByIdAndUpdate(
            shiftId,
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

const deleteShift = async (shiftId, alternateShiftId = null) => {
    await UserCredentials.updateMany({ shift: shiftId }, { shift: alternateShiftId });
    const deletedShift = await Shift.findByIdAndDelete(shiftId);
    return { success: true, message: "Shift deleted successfully", deletedShift };
};

module.exports = {
    getAllShiftsData,
    getShiftByIdService,
    createNewShift,
    editShift,
    deleteShift,
};

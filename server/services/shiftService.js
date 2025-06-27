const Shift = require("../models/shift");

const getAllShiftsData = async () => {
    const shiftsData = await Shift.find({});
    return shiftsData;
};

const createNewShift = async (shiftData) => {
    await Shift.create(shiftData);
    return { success: true, message: "Shift created successfully" };
};

const editShift = async (shiftName, updatedData) => {
    const updatedShift = await Shift.findOneAndUpdate(
        { shiftName: shiftName },
        { $set: updatedData },
        { new: true }
    );


    if (!updatedShift)
        return { success: false, message: "Shift not found" };
 
    return { success: true, message: "Shift updated successfully", updatedShift };
};

const deleteShift = async (shiftName) => {
    const deletedShift = await Shift.findOneAndDelete({ shiftName: shiftName });

    if (!deletedShift) 
        return { success: false, message: "Shift not found" };

    return { success: true, message: "Shift deleted successfully" };
};


module.exports = {
    getAllShiftsData,
    createNewShift,
    editShift,
    deleteShift
};

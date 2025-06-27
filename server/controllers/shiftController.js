const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');
const ShiftService = require('../services/shiftService');

const getAllShifts = asyncHandler(async (req, res) => {
    const shifts = await ShiftService.getAllShiftsData();
    if (shifts.length === 0)
         throw new ApiError(404, "No shifts found");
    return res.status(200).json(shifts);
});

const addShift = asyncHandler(async (req, res) => {
    const { shiftName, startTime, endTime } = req.body;
    
    if (!shiftName || !startTime || !endTime)
        throw new ApiError(400, "Incomplete shift data");

    const newShift = await ShiftService.createNewShift(req.body);
    res.status(201).json({ success: true, shift: newShift });
});

const editShift = asyncHandler(async (req, res) => {
    const { shiftName } = req.params;
    const updatedData = req.body;

    const result = await ShiftService.editShift(shiftName, updatedData);
    if (!result.success) throw new ApiError(404, result.message);

    return res.status(200).json(result.updatedShift);
});

const deleteShift = asyncHandler(async (req, res) => {
    const { shiftName } = req.params;

    const result = await ShiftService.deleteShift(shiftName);
    if (!result.success) throw new ApiError(404, result.message);

    return res.status(200).json({ message: result.message });
});

module.exports = {
    getAllShifts,
    addShift,
    editShift,
    deleteShift,
};
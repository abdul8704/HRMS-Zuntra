const HolidayService = require('../services/holidayService');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');

const getAllHolidaysInRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
    const holidays = await HolidayService.getAllHolidaysInRange(startDate, endDate);
    res.status(200).json({
        success: true,
        data: holidays
    });
})

const getHolidayById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const holiday = await HolidayService.getHolidayById(id);
    res.status(200).json({
        success: true,
        data: holiday
    });
})

const getHolidaysInRange = asyncHandler(async (req, res) => {
    const { startDate, endDate, userid } = req.query;


    if (!startDate || !endDate) {
        throw new ApiError(400, 'Start date and end date are required');
    }
    if (new Date(startDate) > new Date(endDate)) {
        throw new ApiError(400, 'Start date cannot be after end date');
    }

    const holidays = await HolidayService.getHolidaysInRange(startDate, endDate, userid);

    res.status(200).json({
        success: true,
        data: holidays
    });
})

const addHolidays = asyncHandler(async (req, res) => {
    const holidayData = req.body;

    if (!holidayData || !Array.isArray(holidayData.dates) || holidayData.dates.length === 0) {
        throw new ApiError('Holiday dates (array) are required', 400);
    }

    const holiday = await HolidayService.addHolidays(holidayData);

    res.status(201).json({
        success: true,
        data: holiday
    });
})

const updateHoliday = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const holidayData = req.body;

    if (!holidayData || !Array.isArray(holidayData.dates) || holidayData.dates.length === 0) {
        throw new ApiError('Holiday dates (array) are required', 400);
    }

    const holiday = await HolidayService.updateHoliday(id, holidayData);

    res.status(200).json({
        success: true,
        data: holiday
    });
})

const deleteHoliday = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError('Holiday ID is required', 400);
    }
    await HolidayService.deleteHoliday(id);

    res.status(200).json({
        success: true,
        message: 'Holiday deleted successfully'
    });
});

module.exports = {
    getAllHolidaysInRange,
    getHolidayById,
    getHolidaysInRange,
    addHolidays,
    updateHoliday,
    deleteHoliday
};
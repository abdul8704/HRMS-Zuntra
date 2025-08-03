const Holiday = require('../models/holiday');
const ApiError = require('../errors/ApiError');
const AttendanceHelper = require("../utils/attendanceHelper")

const getAllHolidays = async () => {
    const holidays = await Holiday.find();
    return holidays;
  
}

const getHolidaysInRange = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ApiError(400, 'Invalid date range provided');
    }
    
    const holidays = await Holiday.find({
        date: {
            $gte: start,
            $lte: end
        }
    }).sort({date: 1});
    return holidays;
}

const getHolidayById = async (id) => {
    const holiday = await Holiday.findById(id);
    if (!holiday) {
        throw new ApiError('Holiday not found');
    }
    return holiday;
}

const addHolidays = async (holidayData) => {
    const upsertedHolidays = [];

    for (const holiday of holidayData) {
        if (!holiday.date || !holiday.name) {
            throw new ApiError("Holiday date and name are required", 400);
        }

        const parsedDate = AttendanceHelper.parseDateAsUTC(holiday.date);

        if (isNaN(parsedDate)) {
            throw new ApiError(`Invalid date format: ${holiday.date}`, 400);
        }

        const updatedOrInserted = await Holiday.findOneAndUpdate(
            { date: parsedDate },
            { $set: { name: holiday.name } },
            { new: true, upsert: true }
        );

        upsertedHolidays.push(updatedOrInserted);
    }

    console.log("Upserted holidays:", upsertedHolidays);
    return upsertedHolidays;
};


const updateHoliday = async (id, holidayData) => {
    const holiday = await Holiday.findByIdAndUpdate(id, holidayData, { new: true });
    return holiday;
}

const deleteHoliday = async (id) => {
    await Holiday.findByIdAndDelete(id);
    return { message: 'Holiday deleted successfully' };
}

module.exports = {
    getAllHolidays,
    getHolidaysInRange,
    getHolidayById,
    addHolidays,
    updateHoliday,
    deleteHoliday
};
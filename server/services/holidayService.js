const Holiday = require('../models/holiday');
const ApiError = require('../errors/ApiError');

const getAllHolidays = async () => {
    const holidays = await Holiday.find();
    return holidays;
  
}

const getHolidaysInRange = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log("Start Date:", start, "End Date:", end);    
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ApiError(400, 'Invalid date range provided');
    }
    
    const holidays = await Holiday.find({
        date: {
            $gte: start,
            $lte: end
        }
    });
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
    const holidays = []

    holidayData.forEach(holiday => {
        if (!holiday.date || !holiday.name) {
            throw new ApiError('Holiday date and name are required', 400);
        }
        holidays.push({
            date: new Date(holiday.date),
            name: holiday.name
        });
    });

    const inserted = await Holiday.insertMany(holidays, { ordered: false });
    console.log("Inserted holidays:", inserted);
    return inserted;
}

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
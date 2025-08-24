const Holiday = require('../models/holiday');
const ApiError = require('../errors/ApiError');
const AttendanceHelper = require("../utils/attendanceHelper")
const UserPersonal = require('../models/userPersonal')

const getAllHolidaysInRange = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ApiError(400, 'Invalid date range provided');
    }

    // Check if ANY date inside the "dates" array falls inside the range
    const holidays = await Holiday.find({
        dates: {
            $elemMatch: { $gte: start, $lte: end }
        }
    }).sort({ "dates.0": 1 }); // sorting by first date in the array

    return holidays;
};

const getHolidaysInRange = async (startDate, endDate, userid) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ApiError(400, 'Invalid date range provided');
    }

    const applicableValues = ["all"];
    const { religion } = await UserPersonal.findById(userid);

    if (religion)
        applicableValues.push(religion.toLowerCase());

    const holidays = await Holiday.find({
        dates: {
            $elemMatch: { $gte: start, $lte: end }
        },
        applicableTo: {
            $in: applicableValues
        },
    }).sort({ "dates.0": 1 });

    return holidays;
}

const getHolidaysOfDate = async (date) => {
    const targetDate = new Date(date);

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const holidays = await Holiday.find({
        dates: {
            $elemMatch: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        },
    });

    return holidays;
};

const getHolidayById = async (id) => {
    const holiday = await Holiday.findById(id);
    if (!holiday) {
        throw new ApiError('Holiday not found');
    }
    return holiday;
}

const addHolidays = async (holiday) => {
    if (!holiday.dates || !holiday.name) {
        throw new ApiError("Holiday dates and name are required", 400);
    }

    // Parse all dates into UTC format
    const parsedDates = holiday.dates.map(d => AttendanceHelper.parseDateAsUTC(d));
    if (parsedDates.some(d => isNaN(d))) {
        throw new ApiError(`Invalid date format in: ${holiday.dates}`, 400);
    }

    const eligible = holiday.applicableTo || 'all';

    // Upsert by matching the *exact same set of dates*
    const updatedOrInserted = await Holiday.findOneAndUpdate(
        { dates: parsedDates },
        { $set: { name: holiday.name, applicableTo: eligible.toLowerCase(), dates: parsedDates } },
        { new: true, upsert: true }
    );

    return updatedOrInserted;
};


const updateHoliday = async (id, holidayData) => {
    if (holidayData.dates) {
        holidayData.dates = holidayData.dates.map(d => AttendanceHelper.parseDateAsUTC(d));
    }
    const holiday = await Holiday.findByIdAndUpdate(id, holidayData, { new: true });
    return holiday;
}

const deleteHoliday = async (id) => {
    await Holiday.findByIdAndDelete(id);
    return { message: 'Holiday deleted successfully' };
}

module.exports = {
    getAllHolidaysInRange,
    getHolidaysInRange,
    getHolidaysOfDate,
    getHolidayById,
    addHolidays,
    updateHoliday,
    deleteHoliday
};

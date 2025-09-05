const EventService = require('../services/eventService');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('express-async-handler');
const attendanceHelper = require('../utils/attendanceHelper');

const getAllEvents = asyncHandler(async (req, res) => {
    const allEvents = await EventService.getAllEvents();
    res.status(200).json({ success: true, allEvents });
});

const getEventsInRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate || isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        throw new ApiError(400, 'Start date and end date are required in proper formats');
    }
    const start = attendanceHelper.normalizeToUTCDate(startDate);
    const end = attendanceHelper.normalizeToUTCDate(endDate);
    const events = await EventService.getEventsInRange(start, end);

    res.status(200).json({ success: true, events });
});

const getTodaysEvents = asyncHandler(async (req, res) => {
    const { today } = req.query;

    if(!today || isNaN(Date.parse(today))) {
        throw new ApiError(400, 'Today date is required in proper format');
    }

    const events = await EventService.getTodaysEvents(today);
    res.status(200).json({ success: true, events });
});

const getEventById = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    if (!eventId) {
        throw new ApiError(400, 'Event ID is required');
    }

    const event = await EventService.getEventById(eventId);
    res.status(200).json({ success: true, event });
});

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
        throw new ApiError(400, 'Title, description and date are required in proper formats');
    }

    const dates = date instanceof Array ? date : [date];
    const normalizedDates = dates.map(attendanceHelper.normalizeToUTCDate);
    
    if (!normalizedDates.length) 
        throw new ApiError(400, 'At least one valid date is required');
    
    const eventData = {
        title,
        description,
        dates: normalizedDates
    };

    const event = await EventService.createEvent(eventData);
    res.status(201).json({ success: true, event });
});

const editEvent = asyncHandler(async (req, res) => {
    const { eventId, title, description, dates } = req.body;

    if (!eventId || !title || !description || !dates) {
        throw new ApiError(400, 'Event ID, title, description and dates are required in proper formats');
    }

    const eventDates = dates instanceof Array ? dates : [dates];
    const normalizedDates = eventDates.map(attendanceHelper.normalizeToUTCDate);

    if (!normalizedDates.length) {
        throw new ApiError(400, 'At least one valid date is required');
    }
    
    const updatedData = {
        title,
        description,
        dates: normalizedDates
    };

    const event = await EventService.editEvent(eventId, updatedData);
    res.status(200).json({ success: true, event });
});

const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.query;

    if (!eventId) {
        throw new ApirError(400, 'Event ID is required');
    }

    await EventService.deleteEvent(eventId);
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
});

module.exports = {
    getAllEvents,
    getEventsInRange,
    getTodaysEvents,
    getEventById,
    createEvent,
    editEvent,
    deleteEvent
};
const Event = require("../models/attendanceManagement/event");
const ApiError = require('../errors/ApiError');

const getAllEvents = async () => {
    const events = await Event.find();
    return events;
};

const getEventsInRange = async (startDate, endDate) => {
    const events = await Event.find({
        dates: {
            $elemMatch: {
                $gte: startDate,
                $lte: endDate,
            },
        },
    });

    return events;
};

const getTodaysEvents = async (today) => {
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await Event.find({
        dates: {
            $elemMatch: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        },
    });

    return events;
};

const getEventById = async (eventId) => {
    
    const event = await Event.findById(eventId);
    if (!event) 
        throw new ApiError(404, 'Event not found');
    
    return event;
}

const createEvent = async (eventData) => {
    const event = new Event(eventData);
    await event.save();
    return event;
}

const editEvent = async (eventId, updatedData) => {
    const event = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
    
    if (!event)
        throw new ApiError(404, 'Event not found or could not be updated');

    return event;
}

const deleteEvent = async (eventId) => {
    await Event.findByIdAndDelete(eventId);
    return;
}  

module.exports = {
    getAllEvents,
    getEventsInRange,
    getTodaysEvents,
    getEventById,
    createEvent,
    editEvent,
    deleteEvent
}
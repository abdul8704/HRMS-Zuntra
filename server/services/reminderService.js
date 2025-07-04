const Reminder = require("../models/reminder");

// @desc Create a new reminder
const createReminder = async (data) => {
    try {
        const reminder = await Reminder.create(data);
        return reminder;
    } catch (error) {
        throw new Error("Failed to create reminder", error.message);
    }
};

// @desc Get all reminders (optionally filtered by userId)
const getAllReminders = async (userId) => {
    try {
        const filter = userId ? { userId } : {};
        const reminders = await Reminder.find(filter).sort({ date: 1 });
        return reminders;
    } catch (error) {
        throw new Error("Failed to fetch reminders", error.message);
    }
};

// @desc Get reminders set for today (optionally filtered by userId)
const getTodaysReminders = async (userId) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const filter = {
            date: { $gte: startOfDay, $lte: endOfDay },
            ...(userId && { userId }),
        };

        const reminders = await Reminder.find(filter).sort({ date: 1 });
        return reminders;
    } catch (error) {
        throw new Error("Failed to fetch today's reminders", error.message);
    }
};

module.exports = {
    createReminder,
    getAllReminders,
    getTodaysReminders,
};

const Reminder = require("../models/reminder");
const ApiError = require("../errors/ApiError");

// @desc Create a new reminder
const createReminder = async (data) => {
    const { userid, reminder, normalizedDate } = data;
    console.log("Creating reminder:", data);
    const newReminder = new Reminder({
        userid,
        reminder,
        dueDate: normalizedDate
    });

    await newReminder.save();
};

// @desc Get all reminders (optionally filtered by userId)
const getAllReminders = async (userid) => {
    if (!userid)
        throw new ApiError(400, "User ID is required to fetch reminders");

    const data = await Reminder.find({ userid: userid }).sort({
        isCompleted: 1,
        dueDate: 1,
    });
    
    return data;
};

// @desc Get reminders set for today (optionally filtered by userId)
const getTodaysReminders = async (userid) => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const filter = {
        userid: userid,
        dueDate: { $gte: startOfDay, $lte: endOfDay }
    };

    const reminders = await Reminder.find(filter).sort({ dueDate: 1 });
    return reminders;
};
const toggleReminderCompletion = async (userid, reminderId) => {
    const reminder = await Reminder.findOne({ _id: reminderId, userid: userid });
    
    if (!reminder) 
        throw new ApiError(404, "Reminder not found");
    
    reminder.isCompleted = !reminder.isCompleted;
    await reminder.save();

    return reminder;
};

const editRemainder = async (userid, reminderId, updateEmpData) => {
    const reminder = await Reminder.findOne({ _id: reminderId, userid: userid });   

    if (!reminder) 
        throw new ApiError(400, "Reminder ID and update data are required");

    const updatedReminder = await Reminder.findByIdAndUpdate(
        reminderId,
        updateEmpData,
        { new: true }
    );

    return updatedReminder;
}

const deleteReminder = async (userid, reminderId) => {
    const reminder = await Reminder.findById(reminderId);

    if(!reminder || reminder.userid.toString() !== userid)
        throw new ApiError(404, "Reminder not found");

    await Reminder.findByIdAndDelete(reminderId);
};

module.exports = {
    createReminder,
    getAllReminders,
    getTodaysReminders,
    toggleReminderCompletion,
    editRemainder,
    deleteReminder
};

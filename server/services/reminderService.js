const Reminder = require("../models/reminder");
const ApiError = require("../errors/ApiError");

// @desc Create a new reminder
const createReminder = async ({ userid, reminder, dueDate }) => {
  const newReminder = new Reminder({
    userid,
    reminder,
    dueDate,
  });
  await newReminder.save();
};

// @desc Get all reminders for a user
const getAllReminders = async (userid) => {
  if (!userid) throw new ApiError(400, "User ID is required to fetch reminders");

  return await Reminder.find({ userid })
    .sort({ isCompleted: 1, dueDate: 1 });
};

// @desc Get today's reminders
const getTodaysReminders = async (userid) => {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  return await Reminder.find({
    userid,
    dueDate: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ dueDate: 1 });
};

// @desc Toggle reminder completion
const toggleReminderCompletion = async (userid, reminderId) => {
  const reminder = await Reminder.findOne({ _id: reminderId, userid });
  if (!reminder) throw new ApiError(404, "Reminder not found");

  reminder.isCompleted = !reminder.isCompleted;
  await reminder.save();
  return reminder;
};

// @desc Edit reminder
const editReminder = async (userid, reminderId, updateData) => {
  const reminder = await Reminder.findOne({ _id: reminderId, userid });
  if (!reminder) throw new ApiError(404, "Reminder not found");

  return await Reminder.findByIdAndUpdate(reminderId, updateData, { new: true });
};

// @desc Delete reminder
const deleteReminder = async (userid, reminderId) => {
  const reminder = await Reminder.findById(reminderId);
  if (!reminder || reminder.userid.toString() !== userid) {
    throw new ApiError(404, "Reminder not found");
  }

  return await Reminder.findByIdAndDelete(reminderId);
};

module.exports = {
  createReminder,
  getAllReminders,
  getTodaysReminders,
  toggleReminderCompletion,
  editReminder,
  deleteReminder,
};

const asyncHandler = require("express-async-handler");
const reminderService = require("../services/reminderService");
const ApiError = require("../errors/ApiError");

// @desc    Create new reminder
// @route   POST /api/reminder/create
const createReminder = asyncHandler(async (req, res) => {
  const { userid } = req.user;
  const { reminder } = req.body;

  const dueDate = req.body.dueDate ? req.body.dueDate : new Date();
  if (!reminder || !dueDate) {
    throw new ApiError(400, "Fields 'reminder' and 'dueDate' are required");
  }

  await reminderService.createReminder({
    userid,
    reminder,
    dueDate: new Date(dueDate),
  });

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
  });
});

// @desc    Get all reminders
// @route   GET /api/reminder/all
const getAllReminders = asyncHandler(async (req, res) => {
  const { userid } = req.user;
  const reminders = await reminderService.getAllReminders(userid);

  res.status(200).json({
    success: true,
    data: reminders,
  });
});

// @desc    Get today's reminders
// @route   GET /api/reminder/all/today
const getTodaysReminders = asyncHandler(async (req, res) => {
  const { userid } = req.user;
  const reminders = await reminderService.getTodaysReminders(userid);

  res.status(200).json({
    success: true,
    data: reminders,
  });
});

// @desc    Toggle reminder completion
const toggleReminderCompletion = asyncHandler(async (req, res) => {
  const { reminderId } = req.body;
  const { userid } = req.user;

  if (!reminderId) {
    throw new ApiError(400, "Reminder ID is required");
  }

  await reminderService.toggleReminderCompletion(userid, reminderId);

  res.status(200).json({
    success: true,
  });
});

// @desc    Edit reminder
const editReminder = asyncHandler(async (req, res) => {
  const { reminderId, updateData } = req.body;
  const { userid } = req.user;

  if (!reminderId || !updateData?.reminder || !updateData?.dueDate) {
    throw new ApiError(400, "Reminder ID, reminder and due date are required");
  }

  const updatedReminder = await reminderService.editReminder(userid, reminderId, updateData);

  res.status(200).json({
    success: true,
    data: updatedReminder,
  });
});

// @desc    Delete reminder
const deleteReminder = asyncHandler(async (req, res) => {
  const { reminderId } = req.query;
  const { userid } = req.user;

  if (!reminderId) {
    throw new ApiError(400, "Reminder ID is required");
  }

  const deletedReminder = await reminderService.deleteReminder(userid, reminderId);

  res.status(200).json({
    success: true,
    data: deletedReminder,
  });
});

module.exports = {
  createReminder,
  getAllReminders,
  getTodaysReminders,
  toggleReminderCompletion,
  editReminder,
  deleteReminder,
};

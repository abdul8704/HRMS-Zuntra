const asyncHandler = require("express-async-handler");
const reminderService = require("../services/reminderService");
const ApiError = require("../errors/ApiError");
const dateUtils = require("../utils/dateUtils");

// @desc    Create new reminder
// @route   POST /api/reminders/create
const createReminder = asyncHandler(async (req, res) => {
  const userId = req.user.userid;
  const { text, date } = req.body;

  if (!text || !date) {
    throw new ApiError(400, "Fields 'text' and 'date' are required");
  }

  const reminder = await reminderService.createReminder({ userId, text, date });

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
    data: reminder,
  });
});


// @desc    Get all reminders
// @route   GET /api/reminders/all
const getAllReminders = asyncHandler(async (req, res) => {
  const userId = req.user.userid;

  const reminders = await reminderService.getAllReminders(userId);

  if (!reminders.length) {
    throw new ApiError(404, "No reminders found");
  }

  res.status(200).json({
    success: true,
    data: reminders,
  });
});


// @desc    Get today's reminders
// @route   GET /api/reminders/all/today
const getTodaysReminders = asyncHandler(async (req, res) => {
  const userId = req.user.userid;

  const reminders = await reminderService.getTodaysReminders(userId);

  if (!reminders.length) {
    throw new ApiError(404, "No reminders for today");
  }

  res.status(200).json({
    success: true,
    data: reminders,
  });
});


module.exports = {
  createReminder,
  getAllReminders,
  getTodaysReminders,
};

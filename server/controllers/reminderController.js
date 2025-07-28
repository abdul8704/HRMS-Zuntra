const asyncHandler = require("express-async-handler");
const reminderService = require("../services/reminderService");
const ApiError = require("../errors/ApiError");
const dateHelper = require("../utils/attendanceHelper");

// @desc    Create new reminder
// @route   POST /api/reminders/create
const createReminder = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const { reminder, dueDate } = req.body;
  let normalizedDate = new Date(dueDate).toISOString();

  if (!reminder || !dueDate) {
    throw new ApiError(400, "Fields 'reminder' and 'dueDate' are required");
  }

  await reminderService.createReminder({ userid, reminder, normalizedDate });

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
  });
});

// @desc    Get all reminders
// @route   GET /api/reminders/all
const getAllReminders = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const reminders = await reminderService.getAllReminders(userid);

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
  const userid = req.user.userid;

  const reminders = await reminderService.getTodaysReminders(userid);

  if (!reminders.length) {
    throw new ApiError(404, "No reminders for today");
  }

  res.status(200).json({
    success: true,
    data: reminders,
  });
});

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

const editRemainder = asyncHandler(async (req, res) => {
    const { reminderId, updateData } = req.body;
    const { userid } = req.user;
    const { reminder, dueDate } = updateData;
  console.log(updateData)
    if(!reminderId || !reminder || !dueDate) {
        throw new ApiError(400, "Reminder ID, reminder and due date are required");
    }

    const updatedReminder = await reminderService.editRemainder(
        userid,reminderId,
        updateData
    );

    res.status(200).json({
        success: true,
        data: updatedReminder,
    });
});

const deleteReminder = asyncHandler(async (req, res) => {
    const { reminderId } = req.query;
    const { userid } = req.user;

    if (!reminderId) 
        throw new ApiError(400, "Reminder ID is required");

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
    deleteReminder,
    editRemainder,
};

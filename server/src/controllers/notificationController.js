const asyncHandler = require("express-async-handler");
const notificationService = require("../services/notificationService");
const ApiError = require("../errors/ApiError");

const createNotification = asyncHandler(async (req, res) => {
    const { message, applicableTo, applicableToAll } = req.body;
    const postedBy = req.user.userid;

    if (!message) {
        throw new ApiError(400, "Message is required");
    }

    // Validate that either applicableToAll is true or applicableTo is provided
    if (
        applicableToAll !== true &&
        (!applicableTo ||
            !Array.isArray(applicableTo) ||
            applicableTo.length === 0)
    ) {
        throw new ApiError(
            400,
            "Either applicableToAll must be true or applicableTo must be a non-empty array of team IDs"
        );
    }

    const notification = await notificationService.createNotification(
        message,
        postedBy,
        applicableTo || [],
        applicableToAll || false
    );

    res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: notification,
    });
});

const editNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const updates = req.body;
    const userId = req.user.userid;

    if (!notificationId) {
        throw new ApiError(400, "Notification ID is required");
    }

    const notification = await notificationService.editNotification(
        notificationId,
        updates,
        userId
    );

    res.status(200).json({
        success: true,
        message: "Notification updated successfully",
        data: notification,
    });
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.userid;

    if (!notificationId) {
        throw new ApiError(400, "Notification ID is required");
    }

    const result = await notificationService.deleteNotification(
        notificationId,
        userId
    );

    res.status(200).json(result);
});

const getAllNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.userid;

    const notifications = await notificationService.getAllNotifications(userId);

    res.status(200).json({
        success: true,
        data: notifications,
    });
});

const getNotificationById = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    if (!notificationId) {
        throw new ApiError(400, "Notification ID is required");
    }

    const notification = await notificationService.getNotificationById(
        notificationId
    );

    res.status(200).json({
        success: true,
        data: notification,
    });
});



module.exports = {
    createNotification,
    editNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationById,
};

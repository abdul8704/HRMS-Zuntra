const Notification = require("../models/notification");
const ApiError = require("../errors/ApiError");
const { getTeamIdsUserPartOf } = require("./projectService/teamService");


const createNotification = async (
    message,
    postedBy,
    applicableTo = [],
    applicableToAll = false
) => {
    const notification = new Notification({
        message,
        postedBy,
        applicableTo: applicableToAll ? [] : applicableTo,
        applicableToAll,
    });

    await notification.save();
    return notification;
};

const editNotification = async (notificationId, updates, userId) => {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    if (String(notification.postedBy) !== String(userId)) {
        throw new ApiError(
            403,
            "You can only edit notifications posted by you"
        );
    }

    // Update allowed fields
    if (updates.message !== undefined) {
        notification.message = updates.message;
    }
    if (updates.applicableTo !== undefined) {
        notification.applicableTo = updates.applicableTo;
    }
    if (updates.applicableToAll !== undefined) {
        notification.applicableToAll = updates.applicableToAll;
    }
    if (updates.status !== undefined) {
        notification.status = updates.status;
    }

    await notification.save();
    return notification;
};

const deleteNotification = async (notificationId, userId) => {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    if (String(notification.postedBy) !== String(userId)) {
        throw new ApiError(
            403,
            "You can only delete notifications posted by you"
        );
    }

    await Notification.findByIdAndDelete(notificationId);
    return { success: true, message: "Notification deleted successfully" };
};

const getAllNotifications = async (userId) => {
    // Get all team IDs the user is part of
    const userTeamIds = await getTeamIdsUserPartOf(userId);
    console.log(userTeamIds);
    const notifications = await Notification.find({
        $or: [
            { applicableToAll: true },
            { applicableTo: { $in: userTeamIds } },
        ],
    })
        .populate({
            path: "postedBy",
            select: "username email role",
            populate: {
                path: "role",
                select: "role",
            },
        })
        .sort({ createdAt: -1 })
        .lean();

    return notifications;
};

const getNotificationById = async (notificationId) => {
    const notification = await Notification.findById(notificationId)
        .populate("postedBy", "username email profilePicture")
        .lean();

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return notification;
};



module.exports = {
    createNotification,
    editNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationById,
};

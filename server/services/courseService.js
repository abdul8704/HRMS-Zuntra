const courseDetails = require("../models/courseDetails");
const courseContent = require("../models/courseContent");
const userCourse = require("../models/userCourse");
const ApiError = require("../errors/ApiError");

const getAllCourseDetails = async () => {
    try {
        const courseData = await courseDetails.find(
            {},
            {
                _id: 1,
                courseId: 1,
                courseName: 1,
                courseRating: 1,
                courseInstructor: 1,
                courseImage: 1,
                deadline: 1,
                deadlineUnits: 1,
            }
        );
        return courseData;
    } catch (err) {
        throw new ApiError(
            500,
            "Failed to fetch all course details",
            err.message
        );
    }
};

const getCourseIntroById = async (courseId) => {
    try {
        const courseIntro = await courseDetails.find({ courseId });
        return courseIntro;
    } catch (err) {
        throw new ApiError(500, "Failed to fetch course intro", err.message);
    }
};

const getCourseContentById = async (courseId) => {
    try {
        const content = await courseContent.find({ courseId });
        return content;
    } catch (err) {
        throw new ApiError(500, "Failed to fetch course content", err.message);
    }
};

const addNewCourse = async (courseData) => {
    try {
        const newCourse = await courseDetails.create(courseData);
        return newCourse;
    } catch (err) {
        throw new ApiError(500, "Failed to add new course", err.message);
    }
};

const addCourseContent = async (courseContents) => {
    try {
        const newContent = await courseContent.create(courseContents);
        return newContent;
    } catch (err) {
        throw new ApiError(500, "Failed to add course content", err.message);
    }
};

const updateCourseIntro = async (courseId, updateBody) => {
    try {
        const updatedContent = await courseDetails.findOneAndUpdate(
            { courseId },
            updateBody,
            { new: true }
        );

        if (!updatedContent) {
            throw new ApiError(404, "Course intro not found");
        }

        return updatedContent;
    } catch (err) {
        throw new ApiError(500, "Failed to update course intro", err.message);
    }
};

const updateCourseContent = async (courseId, updateBody) => {
    try {
        const updatedContent = await courseContent.findOneAndUpdate(
            { courseId },
            updateBody,
            { new: true }
        );

        if (!updatedContent) {
            throw new ApiError(404, "Course content not found");
        }

        return updatedContent;
    } catch (err) {
        throw new ApiError(500, "Failed to update course content", err.message);
    }
};

const deleteCourse = async (courseId) => {
    try {
        const deletedCourseIntro = await courseDetails.findOneAndDelete({
            courseId,
        });
        const deletedCourseContent = await courseContent.findOneAndDelete({
            courseId,
        });

        if (!deletedCourseIntro) {
            throw new ApiError(404, "Course intro not found");
        }

        if (!deletedCourseContent) {
            throw new ApiError(404, "Course content not found");
        }

        return [deletedCourseIntro, deletedCourseContent];
    } catch (err) {
        throw new ApiError(500, "Failed to delete course content", err.message);
    }
};

const userCourseEnroll = async (userId, courseId) => {
    try {
        const ucourse = await userCourse.findOne({ _id: userId });
        if (!ucourse) {
            throw new ApiError(404, "User not found");
        }
        if (ucourse.currentCourses.includes(courseId)) {
            throw new ApiError(400, "User already enrolled in this course");
        }
        ucourse.currentCourses.push(courseId);
        await ucourse.save();

        return ucourse;
    } catch (err) {
        throw new ApiError(500, "Failed to enroll user in course", err.message);
    }
};

module.exports = {
    addNewCourse,
    getAllCourseDetails,
    getCourseIntroById,
    getCourseContentById,
    addCourseContent,
    updateCourseIntro,
    updateCourseContent,
    deleteCourse,
    userCourseEnroll,
};

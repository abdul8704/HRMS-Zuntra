const courseDetails = require("../models/courseDetails");
const courseContent = require("../models/courseContent");
const ApiError = require("../errors/ApiError");

const getAllCourseDetails = async () => {
    try {
        const courseData = await courseDetails.find();
        return courseData;
    } 
    catch (err) {
        throw new ApiError(500, "Failed to fetch all course details", err.message);
    }
};

const getCourseIntroById = async (courseId) => {
    try {
        const courseIntro = await courseDetails.find({ courseId });
        return courseIntro;
    } 
    catch (err) {
        throw new ApiError(500, "Failed to fetch course intro", err.message);
    }
};

const getCourseContentById = async (courseId) => {
    try {
        const content = await courseContent.find({ courseId });
        return content;
    } 
    catch (err) {
        throw new ApiError(500, "Failed to fetch course content", err.message);
    }
};

const addNewCourse = async (courseData) => {
    try {
        const newCourse = await courseDetails.create(courseData);
        return newCourse;
    } 
    catch (err) {
        throw new ApiError(500, "Failed to add new course", err.message);
    }
};

const addCourseContent = async (courseContents) => {
    try {
        const newContent = await courseContent.create(courseContents);
        return newContent;
    } 
    catch (err) {
        throw new ApiError(500, "Failed to add course content", err.message);
    }
};

module.exports = {
    addNewCourse,
    getAllCourseDetails,
    getCourseIntroById,
    getCourseContentById,
    addCourseContent,
};

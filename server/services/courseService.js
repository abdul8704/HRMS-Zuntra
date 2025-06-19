const courseDetails = require("../models/courseDetails")
const courseContent = require("../models/courseContent")
const asyncHandler=require('express-async-handler')

const getAllCourseDetails = asyncHandler(async () => {
    const courseData = await courseDetails.find();
    return courseData
});

const getCourseIntroById = asyncHandler(async (courseid) => {
    const courseIntro = await courseDetails.find({courseId:courseid});
    return courseIntro
});

const getCourseContentById = asyncHandler(async (courseid) => {
    const content = await courseContent.find({courseId:courseid});
    return content
});

const addNewCourse = asyncHandler(async (courseData) => {
  const newCourse = await courseDetails.create(courseData);
  return newCourse;
});

const addCourseContent = asyncHandler(async (courseContents) => {
    const newCourseContent = await courseContent.create(courseContents);
    return newCourseContent;
});

module.exports = { addNewCourse, getAllCourseDetails, getCourseIntroById, getCourseContentById, addCourseContent };

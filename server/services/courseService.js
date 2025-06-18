const courseDetails = require("../models/courseDetails")
const courseContent = require("../models/courseContent")

const getAllCourseDetails = asyncHandler(async () => {
    const courseData = await courseDetails.find();
    return { success: true, data: courseData }
});

const addNewCourse = asyncHandler(async (courseData) => {
  const newCourse = await courseDetails.create(courseData);
  return { success: true, data: newCourse };
});

const getCourseIntroById = asyncHandler(async (courseid) => {
    const courseIntro = await courseDetails.find({courseId:courseid});
    return { success: true, data: courseIntro }
});

const getCourseContentById = asyncHandler(async (courseid) => {
    const content = await courseContent.find({courseId:courseid});
    return { success: true, data: content }
});

const addCourseContent = asyncHandler(async (courseContents) => {
    const newCourseContent = await courseContent.create(courseContents);
    return { success: true, data: newCourseContent };
});

module.exports = { addNewCourse, getAllCourseDetails, getCourseIntroById, getCourseContentById, addCourseContent };

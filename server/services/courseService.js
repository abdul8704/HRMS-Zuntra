const courseDetails = require("../models/courseDetails")
const courseContent = require("../models/courseContent")

const getAllCourseDetails = async () => {
  try {
    const courseData = await courseDetails.find();
    return { success: true, data: courseData }
  }
  catch (error) {
    return { success: false, error }
  }
};

const addNewCourse = async (courseData) => {
  try {
    const newCourse = await courseDetails.create(courseData);
    return { success: true, data: newCourse };
  } catch (error) {
    return { success: false, error };
  }
};

const getCourseIntroById = async (courseid) => {
  try {
    const courseIntro = await courseDetails.find({courseId:courseid});
    return { success: true, data: courseIntro }
  }
  catch (error) {
    return { success: false, error }
  }
};

const getCourseContentById = async (courseid) => {
  try {
    const content = await courseContent.find({courseId:courseid});
    return { success: true, data: content }
  }
  catch (error) {
    return { success: false, error }
  }
};

const addCourseContent = async (courseContents) => {
  try {
    const newCourseContent = await courseContent.create(courseContents);
    return { success: true, data: newCourseContent };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = { addNewCourse, getAllCourseDetails, getCourseIntroById, getCourseContentById, addCourseContent };

const courseDetails = require("../models/courseDetails")

const getAllCourseDetails = async () => { };

const addNewCourse = async (courseData) => {
  try {
    const newCourse = await CourseDetails.create(courseData);
    return { success: true, data: newCourse };
  } catch (error) {
    return { success: false, error };
  }
};

const getCourseIntroById = async (courseid) => { };

const getCourseContentById = async (courseid) => { };

module.exports = {addNewCourse};
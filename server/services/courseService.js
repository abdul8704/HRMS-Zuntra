const courseDetails = require("../models/courseDetails")
const courseContent = require("../models/courseContent")

const getAllCourseDetails = async () => {
  try{
    const courseData = await courseDetails.find();
    return {success:true,data:courseData}
  }
  catch(error){
    return {success:false,error}
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

const getCourseIntroById = async (courseid) => { };

const getCourseContentById = async (courseid) => { };

const addCourseContent  = async (courseContents)=>{
    try {
    const newCourseContent = await courseContent.create(courseContents);
    return { success: true, data: newCourseContent };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = {addNewCourse, getAllCourseDetails, getCourseIntroById, getCourseContentById, addCourseContent};

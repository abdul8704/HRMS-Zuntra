const asyncHandler = require('express-async-handler')
const courseService = require("../services/courseService"); // adjust path as needed

const createCourseIntroController = asyncHandler(async (req, res) => {
  const courseData = req.body;

  const {
    courseId,
    courseName,
    courseDescription,
    courseInstructor,
    tags,
    courseIntroVideo,
  } = courseData;

  if (
    !courseId ||
    !courseName ||
    !courseDescription ||
    !courseInstructor ||
    !courseIntroVideo ||
    !courseIntroVideo.videoTitle ||
    !courseIntroVideo.videoUrl
  ) {
    throw new ApiError(400, "Missing required course fields");
  }
  
  const existingCourse = await courseService.getCourseIntroById(courseId);
  if (existingCourse.length !== 0) 
    throw new ApiError(409, "Course Id already exists");
  

  const result = await courseService.addNewCourse(courseData);

  if (result) {
    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } else {
    throw new ApiError(500, "Failed to create course content");
  }
});

const createCourseContentController = asyncHandler(async (req, res) => {
  const courseContentData = req.body;

  const { courseId, modules } = courseContentData;

  if (!courseId || !modules || !Array.isArray(modules) || modules.length === 0) {
    throw new ApiError(400, "Missing required fields: courseId or modules");
  }

  for (const module of modules) {
    if (!module.moduleTitle || !Array.isArray(module.submodules) || module.submodules.length === 0) {
      throw new ApiError(400, "Each module must have a moduleTitle and at least one submodule");
    }

    for (const submodule of module.submodules) {
      const {
        submoduleTitle,
        description,
        video,
        quiz,
      } = submodule;

      if (
        !submoduleTitle ||
        !description ||
        !video ||
        !video.videoTitle ||
        !video.videoUrl
      ) {
        throw new ApiError(400, "Each submodule must have submoduleTitle, description, and a valid video");
      }

      if (quiz && Array.isArray(quiz.questions)) {
        for (const question of quiz.questions) {
          if (
            !question.questionText ||
            !Array.isArray(question.options) ||
            question.options.length === 0 ||
            !question.correctAnswer
          ) {
            throw new ApiError(400, "Each quiz question must have questionText, options, and correctAnswer");
          }
        }
      }
    }
  }
  const existingCourse = await courseService.getCourseContentById(courseId);
  if (existingCourse.length !== 0) 
    throw new ApiError(409, "Course Id already exists");

  const result = await courseService.addCourseContent(courseContentData);

  if (result) {
    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } else {
      throw new ApiError(500, "Failed to create course content");
  }
});


const getCourseDetails = asyncHandler(async (req, res) => {
  const result = await courseService.getAllCourseDetails();
  if (result.length === 0) {
      throw new ApiError(404, "No courses available");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

const getCourseContentId = asyncHandler(async (req, res) => {
  const result = await courseService.getCourseContentById(req.params.id);
  if (result.length === 0) {
    throw new ApiError(404, "Course does not exist");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

const getCourseIntroId = asyncHandler(async (req, res) => {
  const result = await courseService.getCourseIntroById(req.params.id);
  if (result.length === 0) {
    throw new ApiError(404, "Course does not exist");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

module.exports = { 
  createCourseIntroController, 
  createCourseContentController, 
  getCourseDetails, 
  getCourseContentId, 
  getCourseIntroId 
};

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


const getCourseDetailsController = asyncHandler(async (req, res) => {
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

const getCourseIntroIdController = asyncHandler(async (req, res) => {
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

const getTocCourseContentIdController = asyncHandler(async (req, res) => {
  const result = await courseService.getTocCourseContentById(req.params.id);
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
const getCourseContentIdController = asyncHandler(async (req, res) => {
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

const editCourseIntroController = asyncHandler(async (req, res) => {
  const result = await courseService.updateCourseIntro(req.params.id,req.body);
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

const editCourseContentController = asyncHandler(async (req, res) => {
  const result = await courseService.updateCourseContent(req.params.id,req.body);
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

const deleteCourseController = asyncHandler(async (req, res) => {
  const result = await courseService.deleteCourse(req.params.id);
  if (!result || result.length === 0) {
    throw new ApiError(404, "Course does not exist");
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});

const courseEnrollController = asyncHandler(async (req, res) => {
  const {userid} = req.user;
  const courseId = req.params.id;

  if (!userid || !courseId) {
    res.status(400);
    throw new Error("userId and courseId are required");
  }

  const result = await courseService.userCourseEnroll(userid, courseId);
  console.log(result)

  res.status(200).json({
    success: true,
    data: result
  });
});


module.exports = { 
  createCourseIntroController, 
  createCourseContentController, 
  getCourseDetailsController, 
  getTocCourseContentIdController, 
  getCourseContentIdController, 
  getCourseIntroIdController,
  editCourseIntroController,
  editCourseContentController,
  deleteCourseController,
  courseEnrollController
};

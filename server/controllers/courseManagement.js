const asyncHandler = require('express-async-handler')
const courseService = require("../services/courseService"); // adjust path as needed

const createCourseIntroController = async (req, res) => {
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
    res.status(400);
    throw new Error("Missing required course fields");
  }

  const existingCourse = await courseService.getCourseIntroById(courseId);
  if (existingCourse.length !== 0) {
    res.status(409);
    throw new Error("Course Id already exists")
  }

  const result = await courseService.addNewCourse(courseData);

  if (result) {
    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } else {
    res.status(500);
    throw new Error("Failed to create course content");
  }
};

const createCourseContentController = async (req, res) => {
  const courseContentData = req.body;

  const { courseId, modules } = courseContentData;

  if (!courseId || !modules || !Array.isArray(modules) || modules.length === 0) {
    res.status(400);
    throw new Error("Missing required fields: courseId or modules");
  }

  for (const module of modules) {
    if (!module.moduleTitle || !Array.isArray(module.submodules) || module.submodules.length === 0) {
      res.status(400);
      throw new Error("Each module must have a moduleTitle and at least one submodule");
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
        res.status(400);
        throw new Error("Each submodule must have submoduleTitle, description, and a valid video");
      }

      if (quiz && Array.isArray(quiz.questions)) {
        for (const question of quiz.questions) {
          if (
            !question.questionText ||
            !Array.isArray(question.options) ||
            question.options.length === 0 ||
            !question.correctAnswer
          ) {
            res.status(400);
            throw new Error("Each quiz question must have questionText, options, and correctAnswer");
          }
        }
      }
    }
  }
  const existingCourse = await courseService.getCourseContentById(courseId);
  if (existingCourse.length !== 0) {
    res.status(409);
    throw new Error("Course Id already exists")
  }

  const result = await courseService.addCourseContent(courseContentData);

  if (result) {
    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } else {
    res.status(500);
    throw new Error("Failed to create course content");
  }
};


const getCourseDetails = async (req, res) => {
  const result = await courseService.getAllCourseDetails();
  if (result.length === 0) {
    res.status(404);
    throw new Error("No courses available");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
};

const getCourseContentId = async (req, res) => {
  const result = await courseService.getCourseContentById(req.params.id);
  if (result.length === 0) {
    res.status(404);
    throw new Error("Course does not exist");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
};

const getCourseIntroId = async (req, res) => {
  const result = await courseService.getCourseIntroById(req.params.id);
  if (result.length === 0) {
    res.status(404);
    throw new Error("Course does not exist");
  }
  else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
};

module.exports = { createCourseIntroController, createCourseContentController, getCourseDetails, getCourseContentId, getCourseIntroId };

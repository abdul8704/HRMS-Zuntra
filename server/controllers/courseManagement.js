const asyncHandler=require('express-async-handler')
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
    res.status(400);
    throw new Error("Missing required course fields");
  }

  const result = await courseService.addNewCourse(courseData);

  if (result.success) {
    res.status(201).json({
      message: "Course created successfully",
      course: result.data,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create course")
    }
});

const createCourseContentController = asyncHandler(async (req, res) => {
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

  const result = await courseService.addCourseContent(courseContentData);

  if (result.success) {
    res.status(201).json({
      message: "Course content created successfully",
      content: result.data,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create course content");
  }
});


const getCourseDetails = asyncHandler(async (req, res) => {
  const result = await courseService.getAllCourseDetails();

  if (result.success) {
    res.status(200).json({
      message: "Courses fetched successfully",
      courses: result.data,
    });
  } else {
    res.status(500);
    throw new Error("Failed to fetch course details");
  }
});

module.exports = {createCourseIntroController,createCourseContentController,getCourseDetails};

const asyncHandler=require('express-async-handler')
const courseService = require("../services/courseService"); // adjust path as needed

const createCourseController = asyncHandler(async (req, res) => {
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
    !Array.isArray(tags) || tags.length === 0 ||
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
    res.status(404);
    throw new Error("Failed to create course")
    }
});

module.exports = createCourseController;

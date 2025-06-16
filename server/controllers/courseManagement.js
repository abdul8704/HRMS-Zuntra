const addNewCourse = require("../services/addNewCourse"); // adjust path as needed

const createCourseController = async (req, res) => {
  const courseData = req.body;

  const result = await addNewCourse(courseData);

  if (result.success) {
    res.status(201).json({
      message: "Course created successfully",
      course: result.data,
    });
  } else {
    res.status(404);
    throw new Error("Failed to create course")
    }
};

module.exports = createCourseController;

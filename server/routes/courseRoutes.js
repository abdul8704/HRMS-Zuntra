const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseManagement")

router.post("/newcourse", CourseController.createCourseIntroController)
router.post("/newcourse/content",CourseController.createCourseContentController)
router.get("/",CourseController.getCourseDetails)
router.get("/details/:id",CourseController.getCourseIntroId)
router.get("/content/:id",CourseController.getCourseContentId)

module.exports = router;

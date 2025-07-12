const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController")

router.post("/newcourse", CourseController.createCourseIntroController)
router.post("/newcourse/content",CourseController.createCourseContentController)
router.get("/",CourseController.getCourseDetailsController)
router.get("/details/:id",CourseController.getCourseIntroIdController)
router.get("/toc/content/:id",CourseController.getTocCourseContentIdController)
router.get("/content/:id",CourseController.getCourseContentIdController)
router.patch("/details/:id/edit",CourseController.editCourseIntroController)
router.patch("/content/:id/edit",CourseController.editCourseContentController)
router.delete("/:id/delete",CourseController.deleteCourseController)
//with respect to users
router.get("/:type",CourseController.getCoursesByTypeForUserId);
router.post("/:id/enroll",CourseController.courseEnrollController)
router.get("/:id/progress",CourseController.getProgressMatrixByCourseIdController)

module.exports = router;

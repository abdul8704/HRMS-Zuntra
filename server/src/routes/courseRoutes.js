const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController")
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

router.get("/", requirePermission("general"), CourseController.getCourseDetailsController)
router.get("/details/:id", requirePermission("general"), CourseController.getCourseIntroIdController)
router.get("/toc/content/:id", requirePermission("general"), CourseController.getTocCourseContentIdController)


router.post("/newcourse/content", requirePermission("courseManagement"), CourseController.createCourseContentController)
router.post("/newcourse", requirePermission("courseManagement"), CourseController.createCourseIntroController)
router.get("/content/:id", requirePermission("courseManagement"), CourseController.getCourseContentIdController)
router.patch("/details/:id/edit", requirePermission("courseManagement"), CourseController.editCourseIntroController)
router.patch("/content/:id/edit", requirePermission("courseManagement"), CourseController.editCourseContentController)
router.delete("/:id/delete", requirePermission("courseManagement"), CourseController.deleteCourseController)

//with respect to users
router.get("/:type", requirePermission("general"), CourseController.getCoursesByTypeForUserId);
router.post("/:id/enroll", requirePermission("general"), CourseController.courseEnrollController);
router.get("/:id/progress", requirePermission("general"), CourseController.getProgressMatrixByCourseIdController);
router.post("/progress/:courseId/:moduleId/:subModuleId", requirePermission("general"), CourseController.setCourseProgress);

router.get("/progress/:userid", requirePermission("employeeManagement"), CourseController.getCourseProgressByUser);

module.exports = router;

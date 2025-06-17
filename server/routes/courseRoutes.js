const express = require("express");
const router = express.Router();
const createCourseController = require("../controllers/courseManagement")


router.post("/newcourse", createCourseController)
module.exports = router;

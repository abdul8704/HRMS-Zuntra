const courseDetails = require("../models/courseManagement/courseDetails");
const courseContent = require("../models/courseManagement/courseContent");
const courseProgress = require("../models/courseManagement/courseProgress");
const userCourse = require("../models/userCourse");
const ApiError = require("../errors/ApiError");

// Utility: Ensure userCourse doc exists
const ensureUserCourseDocument = async (userId) => {
    let ucourse = await userCourse.findById(userId);
    if (!ucourse) {
        ucourse = await userCourse.create({
            _id: userId,
            enrolledCourses: [],
            completedCourses: [],
            assignedCourses: [],
        });
    }
    return ucourse;
};

// Course Info APIs

const getAllCourseDetails = async () => {
    return await courseDetails.find(
        {},
        {
            _id: 1,
            courseId: 1,
            courseName: 1,
            courseRating: 1,
            courseInstructor: 1,
            courseImage: 1,
            deadline: 1,
            deadlineUnits: 1,
        }
    );
};

const getCourseIntroById = async (courseId) => {
    return await courseDetails.findById(courseId);
};

const getTocCourseContentById = async (courseId) => {
    return await courseContent.find(
        { courseId: courseId },
        {
            "modules.moduleTitle": 1,
            "modules.submodules.submoduleTitle": 1,
            _id: 0
        }
    );
};

const getCourseContentById = async (courseId) => {
    return await courseContent.find({ courseId: courseId });
};

const addNewCourse = async (courseData) => {
    return await courseDetails.create(courseData);
};

const addCourseContent = async (courseContents) => {
    return await courseContent.create(courseContents);
};

const updateCourseIntro = async (courseId, updateBody) => {
    const updatedContent = await courseDetails.findOneAndUpdate(
        { courseId },
        updateBody,
        { new: true }
    );

    if (!updatedContent) {
        throw new ApiError(404, "Course intro not found");
    }

    return updatedContent;
};

const updateCourseContent = async (courseId, updateBody) => {
    const updatedContent = await courseContent.findOneAndUpdate(
        { courseId },
        updateBody,
        { new: true }
    );

    if (!updatedContent) {
        throw new ApiError(404, "Course content not found");
    }

    return updatedContent;
};

const deleteCourse = async (courseId) => {
    try {
        const deletedCourseIntro = await courseDetails.findOneAndDelete({ courseId });
        const deletedCourseContent = await courseContent.findOneAndDelete({ courseId });

        if (!deletedCourseIntro) {
            throw new ApiError(404, "Course intro not found");
        }

        if (!deletedCourseContent) {
            throw new ApiError(404, "Course content not found");
        }

        return [deletedCourseIntro, deletedCourseContent];
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, "Failed to delete course content", err.message);
    }
};

// User-Course Related APIs

const getCoursesByTypeForUserId = async (type, id) => {
    await ensureUserCourseDocument(id); // auto-create if not exists
    const userCourseList = await userCourse.findById(id).select(type).populate(type);
    return userCourseList;
};

const userCourseEnroll = async (userId, courseId) => {
    try {
        const ucourse = await ensureUserCourseDocument(userId);

        if (ucourse.enrolledCourses.includes(courseId)) {
            throw new ApiError(400, "User already enrolled in this course");
        }

        ucourse.enrolledCourses.push(courseId);
        await ucourse.save();

        const tocData = await getTocCourseContentById(courseId);

        if (!tocData.length) {
            throw new ApiError(404, "Course TOC not found");
        }

        const modules = tocData[0]?.modules || [];
        const completedModules = modules.map(mod => {
            const submodules = mod?.submodules || [];
            return new Array(submodules.length).fill(false);
        });

        const totalSubModules = completedModules.reduce((sum, subArray) => sum + subArray.length, 0);

        await courseProgress.create({
            userId,
            courseId,
            percentComplete: 0,
            moduleStatus: {
                totalSubModules,
                completedModules,
            },
        });

        return ucourse;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, "Failed to enroll user in course", err.message);
    }
};

const fetchProgressMatrix = async (userId, courseId) => {
    try {
        const progressMatrix = await courseProgress.findOne(
            { userId, courseId },
            { percentComplete: 1, moduleStatus: 1 }
        );

        return progressMatrix
            ? {
                  percentComplete: progressMatrix.percentComplete,
                  moduleStatus: progressMatrix.moduleStatus,
              }
            : null;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, "Unable to get progress matrix", err.message);
    }
};

const setCourseProgress = async (userId, courseId, moduleId, subModuleId) => {
    try {
        const progress = await courseProgress.findOne({ userId, courseId });

        if (!progress) {
            throw new ApiError(400, "User has not enrolled in this course");
        }

        const matrix = progress.moduleStatus.completedModules;

        if (!matrix[moduleId][subModuleId]) {
            matrix[moduleId][subModuleId] = true;

            const total = progress.moduleStatus.totalSubModules || 1;
            const completed = matrix.flat().filter(Boolean).length;
            const percentComplete = Math.floor((completed / total) * 100);

            progress.moduleStatus.completedModules = matrix;
            progress.percentComplete = percentComplete;

            await progress.save();

            // Update user status when completed
            if (percentComplete === 100) {
                const user = await ensureUserCourseDocument(userId);

                const cIdStr = courseId.toString();
                user.enrolledCourses = user.enrolledCourses.filter(
                    id => id.toString() !== cIdStr
                );
                user.assignedCourses = user.assignedCourses.filter(
                    id => id.toString() !== cIdStr
                );
                if (!user.completedCourses.some(id => id.toString() === cIdStr)) {
                    user.completedCourses.push(courseId);
                }

                await user.save();
            }
        }

        return progress;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, "Failed to set course progress", err.message);
    }
};

const getProgressByUser = async (userId) => {
    try {
        // Find all progress records for the user
        const progressData = await courseProgress.find({ userId });

        if (!progressData || progressData.length === 0) {
            return [];
        }

        // Map progress with course details
        const results = await Promise.all(
            progressData.map(async (progress) => {
                const course = await courseDetails.findById(progress.courseId);

                return {
                    courseId: progress.courseId,
                    percentComplete: progress.percentComplete,
                    // moduleStatus: progress.moduleStatus,
                    courseDetails: course
                        ? {
                              courseName: course.courseName,
                            //   {courseDescription: course.courseDescription}
                              courseInstructor: course.courseInstructor,
                              courseImage: course.courseImage,
                              courseRating: course.courseRating,
                              deadline: course.deadline,
                              deadlineUnits: course.deadlineUnits,
                          }
                        : null,
                };
            })
        );

        return results;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, "Unable to get progress by user", err.message);
    }
};

module.exports = {
    addNewCourse,
    getAllCourseDetails,
    getCourseIntroById,
    getTocCourseContentById,
    getCourseContentById,
    addCourseContent,
    updateCourseIntro,
    updateCourseContent,
    deleteCourse,
    userCourseEnroll,
    fetchProgressMatrix,
    getCoursesByTypeForUserId,
    setCourseProgress,
    getProgressByUser,
};

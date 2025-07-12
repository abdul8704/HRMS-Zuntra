const courseDetails = require("../models/courseDetails");
const courseContent = require("../models/courseContent");
const courseProgress = require("../models/courseProgress");
const userCourse = require("../models/userCourse");
const ApiError = require("../errors/ApiError");

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
    return await courseContent.find({ courseId: courseId }, { 'modules.moduleTitle': 1, 'modules.submodules.submoduleTitle': 1, _id: 0 });
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
        const deletedCourseIntro = await courseDetails.findOneAndDelete({
            courseId,
        });
        const deletedCourseContent = await courseContent.findOneAndDelete({
            courseId,
        });

        if (!deletedCourseIntro) {
            throw new ApiError(404, "Course intro not found");
        }

        if (!deletedCourseContent) {
            throw new ApiError(404, "Course content not found");
        }

        return [deletedCourseIntro, deletedCourseContent];
    } catch (err) {
        if (err instanceof ApiError)
            throw err;
        throw new ApiError(500, "Failed to delete course content", err.message);
    }
};
//with respect to user
// @desc    Get all enrolled courses by user ID type-[enrolledCourses, assignedCourses, completedCourses]
const getCoursesByTypeForUserId = async (type, id) => {
  const userCourseList = await userCourse.findById(id).select(type).populate(type);
  return userCourseList;
};

// @desc    enroll a course 
const userCourseEnroll = async (userId, courseId) => {
    try {
        const ucourse = await userCourse.findById(userId);

        if (!ucourse) {
            throw new ApiError(404, "User not found");
        }

        if (ucourse.enrolledCourses.includes(courseId)) {
            throw new ApiError(400, "User already enrolled in this course");
        }

        // Add to enrolledCourses
        ucourse.enrolledCourses.push(courseId);
        await ucourse.save();

        // Use TOC structure to determine progress layout
        const tocData = await getTocCourseContentById(courseId);

        if (!tocData.length) {
            throw new ApiError(404, "Course TOC not found");
        }

        // Flatten the module/submodule structure from TOC
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
            { userId: userId, courseId: courseId },
            { moduleStatus: 1 }
        );

        return progressMatrix ? progressMatrix.moduleStatus : null;
    } catch (err) {
        throw new ApiError(500, "Unable to get progress matrix", err.message);
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
};

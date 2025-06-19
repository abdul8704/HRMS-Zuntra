const asyncHandler = require('express-async-handler');
const courseService = require("../services/projectService")


// @desc Get all ongoing projects
// @route GET /api/project/ongoing
const getAllOnGoingProjects = async (req, res) => {
    const projectsList = await projectService.getAllOnGoingProjects();
    if (projectsList.length === 0) {
        res.status(404);
        throw new Error("No Projects Currently OnGoing")
    }
    console.log(projectsList)
    return res.status(200).json({
        success: true,
        data: projectsList,
    });
};

// @desc Get all finished projects
// @route GET /api/project/finished
const getAllFinishedProjects = async (req, res) => {
    const projectsList = await projectService.getAllFinishedProjects();
    if (projectsList.length === 0) {
        res.status(404);
        throw new Error("No Finished Projects Available")
    }
    console.log(projectsList)
    res.status(200).json({
        success: true,
        data: projectsList,
    });
};


module.exports = { getAllOnGoingProjects, getAllFinishedProjects };
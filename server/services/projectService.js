const asyncHandler = require("express-async-handler");
const Project = require("../models/project");
const ApiError = require("../errors/ApiError");

// @desc Get all ongoing projects
const getAllOnGoingProjects = async () => {
    try {
        const projectsList = await Project.find({ status: { $eq: "Ongoing" } });
        return projectsList;
    } catch (error) {
        throw new ApiError("Failed to fetch ongoing projects:", error.message);
    }
};

// @desc Get all finished projects
const getAllFinishedProjects = async () => {
    try {
        const projectsList = await Project.find({
            status: { $eq: "Finished" },
        });
        return projectsList;
    } catch (error) {
        throw new ApiError("Failed to fetch finished projects:", error.message);
    }
};

// @desc Get a details of a projects
const getAProject = async (id) => {
    try {
        const project = await Project.findById(id);
        return project;
    } catch (error) {
        throw new ApiError("Failed to fetch project details:", error.message);
    }
};

// @desc Get a details of a projects based on date
const getAllProjectsOnDate = async (startOfDay, endOfDay) => {
    try {
        const projectsList = await Project.find({
            endDate: { $gte: startOfDay, $lte: endOfDay },
        });
        return projectsList;
    } catch (error) {
        throw new ApiError(500, "Failed to fetch projects on date:", error.message);
    }
};

// @desc Create new course
const createNewProject = async (data) => {
    try {
        const projectData = await Project.create(data);
        return projectData;
    } catch (error) {
        throw new ApiError(500, "Failed to create new project:", error.message);
    }
};

module.exports = {
    getAllOnGoingProjects,
    getAllFinishedProjects,
    getAProject,
    createNewProject,
    getAllProjectsOnDate,
};

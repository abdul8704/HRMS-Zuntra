const asyncHandler = require("express-async-handler");
const Project = require("../models/project");

// @desc Get all ongoing projects
const getAllOnGoingProjects = async () => {
    const projectsList = await Project.find({ status: { $eq: "Ongoing" } });
    return projectsList;
};

// @desc Get all finished projects
const getAllFinishedProjects = async () => {
    const projectsList = await Project.find({ status: { $eq: "Finished" } });
    return projectsList;
};

// @desc Get a details of a projects
const getAProject = async (id) => {
    const projectsList = await Project.findById(id);
    return projectsList;
};

// @desc Get a details of a projects based on date
const getAllProjectsOnDate = async (startOfDay, endOfDay) => {
    console.log(startOfDay, endOfDay)
    const projectsList = await Project.find({ endDate: { $gte: startOfDay, $lte: endOfDay}});
    return projectsList;
};

// @desc Create new course
const createNewProject = async (data) => {
    const projectData = await Project.create(data);
    return projectData;
};

module.exports = {
    getAllOnGoingProjects,
    getAllFinishedProjects,
    getAProject,
    createNewProject,
    getAllProjectsOnDate,
};

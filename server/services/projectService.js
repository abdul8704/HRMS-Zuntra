const asyncHandler=require('express-async-handler');
const Project = require("../models/project");

// @desc Get all ongoing projects
const getAllOnGoingProjects=asyncHandler(async() =>{
    const projectsList = await Project.find({status: {$eq : "Ongoing"}});
    return projectsList;
});

// @desc Get all finished projects
const getAllFinishedProjects=asyncHandler(async() =>{
    const projectsList = await Project.find({status: {$eq : "Finished"}});
    return projectsList;
});


module.exports = { getAllOnGoingProjects, getAllFinishedProjects };
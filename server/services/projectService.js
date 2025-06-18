const asyncHandler=require('express-async-handler');
const Project = require("../models/project");

const getAllCurrentProjects=asyncHandler(async(req,res) =>{
    const projectsList = await Project.find();
    return projectsList;
});

module.exports = { getAllCurrentProjects };
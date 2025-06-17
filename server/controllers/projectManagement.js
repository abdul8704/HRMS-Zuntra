const asyncHandler=require('express-async-handler');
const Project = require("../models/project");


// @desc Get all ongoing projects
// @route GET /api/project/current
// @access HR
const getAllCurrentProjects =asyncHandler(async(req,res) =>{
    const projectsList = await Project.find({})
    console.log(projectsList)
    res.status(200).json({message: "All Projects"});
});

module.exports = { getAllCurrentProjects };
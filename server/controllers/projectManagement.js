const asyncHandler=require('express-async-handler');
const courseService = require("../services/projectService")


// @desc Get all ongoing projects
// @route GET /api/project/current
// @access HR
const getAllCurrentProjects =asyncHandler(async(req,res) =>{
    const projectsList = await courseService.getAllCurrentProjects();
    if(projectsList.length===0){
        res.status(404);
        throw new Error("No Projects Available")
    }
    console.log(projectsList)
    res.status(200).json({message: "All Projects"});
});

module.exports = { getAllCurrentProjects };
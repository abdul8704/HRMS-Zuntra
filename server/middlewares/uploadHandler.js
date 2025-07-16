const multer = require("multer")
const path = require("path");

//Course Videos
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/courseLearnVideos");
    },
    filename:(req,file,cb)=>{
        const { courseId, moduleId, subModuleId } = req.body;
        const extension = ".mp4";
        const newFileName = `${courseId}-${moduleId}-${subModuleId}${extension}`;
        cb(null,newFileName);
    }
})

const fileFilter=(req,file,cb) => {
    const allowedTypes= /mp4/;
    const isAllowed  = allowedTypes.test(file.mimetype);
    if(isAllowed){
        cb(null,true);
    }
    else{
        cb(Object.assign(new Error("Unable to send Message!!"), { statusCode: 400 }),false);
    }
};

const uploadVideo = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = {uploadVideo};
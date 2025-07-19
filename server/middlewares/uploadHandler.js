const multer = require("multer")
const path = require("path");

// profilePicture

const profileFileFilter=(req,file,cb) => {
    const allowedTypes= /jpeg|jpg|png/;
    const isAllowed  = allowedTypes.test(file.mimetype);
    if(isAllowed){
        cb(null,true);
    }
    else{
        cb(Object.assign(new Error("Ivalid file type!"), { statusCode: 400 }),false);
    }
};

const uploadProfile = multer({
    storage: multer.memoryStorage(),
    fileFilter: profileFileFilter,
})


//pdf
const documentStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/companyDocuments");
    },
    filename:(req,file,cb)=>{
        const { documentId } = req.params;
        const extension = ".pdf";
        const newFileName = `${documentId}${extension}`;
        cb(null,newFileName);
    }
})

const documentFileFilter=(req,file,cb) => {
    const allowedTypes= /pdf/;
    const isAllowed  = allowedTypes.test(file.mimetype);
    if(isAllowed){
        cb(null,true);
    }
    else{
        cb(Object.assign(new Error("Unable to send Message!!"), { statusCode: 400 }),false);
    }
};

const uploadDocument = multer({
    storage: documentStorage,
    fileFilter: documentFileFilter,
})

//Course Videos
const courseStorage = multer.diskStorage({
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

const courseFileFilter=(req,file,cb) => {
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
    storage: courseStorage,
    fileFilter: courseFileFilter,
})

module.exports = {uploadVideo, uploadProfile, uploadDocument};
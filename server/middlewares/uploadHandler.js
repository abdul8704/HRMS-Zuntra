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

// profilePicture
    const profileStorage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads/profilePictures");
        },
        filename:(req,file,cb)=>{
            const _id = req.params.userId;
            const extension = ".png";
            const newFileName = `${_id}${extension}`;
            cb(null,newFileName);
        }
    })

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
        storage: profileStorage,
        fileFilter: profileFileFilter,
    })

    module.exports = {uploadVideo, uploadProfile};
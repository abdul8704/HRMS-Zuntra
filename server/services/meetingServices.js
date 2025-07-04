const Meet = require('../models/meetings');
const ApiError = require("../errors/ApiError");

const getAllMeetings = async () => {
    const meetData = await Meet.find({});
    if(meetData)
            return meetData;
    else 
        throw new ApiError("No meetings found");    
}

module.exports = {
    getAllMeetings
}
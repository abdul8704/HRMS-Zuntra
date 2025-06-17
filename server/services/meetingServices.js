const Meet = require('../models/meetings');

const getAllMeetings = async () => {
    const meetData = await Meet.find({});
    if(meetData)
            return meetData;
    else 
        throw new Error("No meetings found");    
}

module.exports = {
    getAllMeetings
}
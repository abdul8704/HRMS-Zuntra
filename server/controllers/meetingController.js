const meetService = require('../services/meetingServices');

const getAllMeetingsData = async (req, res) => {
    const meetings = await meetService.getAllMeetings();
    if(meetings.length === 0){
        res.status(404)
        throw new Error("No meetings found");
    }
    return res.status(200).json(meetings);
};

module.exports = {
    getAllMeetingsData,
};
const ApiError = require('../errors/ApiError');
const meetService = require('../services/meetingServices');
const asyncHandler = require('express-async-handler');

const getAllMeetingsData = asyncHandler(async (req, res) => {
    const meetings = await meetService.getAllMeetings();
    if(meetings.length === 0){
        throw new ApiError(404, 'No meetings found')
    }
    return res.status(200).json(meetings);
});

module.exports = {
    getAllMeetingsData,
};
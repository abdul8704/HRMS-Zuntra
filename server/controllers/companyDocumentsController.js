// controllers/companyDoc.controller.js
const asyncHandler = require('express-async-handler');
const ApiError = require('../errors/ApiError');
const companyDocService = require('../services/companyDocumentsService');

const getAllCompanyDocuments = asyncHandler(async (req, res) => {
  const result = await companyDocService.getAllCompanyDocuments();
  if (!result || result.length === 0) {
    throw new ApiError(404, 'No company documents available');
  } else {
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

module.exports = {
  getAllCompanyDocuments,
};

// controllers/companyDoc.controller.js
const asyncHandler = require('express-async-handler');
const ApiError = require('../errors/ApiError');
const companyDocService = require('../services/companyDocumentsService');

// @desc Get all company documents
// @route GET /api/docs
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


// @desc upload a document
// @route POST /api/docs/upload/:documentId
const uploadCompanyDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded or invalid file type');
  }

  res.status(200).json({
    success: true,
    message: 'Document uploaded successfully',
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
    },
  });
});

module.exports = {
  getAllCompanyDocuments,
  uploadCompanyDocument,
};

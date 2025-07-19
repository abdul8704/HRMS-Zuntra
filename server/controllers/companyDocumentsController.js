const asyncHandler = require('express-async-handler');
const ApiError = require('../errors/ApiError');
const companyDocService = require('../services/companyDocumentsService');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

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


// @desc Add a new company document
// @route POST /api/docs/add
const addNewCompanyDocuments = asyncHandler(async (req, res) => {
  const { documentName, validUpto } = req.body;

  if (!documentName) {
    throw new ApiError(400, 'Document name is required');
  }

  const newDocument = await companyDocService.addNewCompanyDocument({
    documentName,
    validUpto,
  });

  res.status(201).json({
    success: true,
    message: 'Company document created successfully',
    data: newDocument,
  });
});

// @desc upload a document
// @route POST /api/docs/upload/:documentId/:documentName
const uploadCompanyDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded or invalid file type');
  }

  const { documentId, documentName } = req.params;
  const filePath = path.resolve(req.file.path);

  let metadataUpdated = false;

  const existingPdfBytes = fs.readFileSync(filePath);

  try {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.setTitle(documentName);
    pdfDoc.setAuthor('Your Company Name');

    const updatedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, updatedPdfBytes);

    metadataUpdated = true;
  } catch (err) {
    if (
      err.message.includes('Input document to `PDFDocument.load` is encrypted')
    ) {
      console.warn(`Encrypted PDF skipped metadata update: ${req.file.filename}`);
    } else {
      throw err;
    }
  }

  res.status(200).json({
    success: true,
    message: metadataUpdated
      ? 'Document uploaded and metadata updated successfully'
      : 'Document uploaded (metadata skipped due to encryption)',
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      metadataUpdated,
    },
  });
});


module.exports = {
  getAllCompanyDocuments,
  uploadCompanyDocument,
  addNewCompanyDocuments,
};

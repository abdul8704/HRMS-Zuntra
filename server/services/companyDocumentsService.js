const companyDocument = require('../models/companyDocuments');

// @desc Get all company documents
const getAllCompanyDocuments = async () => {
  return await companyDocument.find({},).sort({ createdAt: -1 });
};

// @desc Add a new company document
const addNewCompanyDocument = async (documentData) => {
  return await companyDocument.create(documentData);
};

// @desc Delete a company document
const deleteCompanyDocument = async (documentId) => {
  const deletedDoc = await companyDocument.findByIdAndDelete(documentId);
  return deletedDoc;
};

module.exports = {
  getAllCompanyDocuments,
  addNewCompanyDocument,
  deleteCompanyDocument, 
};


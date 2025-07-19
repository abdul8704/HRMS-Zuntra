const companyDocument = require('../models/companyDocuments');

const getAllCompanyDocuments = async () => {
  return await companyDocument.find({},).sort({ createdAt: -1 });
};

const addNewCompanyDocument = async (documentData) => {
  return await companyDocument.create(documentData);
};

module.exports = {
  getAllCompanyDocuments,
  addNewCompanyDocument,
};

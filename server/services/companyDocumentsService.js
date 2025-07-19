const companyDocument = require('../models/companyDocuments');

const getAllCompanyDocuments = async () => {
  return await companyDocument.find({}, {
    _id: 1,
    documentName: 1,
    filePath: 1,
    createdAt: 1,
    updatedAt: 1,
  }).sort({ createdAt: -1 });
};

module.exports = {
  getAllCompanyDocuments,
};

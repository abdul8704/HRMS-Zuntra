const companyDocument = require('../models/companyDocuments');

const getAllCompanyDocuments = async () => {
  return await companyDocument.find({},).sort({ createdAt: -1 });
};

module.exports = {
  getAllCompanyDocuments,
};

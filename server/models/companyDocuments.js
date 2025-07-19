const mongoose = require("mongoose");

const companyDocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  givenDate: {
    type: Date,
    required: true,
  },
  validUpto: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('companyDocument', companyDocumentSchema);

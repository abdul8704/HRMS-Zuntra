const mongoose = require("mongoose");

const companyDocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  validUpto: {
    type: Date,
    default: null,
    required: false,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('companyDocument', companyDocumentSchema);

const express = require('express');
const router = express.Router();
const { uploadDocument } = require("../middlewares/uploadHandler");
const companyDocumentsController = require('../controllers/companyDocumentsController');
const requirePermission  = require("../middlewares/requirePermission")

// public routes
router.get('/', companyDocumentsController.getAllCompanyDocuments);

// protected routes
router.post('/add', requirePermission("companyDocs"), companyDocumentsController.addNewCompanyDocuments);
router.post(
    "/upload/:documentId/:documentName",
    requirePermission("companyDocs"),
    uploadDocument.single("file"),
    companyDocumentsController.uploadCompanyDocument
);
router.delete('/:documentId', requirePermission("companyDocs"), companyDocumentsController.deleteCompanyDocument);

module.exports = router;

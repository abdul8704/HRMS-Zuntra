// routes/companyDoc.routes.js
const express = require('express');
const router = express.Router();
const { uploadDocument } = require("../middlewares/uploadHandler");
const companyDocumentsController = require('../controllers/companyDocumentsController');

router.get('/', companyDocumentsController.getAllCompanyDocuments);
router.post('/add', companyDocumentsController.addNewCompanyDocuments);
router.post('/upload/:documentId/:documentName', uploadDocument.single("file"), companyDocumentsController.uploadCompanyDocument);
module.exports = router;

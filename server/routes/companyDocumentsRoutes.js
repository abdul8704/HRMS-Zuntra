// routes/companyDoc.routes.js
const express = require('express');
const router = express.Router();
const companyDocController = require('../controllers/companyDocumentsController');

router.get('/', companyDocController.getAllCompanyDocuments);

module.exports = router;

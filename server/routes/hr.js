const userController = require('../controllers/user');
const hrController = require('../controllers/hrController');

const express = require('express');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post("/new-campus", hrController.addNewCampusLocation);

module.exports = router;

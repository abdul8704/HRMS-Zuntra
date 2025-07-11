const employeeController = require('../controllers/employeeController');
const hrController = require('../controllers/hrController');

const express = require('express');
const router = express.Router();

router.get("/", employeeController.fetchAllEmployees);
router.post("/new-campus", hrController.addNewCampusLocation);
router.get("/pending", hrController.getPendingEmployees);
router.post("/accept", hrController.acceptUser);
router.get('/leave/pending-req', hrController.getPendingLeaveReqs)
router.post('/leave/process-req', hrController.processLeaveReq)
router.get('/leave/all-req', hrController.getAllLeaveReqs)

module.exports = router;

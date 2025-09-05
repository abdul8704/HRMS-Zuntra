const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const {requirePermission} = require('../middlewares/requirePermission');

router.get('/all', requirePermission("general"), eventController.getAllEvents);
router.get('/in-range', requirePermission("general"), eventController.getEventsInRange);
router.get('/today', requirePermission("general"), eventController.getTodaysEvents);
router.get('/one/:eventId', requirePermission("general"), eventController.getEventById);

router.post('/create', requirePermission("eventManagement"), eventController.createEvent);
router.patch('/edit', requirePermission("eventManagement"), eventController.editEvent);
router.delete('/delete', requirePermission("eventManagement"), eventController.deleteEvent);

module.exports = router;
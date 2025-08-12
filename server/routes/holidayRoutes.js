const express = require('express');
const router = express.Router();
const {requirePermission} = require('../middlewares/requirePermission');
const holidayController = require('../controllers/holidayController');

router.get('/all', requirePermission("companyManagement"), holidayController.getAllHolidaysInRange);
router.get('/one/:id', requirePermission("companyManagement"), holidayController.getHolidayById);
router.get('/range', requirePermission("companyManagement"), holidayController.getHolidaysInRange);
router.post('/add', requirePermission("companyManagement"), holidayController.addHolidays);
router.patch('/update/:id', requirePermission("companyManagement"), holidayController.updateHoliday);
router.delete('/delete/:id', requirePermission("companyManagement"), holidayController.deleteHoliday);

module.exports = router;
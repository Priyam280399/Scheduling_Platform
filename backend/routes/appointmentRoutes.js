const express = require('express');
const { schedule,fetchAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/schedule', authMiddleware, schedule);
router.get('/schedule', authMiddleware, fetchAppointments);

module.exports = router;


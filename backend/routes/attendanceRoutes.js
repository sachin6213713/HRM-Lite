const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceByEmployee, getStats } = require('../controllers/attendanceController');

router.post('/', markAttendance);
router.get('/stats', getStats); // Put this before /:employeeId to avoid conflicts
router.get('/:employeeId', getAttendanceByEmployee);

module.exports = router;

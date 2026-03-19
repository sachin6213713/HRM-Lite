const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// @desc    Mark attendance
// @route   POST /api/attendance
exports.markAttendance = async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;

        // Check if employee exists
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check if already marked for this date
        const existingAttendance = await Attendance.findOne({ employeeId, date });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked for this date' });
        }

        const attendance = await Attendance.create({
            employeeId,
            date,
            status
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get attendance for employee
// @route   GET /api/attendance/:employeeId
exports.getAttendanceByEmployee = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/stats
exports.getStats = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        // Get today's attendance summary
        const today = new Date().toISOString().split('T')[0];
        const presentToday = await Attendance.countDocuments({ date: today, status: 'Present' });
        const absentToday = await Attendance.countDocuments({ date: today, status: 'Absent' });

        res.status(200).json({
            totalEmployees,
            todayStats: {
                present: presentToday,
                absent: absentToday,
                date: today
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

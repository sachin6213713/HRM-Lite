const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Employee ID is required'],
        trim: true
    },
    date: {
        type: String, // Storing as YYYY-MM-DD for easier comparison
        required: [true, 'Date is required']
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: [true, 'Status is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Composite index to prevent multiple attendance records for same employee on same day
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);

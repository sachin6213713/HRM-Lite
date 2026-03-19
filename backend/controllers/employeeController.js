const Employee = require('../models/Employee');

// @desc    Add new employee
// @route   POST /api/employees
exports.addEmployee = async (req, res) => {
    try {
        const { employeeId, fullName, email, department } = req.body;

        // Check if employeeId already exists
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        const employee = await Employee.create({
            employeeId,
            fullName,
            email,
            department
        });

        res.status(201).json(employee);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.deleteOne();
        res.status(200).json({ message: 'Employee removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

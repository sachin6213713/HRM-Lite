import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';
import { attendanceService, employeeService } from '../services/api';
import { Clock, History, AlertCircle } from 'lucide-react';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };

    const fetchAttendance = async (empId) => {
        if (!empId) return;
        setLoading(true);
        try {
            const response = await attendanceService.getByEmployee(empId);
            setAttendance(response.data);
        } catch (err) {
            console.error('Error fetching attendance:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAttendance = async (formData) => {
        setMarking(true);
        setError('');
        setSuccess('');
        try {
            await attendanceService.mark(formData);
            setSuccess('Attendance marked successfully!');
            if (formData.employeeId === selectedEmployeeId) {
                fetchAttendance(selectedEmployeeId);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error marking attendance. It Might already be marked for today.');
        } finally {
            setMarking(false);
            setTimeout(() => {
                setSuccess('');
                setError('');
            }, 5000);
        }
    };

    useEffect(() => {
        if (selectedEmployeeId) {
            fetchAttendance(selectedEmployeeId);
        } else {
            setAttendance([]);
        }
    }, [selectedEmployeeId]);

    return (
        <Layout>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Attendance Management</h1>
                <p className="text-slate-500 font-medium tracking-tight">Keep track of daily presence and history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <AttendanceForm onMark={handleMarkAttendance} employees={employees} />

                    {success && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <p className="text-sm font-semibold">{success}</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-900 rounded-lg text-white">
                                    <History size={18} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Attendance History</h2>
                            </div>

                            <div className="w-full md:w-64">
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                >
                                    <option value="">Select Employee to View</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp.employeeId}>
                                            {emp.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {selectedEmployeeId ? (
                            <AttendanceList attendance={attendance} loading={loading} />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Select an Employee</h3>
                                <p className="text-slate-500 text-sm max-w-xs">Select an employee from the dropdown above to view their detailed attendance history.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Attendance;

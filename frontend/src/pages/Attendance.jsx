import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';
import { attendanceService, employeeService } from '../services/api';
import { Clock, History, Search, Filter } from 'lucide-react';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    const filteredAttendance = attendance.filter(record => {
        if (!startDate && !endDate) return true;
        const d = new Date(record.date);
        const s = startDate ? new Date(startDate) : null;
        const e = endDate ? new Date(endDate) : null;
        if (s && d < s) return false;
        if (e && d > e) return false;
        return true;
    });

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
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 mb-1">Attendance</h1>
                <p className="text-slate-400 text-[15px] font-medium tracking-tight">Track and monitor daily employee presence.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-6">
                    <AttendanceForm onMark={handleMarkAttendance} employees={employees} />

                    {success && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-bold">{success}</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {/* Employee Records Filter Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100/50">
                        <div className="flex items-center gap-3 mb-8">
                            <Search size={18} className="text-slate-400" />
                            <h2 className="text-lg font-black text-slate-800">Employee Records</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1">Select Employee</label>
                                <select
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-medium text-slate-600 appearance-none"
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                >
                                    <option value="">Choose an employee...</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp.employeeId}>
                                            {emp.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-medium text-slate-400"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1">End Date</label>
                                <input
                                    type="date"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-medium text-slate-400"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Attendance History Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100/50 min-h-[420px] flex flex-col">
                        {selectedEmployeeId ? (
                            <>
                                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-50">
                                    <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
                                        <History size={18} />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-800">Attendance History</h2>
                                </div>
                                <AttendanceList attendance={filteredAttendance} loading={loading} />
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                                <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6 border border-slate-100/50">
                                    <Filter size={42} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Select an employee</h3>
                                <p className="text-slate-400 text-sm font-medium max-w-[280px] leading-relaxed">
                                    Choose an employee from the dropdown above to view their attendance history.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Attendance;

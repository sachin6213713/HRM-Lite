import React, { useState } from 'react';
import { Calendar, User, CheckCircle2, XCircle } from 'lucide-react';

const AttendanceForm = ({ onMark, employees }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onMark(formData);
    };

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mark Attendance</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                        <User size={16} /> Employee
                    </label>
                    <select
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp.employeeId}>
                                {emp.fullName} ({emp.employeeId})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                        <Calendar size={16} /> Date
                    </label>
                    <input
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                        Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Present' })}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-semibold ${formData.status === 'Present'
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-slate-100 bg-slate-50 text-slate-400 opacity-60'
                                }`}
                        >
                            <CheckCircle2 size={18} /> Present
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Absent' })}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-semibold ${formData.status === 'Absent'
                                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                                    : 'border-slate-100 bg-slate-50 text-slate-400 opacity-60'
                                }`}
                        >
                            <XCircle size={18} /> Absent
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all shadow-lg mt-4"
                >
                    Submit Attendance
                </button>
            </form>
        </div>
    );
};

export default AttendanceForm;

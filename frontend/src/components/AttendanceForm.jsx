import React, { useState } from 'react';
import { Calendar as CalendarIcon, User, CheckCircle2, XCircle, CheckCircle } from 'lucide-react';

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

    const inputClasses = "w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-[13px] font-medium placeholder:text-slate-300";
    const labelClasses = "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1";

    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100/50">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <CalendarIcon size={18} />
                </div>
                <h2 className="text-lg font-black text-slate-800">Mark Attendance</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={labelClasses}>Employee</label>
                    <div className="relative group">
                        <select
                            required
                            className={`${inputClasses} appearance-none cursor-pointer pr-12`}
                            value={formData.employeeId}
                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        >
                            <option value="">Select an employee...</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp.employeeId}>
                                    {emp.fullName}
                                </option>
                            ))}
                        </select>
                        <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Date</label>
                    <div className="relative group">
                        <input
                            type="date"
                            required
                            className={inputClasses}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Status</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Present' })}
                            className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all group ${formData.status === 'Present'
                                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-600'
                                : 'border-slate-50 bg-white text-slate-300 hover:border-slate-100'
                                }`}
                        >
                            <div className={`p-2 rounded-full border-2 transition-transform duration-300 group-hover:scale-110 ${formData.status === 'Present' ? 'border-emerald-500/20' : 'border-transparent'}`}>
                                <CheckCircle2 size={24} className={formData.status === 'Present' ? 'text-emerald-500' : 'text-slate-200'} />
                            </div>
                            <span className="text-xs font-bold">Present</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Absent' })}
                            className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all group ${formData.status === 'Absent'
                                ? 'border-rose-500 bg-rose-50/50 text-rose-600'
                                : 'border-slate-50 bg-white text-slate-300 hover:border-slate-100'
                                }`}
                        >
                            <div className={`p-2 rounded-full border-2 transition-transform duration-300 group-hover:scale-110 ${formData.status === 'Absent' ? 'border-rose-500/20' : 'border-transparent'}`}>
                                <XCircle size={24} className={formData.status === 'Absent' ? 'text-rose-500' : 'text-slate-200'} />
                            </div>
                            <span className="text-xs font-bold">Absent</span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-100 group"
                >
                    <CheckCircle className="transition-transform group-hover:scale-110" size={18} />
                    <span>Submit Record</span>
                </button>
            </form>
        </div>
    );
};

export default AttendanceForm;

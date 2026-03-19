import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const EmployeeForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        email: '',
        department: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Add New Employee</h2>
                <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employee ID</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="e.g. EMP101"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                    <select
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                    </select>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                    >
                        Add Employee
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;

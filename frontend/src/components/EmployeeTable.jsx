import React from 'react';
import { Trash2 } from 'lucide-react';

const EmployeeTable = ({ employees, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center p-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No employees found. Start by adding one!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-4">Employee ID</th>
                            <th className="px-6 py-4">Full Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {employees.map((employee) => (
                            <tr key={employee._id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-sm">{employee.employeeId}</td>
                                <td className="px-6 py-4 font-medium">{employee.fullName}</td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onDelete(employee._id)}
                                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;

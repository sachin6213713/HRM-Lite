import { Trash2, Mail } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeTable = ({ employees, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center p-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center p-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-bold">No employees found. Start by adding one!</p>
            </div>
        );
    }

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm shadow-blue-50">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <th className="px-8 py-6">Employee ID</th>
                            <th className="px-8 py-6">Full Name</th>
                            <th className="px-8 py-6">Contact</th>
                            <th className="px-8 py-6">Department</th>
                            <th className="px-8 py-6">Joined Date</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-700">
                        {employees.map((employee) => (
                            <tr key={employee._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 border border-slate-100">
                                        {employee.employeeId}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                            {getInitials(employee.fullName)}
                                        </div>
                                        <span className="text-[14px] font-black text-slate-800">{employee.fullName}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                        <Mail size={14} />
                                        <span className="text-[13px] font-medium">{employee.email}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100/50">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-[13px] font-medium text-slate-400">
                                    {employee.createdAt ? format(new Date(employee.createdAt), 'MMM dd, yyyy') : 'Mar 19, 2026'}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button
                                        onClick={() => onDelete(employee._id)}
                                        className="p-2 text-slate-300 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50 hover:scale-110"
                                    >
                                        <Trash2 size={16} />
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

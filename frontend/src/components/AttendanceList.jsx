import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';

const AttendanceList = ({ attendance, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (attendance.length === 0) {
        return (
            <div className="text-center p-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No attendance records found for this employee.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {attendance.map((record) => (
                <div
                    key={record._id}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${record.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {record.status === 'Present' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900">{format(new Date(record.date), 'MMMM dd, yyyy')}</p>
                            <p className="text-xs text-slate-500 font-medium">Status: {record.status}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {record.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AttendanceList;

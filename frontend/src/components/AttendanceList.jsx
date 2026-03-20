import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Calendar } from 'lucide-react';

const AttendanceList = ({ attendance, loading }) => {
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-20 bg-white rounded-3xl">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (attendance.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">No attendance records found for this employee.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {attendance.map((record) => (
                <div
                    key={record._id}
                    className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/10 transition-all group"
                >
                    <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${record.status === 'Present' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'} group-hover:scale-110 transition-transform`}>
                            {record.status === 'Present' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={12} className="text-slate-300" />
                                <p className="text-sm font-black text-slate-800">{format(new Date(record.date), 'MMMM dd, yyyy')}</p>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Status: <span className={record.status === 'Present' ? 'text-emerald-500' : 'text-rose-500'}>{record.status}</span></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg border ${record.status === 'Present'
                            ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100'
                            : 'bg-rose-50/50 text-rose-600 border-rose-100'
                            }`}>
                            {record.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AttendanceList;

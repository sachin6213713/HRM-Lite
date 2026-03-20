import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { attendanceService } from '../services/api';
import { Users, UserCheck, UserX, Building2, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        todayStats: { present: 0, absent: 0, date: '' }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await attendanceService.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Total Employees',
            value: stats.totalEmployees,
            icon: <Users size={20} className="text-blue-600" />,
            bg: 'bg-blue-50',
            trend: 'Active',
            trendColor: 'text-emerald-500'
        },
        {
            label: 'Present Today',
            value: stats.todayStats.present,
            icon: <UserCheck size={20} className="text-emerald-600" />,
            bg: 'bg-emerald-50',
            trend: '0% attendance',
            trendColor: 'text-slate-400'
        },
        {
            label: 'Absent Today',
            value: stats.todayStats.absent,
            icon: <UserX size={20} className="text-rose-600" />,
            bg: 'bg-rose-50',
            trend: 'employees',
            trendColor: 'text-slate-400'
        },
    ];

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Overview</h1>
                <p className="text-slate-400 text-[15px] font-medium tracking-tight">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-3.5 rounded-2xl ${card.bg}`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{card.label}</p>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-3xl font-black text-slate-900 leading-none">{card.value}</h3>
                                    <span className={`text-[10px] font-bold ${card.trendColor} mb-1 flex items-center gap-1`}>
                                        {card.trend === 'Active' && <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>}
                                        {card.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${card.bg} rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500`}></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Department Breakdown */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                        <h3 className="text-xl font-bold text-slate-800">Department Breakdown</h3>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <Building2 size={18} />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                            <Building2 size={32} className="text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-bold text-sm">No department data available</p>
                    </div>
                </div>

                {/* Quick Actions & Status */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Manage Employees', sub: 'Add or remove staff', icon: <Users size={18} />, color: 'bg-blue-50 text-blue-600', to: '/employees' },
                                { label: 'Mark Attendance', sub: 'Record daily status', icon: <Calendar size={18} />, color: 'bg-indigo-50 text-indigo-600', to: '/attendance' }
                            ].map((action, i) => (
                                <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                                    <div className={`p-3 rounded-xl ${action.color}`}>
                                        {action.icon}
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 truncate">{action.label}</p>
                                        <p className="text-[11px] text-slate-400 font-medium truncate">{action.sub}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0e1217] rounded-3xl p-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">System Status</p>
                            <h3 className="text-lg font-bold text-white mb-6">All services operational</h3>

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full w-fit">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                <span className="text-[11px] font-bold text-emerald-500">Syncing in real-time</span>
                            </div>
                        </div>

                        <div className="absolute top-1/2 -translate-y-1/2 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Building2 size={120} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

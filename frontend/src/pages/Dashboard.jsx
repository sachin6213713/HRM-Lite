import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { attendanceService } from '../services/api';
import { Users, CheckCircle, XCircle, BarChart3, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
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
            icon: <Users className="text-blue-600" />,
            bg: 'bg-blue-50',
            description: 'Active records in system'
        },
        {
            label: 'Present Today',
            value: stats.todayStats.present,
            icon: <CheckCircle className="text-emerald-600" />,
            bg: 'bg-emerald-50',
            description: format(new Date(), 'MMMM dd, yyyy')
        },
        {
            label: 'Absent Today',
            value: stats.todayStats.absent,
            icon: <XCircle className="text-rose-600" />,
            bg: 'bg-rose-50',
            description: 'Requires follow-up'
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
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back, Admin</h1>
                <p className="text-slate-500 font-medium tracking-tight">Here's what's happening at <span className="text-indigo-600">HRMS Lite</span> today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <TrendingUp size={16} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">{card.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">{card.value}</h3>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <CalendarIcon size={12} />
                            <span>{card.description}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 size={20} className="text-indigo-300" />
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Quick Insight</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 leading-tight">Attendance Rate is at <span className="text-emerald-400">92%</span> this week.</h3>
                        <p className="text-indigo-200 text-sm mb-6 leading-relaxed max-w-xs">Management is pleased with the consistent attendance levels across all departments.</p>
                        <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors shadow-lg">View Detailed Report</button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-700/30 rounded-full blur-3xl"></div>
                    <div className="absolute -right-20 top-20 w-32 h-32 bg-indigo-500/10 rounded-full"></div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Today's Tip</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">"Employee engagement is the art and science of engaging people in authentic and recognized connections to strategy and social purpose."</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 leading-none mb-1">Weekly Review</p>
                            <p className="text-xs text-slate-400 font-medium">Scheduled for Friday, 4:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

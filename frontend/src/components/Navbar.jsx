import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, Terminal } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/employees', icon: <Users size={20} />, label: 'Employees' },
        { to: '/attendance', icon: <Clock size={20} />, label: 'Attendance' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 p-6 z-50">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                    <Terminal size={24} />
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">HRMS <span className="text-indigo-600">Lite</span></h1>
            </div>

            <div className="space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
                <div className="p-4 bg-slate-900 rounded-2xl text-white">
                    <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <p className="text-sm font-semibold">System Online</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

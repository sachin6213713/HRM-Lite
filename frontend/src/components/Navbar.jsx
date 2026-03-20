import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, Building2, LogOut } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/employees', icon: <Users size={20} />, label: 'Employees' },
        { to: '/attendance', icon: <Clock size={20} />, label: 'Attendance' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-full w-68 bg-white border-r border-slate-100 flex flex-col z-50">
            {/* Logo Section */}
            <div className="p-6 mb-2">
                <div className="flex items-center gap-3 px-2">
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-100">
                        <Building2 size={22} />
                    </div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">HRMS Lite</h1>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-4 space-y-6">
                <div>
                    <h2 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</h2>
                    <div className="space-y-1.5">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                                <span className="text-[14px] font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="p-4 mt-auto border-t border-slate-50">
                <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner group-hover:scale-105 transition-transform">
                            AD
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">Admin User</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate">admin@hrms.local</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

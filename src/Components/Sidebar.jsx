import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, School, Banknote, CalendarCheck, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { title: 'User Management', path: '/UserManagement', icon: <Users size={20} /> },
        { title: 'Classes', path: '/classmateManagement', icon: <School size={20} /> },
        { title: 'Fees', path: '/FeeManagement', icon: <Banknote size={20} /> },
        { title: 'Exams', path: '/exams', icon: <CalendarCheck size={20} /> },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 shadow-lg z-50">
            <div className="p-6 border-b border-slate-700 flex items-center justify-center">
                <h1 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">AdminPanel</h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-3">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

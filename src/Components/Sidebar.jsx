
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, GraduationCap, School, Banknote,
    CalendarCheck, Settings, LogOut, ChevronDown, ChevronRight,
    UserCog, Building2, UsersRound, FileText, CreditCard, Key, ClipboardList,
    ShieldCheck, Bell, Activity, UserPlus, Shield, Mail, Calendar // Added UserPlus, Shield, Mail, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    // Initialize with the top-level group managed expanded
    const [expandedGroups, setExpandedGroups] = useState(['finance']);

    const toggleGroup = (groupId) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId) // Collapse if already expanded
                : [...prev, groupId] // Expand if collapsed
        );
    };

    const isActive = (path) => location.pathname === path;

    // Helper to check if any child of a group is active
    const isGroupActive = (item) => {
        if (item.path && isActive(item.path)) return true;
        if (item.subMenus) {
            return item.subMenus.some(subItem => isGroupActive(subItem));
        }
        return false;
    };

    const menuGroups = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/',
            type: 'single'
        },
        {
            id: 'principals',
            title: 'Principals',
            icon: UserPlus, // Using UserPlus as a placeholder, or maybe Shield
            type: 'group',
            subMenus: [
                { title: 'Directory', path: '/PrincipalManagement', icon: Users },
                { title: 'Permissions', path: '/principals/permissions', icon: Shield },
                { title: 'Reports Access', path: '/principals/reports', icon: FileText },
                { title: 'Performance', path: '/principals/performance', icon: Activity },
                { title: 'Communication', path: '/principals/communication', icon: Mail },
            ]
        },
        {
            id: 'teachers',
            title: 'Teachers',
            icon: UserCog,
            type: 'group',
            subMenus: [
                { title: 'Directory', path: '/TeacherManagement', icon: Users },
                { title: 'Timetable', path: '/teachers/timetable', icon: CalendarCheck },
                { title: 'Attendance', path: '/teachers/attendance', icon: ClipboardList },
                { title: 'Leaves', path: '/teachers/leaves', icon: Calendar }, // Changed icon from FileText to Calendar
                { title: 'Credentials', path: '/teachers/credentials', icon: Key },
            ]
        },
        {
            id: 'students',
            title: 'Students',
            icon: GraduationCap,
            type: 'group',
            subMenus: [
                { title: 'Directory', path: '/StudentManagement', icon: Users },
                { title: 'Attendance', path: '/students/attendance', icon: CalendarCheck },
                { title: 'Promotion', path: '/students/promotion', icon: ChevronRight },
                { title: 'Documents', path: '/students/documents', icon: FileText },
                { title: 'ID Cards', path: '/students/id-cards', icon: CreditCard },
                { title: 'Credentials', path: '/students/credentials', icon: Key },
            ]
        },
        {
            id: 'parents',
            title: 'Parents',
            icon: UsersRound,
            type: 'group',
            subMenus: [
                { title: 'Directory', path: '/ParentManagement', icon: Users },
                { title: 'Login Control', path: '/parents/login-control', icon: Key },
                { title: 'Notifications', path: '/parents/notifications', icon: Bell },
                { title: 'Activity Log', path: '/parents/activity', icon: Activity },
            ]
        },
        {
            id: 'admissions',
            title: 'Admissions',
            icon: UserPlus,
            type: 'group',
            subMenus: [
                { title: 'Dashboard', path: '/AdmissionManagement', icon: LayoutDashboard },
                { title: 'Applications', path: '/admissions/applications', icon: ClipboardList },
                { title: 'Forms', path: '/admissions/forms', icon: FileText },
            ]
        },
        {
            id: 'academic',
            title: 'Academic',
            icon: School,
            type: 'group',
            subMenus: [
                { title: 'Classes', path: '/classmateManagement', icon: Building2 },
                { title: 'Exams', path: '/exams', icon: ClipboardList },
            ]
        },
        {
            id: 'finance',
            title: 'Finance',
            icon: Banknote,
            type: 'group',
            subMenus: [
                { title: 'Fee Management', path: '/FeeManagement', icon: Banknote },
                { title: 'Salary Management', path: '/SalaryManagement', icon: CreditCard },
            ]
        },
    ];

    // Recursive render function for menu items
    const renderMenuItem = (item, level = 0) => {
        // Level 0 = Top Level, Level 1 = Inside Group, Level 2 = Nested Group

        // Case 1: Simple Link Item
        if (!item.subMenus) {
            const active = isActive(item.path);
            return (
                <li key={item.path || item.title}>
                    <Link
                        to={item.path}
                        className={`flex items-center gap-4 rounded-lg transition-all duration-200
              ${level === 0 ? 'px-4 py-3' : 'px-4 py-2 text-sm'}
              ${level > 0 ? 'ml-0' : ''}
              ${active
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                            } `}
                    >
                        <item.icon size={level === 0 ? 20 : 16} />
                        <span className="font-medium">{item.title}</span>
                    </Link>
                </li>
            );
        }

        // Case 2: Group Item (Collapsible)
        const isExpanded = expandedGroups.includes(item.id);
        const hasActiveChild = isGroupActive(item);
        const GroupIcon = item.icon;

        return (
            <li key={item.id}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(item.id);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl transition-all duration-200
            ${level === 0 ? 'px-4 py-3' : 'px-4 py-2 text-sm'}
            ${(hasActiveChild || isExpanded) && level === 0 ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}
            ${level > 0 && isExpanded ? 'text-blue-600' : ''}
`}
                >
                    <div className="flex items-center gap-3">
                        <GroupIcon size={level === 0 ? 20 : 16} />
                        <span className="font-medium">{item.title}</span>
                    </div>
                    {isExpanded ? (
                        <ChevronDown size={14} className="opacity-70" />
                    ) : (
                        <ChevronRight size={14} className="opacity-70" />
                    )}
                </button>

                {/* Render Children */}
                {isExpanded && (
                    <ul className={`mt-1 space-y-1 ${level === 0 ? 'ml-4 border-l border-slate-200 pl-2' : 'ml-4 border-l border-slate-200 pl-2'} `}>
                        {item.subMenus.map(subItem => renderMenuItem(subItem, level + 1))}
                    </ul>
                )}
            </li>
        );
    };



    return (
        < motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: "easeInOut", stiffness: 80 }}

            className={`h-screen w-72 bg-white flex flex-col fixed left-0 top-0 shadow-lg z-50 transition-transform duration-300 border-r border-slate-200 rounded-r-3xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <GraduationCap size={24} strokeWidth={3} />
                    </div>
                    <div >
                        <h1 className="text-xl font-bold text-slate-800 leading-none"></h1>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">School Admin</p>
                    </div>
                </div>
                <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
                    {/* Close button for mobile if needed, or just reuse toggle */}
                    <ChevronRight className="rotate-180" size={24} />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {menuGroups.map(group => renderMenuItem(group, 0))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;

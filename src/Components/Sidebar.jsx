
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, GraduationCap, School, Banknote,
    CalendarCheck, Settings, LogOut, ChevronDown, ChevronRight,
    UserCog, Building2, UsersRound, FileText, CreditCard, Key, ClipboardList,
    ShieldCheck, Bell, Activity, UserPlus, Shield, Mail, Calendar // Added UserPlus, Shield, Mail, Calendar
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    // Initialize with the top-level group managed expanded
    const [expandedGroups, setExpandedGroups] = useState(['user_management']);

    const toggleGroup = (groupId) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
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
            id: 'user_management',
            title: 'User Management',
            icon: UserCog,
            type: 'group',
            subMenus: [
                // {
                //     title: 'System Users',
                //     path: '/UserManagement',
                //     icon: ShieldCheck
                // },
                {
                    id: 'teacher_nested',
                    title: 'Teacher Management',
                    icon: UserCog,
                    type: 'nested_group',
                    subMenus: [
                        { title: 'Directory', path: '/TeacherManagement', icon: Users },
                        { title: 'Timetable', path: '/teachers/timetable', icon: CalendarCheck },
                        { title: 'Attendance', path: '/teachers/attendance', icon: ClipboardList },
                        { title: 'Leaves', path: '/teachers/leaves', icon: Calendar }, // Changed icon from FileText to Calendar
                        { title: 'Credentials', path: '/teachers/credentials', icon: Key },
                    ]
                },
                {
                    id: 'principal_nested',
                    title: 'Principal Management',
                    icon: UserPlus, // Using UserPlus as a placeholder, or maybe Shield
                    type: 'nested_group',
                    subMenus: [
                        { title: 'Directory', path: '/PrincipalManagement', icon: Users },
                        { title: 'Permissions', path: '/principals/permissions', icon: Shield },
                        { title: 'Reports Access', path: '/principals/reports', icon: FileText },
                        { title: 'Performance', path: '/principals/performance', icon: Activity },
                        { title: 'Communication', path: '/principals/communication', icon: Mail },
                    ]
                },
                {
                    id: 'parent_nested',
                    title: 'Parent Management',
                    icon: UsersRound,
                    type: 'nested_group',
                    subMenus: [
                        { title: 'Directory', path: '/ParentManagement', icon: Users },
                        { title: 'Login Control', path: '/parents/login-control', icon: Key },
                        { title: 'Notifications', path: '/parents/notifications', icon: Bell },
                        { title: 'Activity Log', path: '/parents/activity', icon: Activity },
                    ]
                },
                {
                    id: 'students_nested',
                    title: 'Student Management',
                    icon: GraduationCap,
                    type: 'nested_group',
                    subMenus: [
                        { title: 'Directory', path: '/StudentManagement', icon: Users },
                        { title: 'Attendance', path: '/students/attendance', icon: CalendarCheck },
                        { title: 'Promotion', path: '/students/promotion', icon: ChevronRight },
                        { title: 'Documents', path: '/students/documents', icon: FileText },
                        { title: 'ID Cards', path: '/students/id-cards', icon: CreditCard },
                        { title: 'Credentials', path: '/students/credentials', icon: Key },
                    ]
                }
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
                        className={`flex items - center gap - 3 rounded - lg transition - all duration - 200
              ${level === 0 ? 'px-4 py-3' : 'px-4 py-2 text-sm'}
              ${level > 0 ? 'ml-0' : ''}
              ${active
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
                    className={`w - full flex items - center justify - between rounded - xl transition - all duration - 200
            ${level === 0 ? 'px-4 py-3' : 'px-4 py-2 text-sm'}
            ${(hasActiveChild || isExpanded) && level === 0 ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            ${level > 0 && isExpanded ? 'text-white' : ''}
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
                    <ul className={`mt - 1 space - y - 1 ${level === 0 ? 'ml-4 border-l border-slate-700 pl-2' : 'ml-4 border-l border-slate-700 pl-2'} `}>
                        {item.subMenus.map(subItem => renderMenuItem(subItem, level + 1))}
                    </ul>
                )}
            </li>
        );
    };



    return (
        <div className={`h-screen w-72 bg-slate-900 text-white flex flex-col fixed left-0 top-0 shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">
                    AdminPanel
                </h1>
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

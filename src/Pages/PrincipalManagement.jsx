import React, { useState } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, User, UserPlus,
    Shield, FileText, Activity, Mail, Check, X,
    Lock, Eye, BarChart2, MessageSquare, Send, Clock
} from 'lucide-react';
import Toast from '../Components/Toast';

const PrincipalManagement = ({ view = 'directory' }) => {
    const [principals, setPrincipals] = useState([
        {
            id: 1, name: 'Dr. Alan Grant', email: 'alan.grant@school.com',
            role: 'Principal', status: 'Active',
            permissions: { teachers: true, financials: true, curriculum: true, settings: true }
        },
        {
            id: 2, name: 'Ellie Sattler', email: 'ellie.s@school.com',
            role: 'Vice Principal', status: 'Active',
            permissions: { teachers: true, financials: false, curriculum: true, settings: false }
        }
    ]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const renderView = () => {
        switch (view) {
            case 'directory': return <PrincipalDirectory principals={principals} setPrincipals={setPrincipals} showToast={showToast} />;
            case 'permissions': return <PrincipalPermissions principals={principals} setPrincipals={setPrincipals} showToast={showToast} />;
            case 'reports': return <PrincipalReports showToast={showToast} />;
            case 'performance': return <TeacherPerformance showToast={showToast} />;
            case 'communication': return <PrincipalCommunication showToast={showToast} />;
            default: return <PrincipalDirectory principals={principals} setPrincipals={setPrincipals} showToast={showToast} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {view === 'directory' && 'Principal Directory'}
                    {view === 'permissions' && 'System Permissions'}
                    {view === 'reports' && 'Reports Access'}
                    {view === 'performance' && 'Teacher Performance Monitor'}
                    {view === 'communication' && 'Communication Hub'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {view === 'directory' && 'Manage principal and vice-principal accounts'}
                    {view === 'permissions' && 'Configure system access levels and permissions'}
                    {view === 'reports' && 'View and download administrative reports'}
                    {view === 'performance' && 'Track and analyze teacher performance metrics'}
                    {view === 'communication' && 'Internal messaging and announcements'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

/* --- Sub-Components --- */

const PrincipalDirectory = ({ principals, setPrincipals, showToast }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPrincipal, setNewPrincipal] = useState({ name: '', email: '', role: 'Vice Principal' });

    const handleAdd = () => {
        if (!newPrincipal.name || !newPrincipal.email) {
            showToast('Please fill required fields', 'error');
            return;
        }
        setPrincipals([...principals, {
            id: principals.length + 1,
            ...newPrincipal,
            status: 'Active',
            permissions: { teachers: true, financials: false, curriculum: true, settings: false }
        }]);
        setIsModalOpen(false);
        setNewPrincipal({ name: '', email: '', role: 'Vice Principal' });
        showToast('Account created successfully');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-96">
                    <Search className="text-slate-500" size={18} />
                    <input type="text" placeholder="Search principals..." className="bg-transparent border-none outline-none text-sm w-full" />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} /> Add Account
                </button>
            </div>
            <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {principals.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${p.role === 'Principal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {p.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">{p.email}</td>
                            <td className="px-6 py-4 text-emerald-600 font-medium">Active</td>
                            <td className="px-6 py-4 text-center flex justify-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Create Account</h2>
                        <div className="space-y-4">
                            <input className="w-full border p-2 rounded-lg" placeholder="Name" value={newPrincipal.name} onChange={e => setNewPrincipal({ ...newPrincipal, name: e.target.value })} />
                            <input className="w-full border p-2 rounded-lg" placeholder="Email" value={newPrincipal.email} onChange={e => setNewPrincipal({ ...newPrincipal, email: e.target.value })} />
                            <select className="w-full border p-2 rounded-lg" value={newPrincipal.role} onChange={e => setNewPrincipal({ ...newPrincipal, role: e.target.value })}>
                                <option>Principal</option>
                                <option>Vice Principal</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const PrincipalPermissions = ({ principals, setPrincipals, showToast }) => {
    const togglePermission = (id, key) => {
        setPrincipals(principals.map(p =>
            p.id === id ? { ...p, permissions: { ...p.permissions, [key]: !p.permissions[key] } } : p
        ));
        showToast('Permissions updated');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4 text-center">Manage Teachers</th>
                        <th className="px-6 py-4 text-center">View Financials</th>
                        <th className="px-6 py-4 text-center">Edit Curriculum</th>
                        <th className="px-6 py-4 text-center">System Settings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {principals.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{p.name} <br /><span className="text-xs text-slate-500 font-normal">{p.role}</span></td>
                            {['teachers', 'financials', 'curriculum', 'settings'].map(key => (
                                <td key={key} className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => togglePermission(p.id, key)}
                                        className={`w-10 h-6 rounded-full transition-colors relative ${p.permissions[key] ? 'bg-blue-600' : 'bg-slate-200'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${p.permissions[key] ? 'translate-x-4' : ''}`} />
                                    </button>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PrincipalReports = ({ showToast }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: 'Student Enrollment', date: 'Feb 2026', type: 'PDF' },
                { title: 'Financial Summary', date: 'Jan 2026', type: 'Excel' },
                { title: 'Staff Attendance', date: 'Weekly', type: 'PDF' },
                { title: 'Academic Performance', date: 'Term 1', type: 'PDF' },
                { title: 'Infrastructure Audit', date: 'Annual', type: 'Docx' }
            ].map((report, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BarChart2 size={24} /></div>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{report.type}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">Generated: {report.date}</p>
                    <button onClick={() => showToast(`Downloading ${report.title}...`)} className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                        Download Report
                    </button>
                </div>
            ))}
        </div>
    );
};

const TeacherPerformance = () => {
    const teachers = [
        { name: 'Sarah Wilson', subject: 'Math', rating: 4.8, passRate: 92, attendance: 98 },
        { name: 'James Anderson', subject: 'Physics', rating: 4.5, passRate: 88, attendance: 95 },
        { name: 'Emily Davis', subject: 'English', rating: 4.9, passRate: 95, attendance: 99 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Teacher</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Parent Rating</th>
                        <th className="px-6 py-4">Student Pass Rate</th>
                        <th className="px-6 py-4">Attendance</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {teachers.map((t, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                            <td className="px-6 py-4">{t.subject}</td>
                            <td className="px-6 py-4 flex items-center gap-1 font-bold text-slate-700">
                                <span className="text-amber-500">★</span> {t.rating}
                            </td>
                            <td className="px-6 py-4">
                                <div className="w-full bg-slate-100 rounded-full h-2 w-24">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${t.passRate}%` }}></div>
                                </div>
                                <span className="text-xs text-slate-500 mt-1 block">{t.passRate}%</span>
                            </td>
                            <td className="px-6 py-4">{t.attendance}%</td>
                            <td className="px-6 py-4">
                                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium">Excellent</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PrincipalCommunication = ({ showToast }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message) return;
        showToast('Message sent to all staff', 'success');
        setMessage('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Mail size={20} className="text-blue-600" /> New Broadcast</h3>
                <div className="space-y-4">
                    <select className="w-full p-2 border rounded-lg bg-slate-50">
                        <option>All Staff</option>
                        <option>Teachers Only</option>
                        <option>Support Stuff</option>
                    </select>
                    <textarea
                        className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Write your message here..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                        <button onClick={handleSend} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                            <Send size={18} /> Send Message
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock size={20} className="text-slate-500" /> Recent Messages</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="border-b last:border-0 pb-3 last:pb-0">
                            <h4 className="font-medium text-slate-900">Staff Meeting Reminder</h4>
                            <p className="text-sm text-slate-500 mt-1 truncate">Please gather in the main hall at 2 PM...</p>
                            <span className="text-xs text-slate-400 mt-2 block">2 hours ago • To All Staff</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrincipalManagement;

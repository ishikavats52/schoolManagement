import React, { useState } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, Eye, User, Users,
    Key, Bell, Activity, Link as LinkIcon, Unlink, Send, X, Check,
    Shield, AlertCircle, Clock, Calendar
} from 'lucide-react';
import Toast from '../Components/Toast';

const ParentManagement = ({ view = 'directory' }) => {
    const [parents, setParents] = useState([
        {
            id: 1, parentId: 'PAR001', name: 'Robert Johnson', email: 'robert.j@parent.com',
            phone: '+1234567890', relationship: 'Father', status: 'Active',
            hasLogin: true, username: 'robert.j', linkedStudents: 1,
            children: [{ name: 'Alice Johnson', class: '10-A' }]
        },
        {
            id: 2, parentId: 'PAR002', name: 'Mary Smith', email: 'mary.s@parent.com',
            phone: '+1234567891', relationship: 'Mother', status: 'Active',
            hasLogin: true, username: 'mary.s', linkedStudents: 1,
            children: [{ name: 'Bob Smith', class: '10-B' }]
        }
    ]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const renderView = () => {
        switch (view) {
            case 'directory': return <ParentDirectory parents={parents} setParents={setParents} showToast={showToast} />;
            case 'login': return <ParentLoginControl parents={parents} setParents={setParents} showToast={showToast} />;
            case 'notifications': return <ParentNotifications parents={parents} showToast={showToast} />;
            case 'activity': return <ParentActivity parents={parents} />;
            default: return <ParentDirectory parents={parents} setParents={setParents} showToast={showToast} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {view === 'directory' && 'Parent Directory'}
                    {view === 'login' && 'Parent Login Control'}
                    {view === 'notifications' && 'Communication Center'}
                    {view === 'activity' && 'Parent Activity Log'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {view === 'directory' && 'Manage parent accounts and student linkages'}
                    {view === 'login' && 'Manage parent access and credentials'}
                    {view === 'notifications' && 'Send alerts and messages to parents'}
                    {view === 'activity' && 'Monitor parent interactions and logins'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

/* --- Sub-Components --- */

const ParentDirectory = ({ parents, setParents, showToast }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingParent, setEditingParent] = useState(null);
    const [newParent, setNewParent] = useState({
        name: '', email: '', password: '', phone: '', relationship: 'Father', linkedStudents: 0
    });

    const filteredParents = parents.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddParent = () => {
        if (!newParent.name || !newParent.email) {
            showToast('Please fill in required fields', 'error');
            return;
        }

        if (editingParent) {
            setParents(parents.map(p => p.id === editingParent.id ? { ...p, ...newParent } : p));
            showToast('Parent updated successfully!');
        } else {
            const parent = {
                id: parents.length + 1,
                parentId: `PAR00${parents.length + 1}`,
                ...newParent,
                status: 'Active',
                hasLogin: false,
                username: '',
                children: []
            };
            setParents([...parents, parent]);
            showToast('Parent added successfully!');
        }
        setIsModalOpen(false);
        setNewParent({ name: '', email: '', password: 'password', phone: '', relationship: 'Father', linkedStudents: 0 });
        setEditingParent(null);
    };

    const handleEdit = (parent) => {
        setEditingParent(parent);
        setNewParent({
            name: parent.name,
            email: parent.email,
            phone: parent.phone,
            relationship: parent.relationship,
            linkedStudents: parent.linkedStudents || 0
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this parent?')) {
            setParents(parents.filter(p => p.id !== id));
            showToast('Parent deleted successfully');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full md:w-96">
                    <Search className="text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search parents..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                    <Plus size={20} /> Add Parent
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Linked Students</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredParents.map((parent) => (
                            <tr key={parent.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{parent.parentId}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                            {parent.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{parent.name}</p>
                                            <p className="text-xs text-slate-500">{parent.relationship}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs">
                                        <p>{parent.email}</p>
                                        <p className="text-slate-500">{parent.phone}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {parent.children.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            {parent.children.map((child, idx) => (
                                                <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs w-fit">
                                                    {child.name} ({child.class})
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic text-xs">No students linked</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">{parent.status}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-1">
                                        <button
                                            onClick={() => handleEdit(parent)}
                                            className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-green-600 rounded-lg hover:bg-green-50" title="Link Student"><LinkIcon size={16} /></button>
                                        <button onClick={() => handleDelete(parent.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Parent Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">{editingParent ? 'Edit Parent' : 'Add New Parent'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setEditingParent(null); }} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                    placeholder="Robert Johnson"
                                    value={newParent.name}
                                    onChange={e => setNewParent({ ...newParent, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="parent@example.com"
                                        value={newParent.email}
                                        onChange={e => setNewParent({ ...newParent, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="Password"
                                        value={newParent.password}
                                        onChange={e => setNewParent({ ...newParent, password: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="+1234567890"
                                        value={newParent.phone}
                                        onChange={e => setNewParent({ ...newParent, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Relationship</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                                    value={newParent.relationship}
                                    onChange={e => setNewParent({ ...newParent, relationship: e.target.value })}
                                >
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Guardian">Guardian</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddParent}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                {editingParent ? 'Update Parent' : 'Save Parent'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ParentLoginControl = ({ parents, setParents, showToast }) => {
    const toggleLogin = (id) => {
        setParents(parents.map(p =>
            p.id === id ? { ...p, hasLogin: !p.hasLogin } : p
        ));
        showToast('Login status updated successfully', 'success');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Parent Name</th>
                        <th className="px-6 py-4">Email (Username)</th>
                        <th className="px-6 py-4">Login Status</th>
                        <th className="px-6 py-4">Last Login</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {parents.map(parent => (
                        <tr key={parent.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{parent.name}</td>
                            <td className="px-6 py-4">{parent.email}</td>
                            <td className="px-6 py-4">
                                {parent.hasLogin ?
                                    <span className="flex items-center gap-1 text-emerald-600 font-medium"><Check size={14} /> Active</span> :
                                    <span className="flex items-center gap-1 text-slate-400 font-medium"><X size={14} /> Inactive</span>
                                }
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                                {parent.hasLogin ? '2 hours ago' : 'Never'}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => toggleLogin(parent.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${parent.hasLogin
                                            ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                                            : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                            }`}
                                    >
                                        {parent.hasLogin ? 'Disable Access' : 'Enable Access'}
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50" title="Reset Password">
                                        <Key size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ParentNotifications = ({ parents, showToast }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message) return;
        showToast(`Notification sent to ${parents.length} parents`, 'success');
        setMessage('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Send size={20} className="text-blue-600" /> Send Broadcast Message
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Recipients</label>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
                            All Active Parents ({parents.length})
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
                        <textarea
                            className="w-full h-32 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 resize-none"
                            placeholder="Type your important announcement here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleSend}
                            disabled={!message}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Send Notification
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-slate-500" /> Recent History
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex gap-3 text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                            <div className="mt-1 min-w-1 h-4 bg-blue-200 rounded-full"></div>
                            <div>
                                <p className="font-medium text-slate-800">Fee Payment Reminder</p>
                                <p className="text-slate-500 text-xs mt-0.5">Sent to All Parents • 2 days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ParentActivity = ({ parents }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Active Now</div>
                    <div className="text-2xl font-bold text-emerald-600">12</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Logins Today</div>
                    <div className="text-2xl font-bold text-blue-600">45</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Failed Attempts</div>
                    <div className="text-2xl font-bold text-rose-600">2</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 font-bold text-slate-900">Activity Log</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                        <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                            <tr>
                                <th className="px-6 py-4">Parent</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">IP Address</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">Robert Johnson</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            Logged In
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">192.168.1.{10 + i}</td>
                                    <td className="px-6 py-4 text-slate-500">Today, 10:{30 + i} AM</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ParentManagement;

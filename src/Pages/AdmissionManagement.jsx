import React, { useState } from 'react';
import {
    LayoutDashboard, ClipboardList, FileText, CheckCircle, XCircle,
    Eye, Filter, Search, Calendar, User, Phone, Mail, MapPin,
    Upload, Download, Share2, MoreVertical, Plus, Check, X,
    Trash2, Link as LinkIcon
} from 'lucide-react';
import Toast from '../Components/Toast';

const AdmissionManagement = ({ view = 'dashboard' }) => {
    const [currentView, setCurrentView] = useState(view);
    const [toast, setToast] = useState(null);
    const [applications, setApplications] = useState([
        {
            id: 1, appNo: 'APP001', studentName: 'Rahul Kumar', class: 'Class 1',
            parentName: 'Amit Kumar', phone: '+91 9876543210', email: 'amit@example.com',
            status: 'Pending', date: '2024-03-15', dob: '2018-05-20', gender: 'Male',
            address: '123, MG Road, Bangalore',
            documents: ['Birth Certificate', 'Aadhar Card', 'Photo']
        },
        {
            id: 2, appNo: 'APP002', studentName: 'Priya Sharma', class: 'Class 5',
            parentName: 'Suresh Sharma', phone: '+91 9876543211', email: 'suresh@example.com',
            status: 'Approved', date: '2024-03-14', dob: '2014-08-10', gender: 'Female',
            address: '456, Lajpat Nagar, Delhi',
            documents: ['Transfer Certificate', 'Report Card', 'Medical Record']
        },
        {
            id: 3, appNo: 'APP003', studentName: 'Vikram Singh', class: 'Class 9',
            parentName: 'Raj Singh', phone: '+91 9876543212', email: 'raj@example.com',
            status: 'Rejected', date: '2024-03-10', dob: '2010-12-05', gender: 'Male',
            address: '789, Park Street, Kolkata',
            documents: []
        }
    ]);

    // Sync prop changes
    React.useEffect(() => {
        setCurrentView(view);
    }, [view]);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <AdmissionDashboard applications={applications} setCurrentView={setCurrentView} />;
            case 'applications': return <AdmissionApplications applications={applications} setApplications={setApplications} showToast={showToast} />;
            case 'forms': return <AdmissionForms showToast={showToast} />;
            default: return <AdmissionDashboard applications={applications} setCurrentView={setCurrentView} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {currentView === 'dashboard' && 'Admission Dashboard'}
                    {currentView === 'applications' && 'Admission Applications'}
                    {currentView === 'forms' && 'Admission Form Control'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {currentView === 'dashboard' && 'Overview of admission statistics and recent activities'}
                    {currentView === 'applications' && 'Manage and process student admission applications'}
                    {currentView === 'forms' && 'Customize and share the public admission form'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

/* --- Sub-Components --- */

const AdmissionDashboard = ({ applications, setCurrentView }) => {
    const pending = applications.filter(a => a.status === 'Pending').length;
    const approved = applications.filter(a => a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => setCurrentView('applications')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Pending Requests</p>
                            <h3 className="text-3xl font-bold text-amber-500">{pending}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <ClipboardList size={24} />
                        </div>
                    </div>
                </div>
                <div onClick={() => setCurrentView('applications')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Approved Admissions</p>
                            <h3 className="text-3xl font-bold text-emerald-600">{approved}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>
                <div onClick={() => setCurrentView('applications')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Rejected Applications</p>
                            <h3 className="text-3xl font-bold text-rose-600">{rejected}</h3>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                            <XCircle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {applications.slice(0, 5).map((app, i) => (
                            <div key={i} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white
                                    ${app.status === 'Approved' ? 'bg-emerald-500' :
                                        app.status === 'Rejected' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                                    {app.studentName[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">{app.studentName}</p>
                                    <p className="text-xs text-slate-500">Applied for {app.class} • {app.date}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium
                                    ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {app.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-2">Admission Open for 2024-25</h3>
                        <p className="text-blue-100 text-sm mb-6">Manage inquiries, process applications, and onboard new students seamlessly.</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl font-bold mb-1">1,240</div>
                                <div className="text-xs text-blue-200">Total Seats</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl font-bold mb-1">850</div>
                                <div className="text-xs text-blue-200">Available</div>
                            </div>
                        </div>

                        <button onClick={() => setCurrentView('forms')} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition shadow-lg">
                            Configure Admission Form
                        </button>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    );
};

const AdmissionApplications = ({ applications, setApplications, showToast }) => {
    const [filter, setFilter] = useState('All');
    const [selectedApp, setSelectedApp] = useState(null); // For Details View
    const [action, setAction] = useState(null); // 'approve', 'reject'
    const [assignClass, setAssignClass] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showViewModal, setShowViewModal] = useState(false);

    const filteredApps = applications.filter(app =>
        (filter === 'All' || app.status === filter) &&
        (app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.appNo.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAction = (app, actionType) => {
        setSelectedApp(app);
        setAction(actionType);
        if (actionType === 'approve') setAssignClass(app.class);
    };

    const handleView = (app) => {
        setSelectedApp(app);
        setShowViewModal(true);
    };

    const confirmAction = () => {
        if (action === 'approve') {
            const admissionNo = `ADM${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`;
            setApplications(applications.map(app =>
                app.id === selectedApp.id ? { ...app, status: 'Approved', admissionNo } : app
            ));
            showToast(`Application Approved! Admission No: ${admissionNo} generated. SMS Sent.`);
            setShowViewModal(false); // Close details modal if open
        } else if (action === 'reject') {
            setApplications(applications.map(app =>
                app.id === selectedApp.id ? { ...app, status: 'Rejected' } : app
            ));
            showToast('Application Rejected.', 'error');
            setShowViewModal(false);
        }
        setAction(null);
        if (!showViewModal) setSelectedApp(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-2">
                    {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                ${filter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 md:w-64">
                    <Search className="text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                        <tr>
                            <th className="px-6 py-4">App No</th>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Parent Contact</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredApps.map(app => (
                            <tr key={app.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-xs">{app.appNo}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{app.studentName}</div>
                                    <div className="text-xs text-slate-500">DOB: {app.dob}</div>
                                </td>
                                <td className="px-6 py-4">{app.class}</td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900">{app.parentName}</div>
                                    <div className="text-xs text-slate-500">{app.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-rose-100 text-rose-700'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleView(app)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        {app.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(app, 'approve')}
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                                    title="Approve"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(app, 'reject')}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                                    title="Reject"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            {showViewModal && selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {selectedApp.studentName[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{selectedApp.studentName}</h3>
                                    <p className="text-sm text-slate-500">Application No: {selectedApp.appNo}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">General Info</label>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Class:</span> <span className="font-medium text-slate-900">{selectedApp.class}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">DOB:</span> <span className="font-medium text-slate-900">{selectedApp.dob}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Gender:</span> <span className="font-medium text-slate-900">{selectedApp.gender}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Status:</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                                ${selectedApp.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                    selectedApp.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {selectedApp.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Parent Info</label>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Name:</span> <span className="font-medium text-slate-900">{selectedApp.parentName}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Phone:</span> <span className="font-medium text-slate-900">{selectedApp.phone}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Email:</span> <span className="font-medium text-slate-900">{selectedApp.email}</span></div>
                                        <div className="text-sm border-t border-slate-100 pt-1 mt-1"><span className="text-slate-500">Address:</span> <br />{selectedApp.address}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Submitted Documents</label>
                                <div className="flex gap-3 flex-wrap">
                                    {selectedApp.documents.length > 0 ? selectedApp.documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                                            <FileText size={16} className="text-blue-500" />
                                            {doc}
                                            <button className="ml-1 text-slate-400 hover:text-blue-600"><Eye size={14} /></button>
                                        </div>
                                    )) : <span className="text-sm text-slate-400 italic">No documents uploaded</span>}
                                </div>
                            </div>
                        </div>

                        {selectedApp.status === 'Pending' && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button
                                    onClick={() => handleAction(selectedApp, 'reject')}
                                    className="px-4 py-2 border border-rose-200 text-rose-600 font-medium hover:bg-rose-50 rounded-lg"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleAction(selectedApp, 'approve')}
                                    className="px-4 py-2 bg-emerald-600 text-white font-medium hover:bg-emerald-700 rounded-lg shadow-sm"
                                >
                                    Approve Application
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Action/Confirmation Modal */}
            {action && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">
                                {action === 'approve' ? 'Approve Application' : 'Reject Application'}
                            </h3>
                            <p className="text-sm text-slate-500">{selectedApp.studentName} ({selectedApp.appNo})</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {action === 'approve' ? (
                                <>
                                    <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg">
                                        This will generate an Admission Number and send a confirmation SMS/Email to the parent.
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 block mb-1">Assign Class</label>
                                        <select
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={assignClass}
                                            onChange={(e) => setAssignClass(e.target.value)}
                                        >
                                            <option>Class 1</option>
                                            <option>Class 5</option>
                                            <option>Class 9</option>
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <div className="p-3 bg-rose-50 text-rose-700 text-sm rounded-lg">
                                    Are you sure you want to reject this application? This action cannot be undone.
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button
                                onClick={() => { setAction(null); if (!showViewModal) setSelectedApp(null); }}
                                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                className={`px-4 py-2 text-white font-medium rounded-lg shadow-sm
                                    ${action === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}
                            >
                                Confirm {action === 'approve' ? 'Approval' : 'Rejection'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdmissionForms = ({ showToast }) => {
    // Enhanced functional state
    const [sections, setSections] = useState([
        { id: 1, title: 'Student Details', enabled: true, fields: ['Full Name', 'Date of Birth', 'Gender'] },
        { id: 2, title: 'Parent Information', enabled: true, fields: ['Father Name', 'Phone Number', 'Email'] },
        { id: 3, title: 'Documents Upload', enabled: true, fields: ['Birth Certificate', 'Previous Marks Card'] },
        { id: 4, title: 'Previous School Info', enabled: true, fields: ['School Name', 'Transfer Certificate No'] }
    ]);
    const [customFields, setCustomFields] = useState([]);

    const toggleSection = (id) => {
        setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    const addCustomField = () => {
        const name = prompt("Enter Field Label (e.g., 'Blood Group'):");
        if (name) {
            setCustomFields([...customFields, { id: Date.now(), title: name, type: 'text' }]);
            showToast('Custom field added!');
        }
    };

    const removeCustomField = (id) => {
        setCustomFields(customFields.filter(f => f.id !== id));
    };

    const copyLink = () => {
        navigator.clipboard.writeText('https://school.edu/admission/apply');
        showToast('Admission Link Copied!', 'success');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
            {/* Configuration Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Form Configuration</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Status:</span>
                        <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live
                        </span>
                    </div>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <FileText className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">General Admission Form</p>
                                <p className="text-xs text-slate-500">Last updated: Just now</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-600 transition" title="Preview"><Eye size={18} /></button>
                            <button onClick={copyLink} className="p-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-600 transition" title="Copy Link"><LinkIcon size={18} /></button>
                            <button className="p-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-600 transition" title="Share"><Share2 size={18} /></button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Form Sections</label>
                        <div className="space-y-2">
                            {sections.map((section) => (
                                <div key={section.id} className="p-3 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="cursor-move text-slate-300"><MoreVertical size={16} /></div>
                                            <span className="text-sm font-medium text-slate-700">{section.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={section.enabled}
                                                onChange={() => toggleSection(section.id)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {section.enabled && (
                                        <div className="pl-6 flex flex-wrap gap-2">
                                            {section.fields.map((f, i) => (
                                                <span key={i} className="text-xs bg-slate-50 px-2 py-1 rounded text-slate-500 border border-slate-100">{f}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Custom Fields List */}
                            {customFields.map((field) => (
                                <div key={field.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-blue-50/50">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-700">{field.title} (Custom)</span>
                                    </div>
                                    <button onClick={() => removeCustomField(field.id)} className="text-rose-400 hover:text-rose-600"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addCustomField} className="w-full py-3 border border-dashed border-slate-300 text-slate-500 rounded-lg text-sm hover:border-blue-500 hover:text-blue-600 transition mt-2 flex items-center justify-center gap-2">
                            <Plus size={16} /> Add Custom Field
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Preview Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-6">Live Preview</h3>
                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 flex-1 overflow-y-auto">
                    <div className="max-w-md mx-auto bg-white shadow-sm p-6 rounded-xl min-h-full">
                        <div className="text-center mb-6">
                            <div className="h-14 w-14 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <GraduationCapUnstyled size={28} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">School Admission 2024</h2>
                            <p className="text-xs text-slate-500">Academic Year 2024-2025</p>
                        </div>

                        <div className="space-y-6">
                            {sections.filter(s => s.enabled).map(section => (
                                <div key={section.id} className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">{section.title}</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {section.fields.map((field, idx) => (
                                            <div key={idx}>
                                                <label className="text-xs font-medium text-slate-600 mb-1 block">{field}</label>
                                                <div className="h-8 w-full bg-slate-50 border border-slate-200 rounded-lg"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {customFields.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">Additional Details</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {customFields.map(field => (
                                            <div key={field.id}>
                                                <label className="text-xs font-medium text-slate-600 mb-1 block">{field.title}</label>
                                                <div className="h-8 w-full bg-slate-50 border border-slate-200 rounded-lg"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm shadow-lg shadow-blue-200 opacity-90">
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for the preview icon
const GraduationCapUnstyled = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
);

export default AdmissionManagement;

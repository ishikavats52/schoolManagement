import React, { useState } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, User, BookOpen,
    Calendar, CheckCircle, XCircle, Clock, Key,
    FileText, Check, X, Shield, Mail, Phone, MapPin, Loader2
} from 'lucide-react';
import Toast from '../Components/Toast';
import PageLoader from '../Components/PageLoader';

const TeacherManagement = ({ view = 'directory' }) => {
    const [teachers, setTeachers] = useState([
        {
            id: 1, name: 'Sarah Wilson', employeeId: 'TCH001', email: 'sarah.w@school.com',
            phone: '+1 234-567-8901', subject: 'Mathematics', classes: ['10-A', '9-B'],
            status: 'Active', education: 'M.Sc. Mathematics', experience: '5 Years',
            username: 'sarah.w', hasLogin: true
        },
        {
            id: 2, name: 'James Anderson', employeeId: 'TCH002', email: 'james.a@school.com',
            phone: '+1 234-567-8902', subject: 'Physics', classes: ['11-A', '12-A'],
            status: 'Active', education: 'M.Sc. Physics', experience: '8 Years',
            username: 'james.a', hasLogin: true
        },
        {
            id: 3, name: 'Emily Davis', employeeId: 'TCH003', email: 'emily.d@school.com',
            phone: '+1 234-567-8903', subject: 'English', classes: ['6-A', '7-B', '8-A'],
            status: 'Leave', education: 'M.A. English', experience: '3 Years',
            username: 'emily.d', hasLogin: false
        }
    ]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const renderView = () => {
        switch (view) {
            case 'directory': return <TeacherDirectory teachers={teachers} setTeachers={setTeachers} showToast={showToast} />;
            case 'timetable': return <TeacherTimetable teachers={teachers} />;
            case 'attendance': return <TeacherAttendance teachers={teachers} showToast={showToast} />;
            case 'leaves': return <TeacherLeaves teachers={teachers} showToast={showToast} />;
            case 'credentials': return <TeacherCredentials teachers={teachers} setTeachers={setTeachers} showToast={showToast} />;
            default: return <TeacherDirectory teachers={teachers} setTeachers={setTeachers} showToast={showToast} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {view === 'directory' && 'Teacher Directory'}
                    {view === 'timetable' && 'Class Schedules'}
                    {view === 'attendance' && 'Teacher Attendance'}
                    {view === 'leaves' && 'Leave Approval'}
                    {view === 'credentials' && 'Login Management'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {view === 'directory' && 'Manage faculty members, assign subjects and classes'}
                    {view === 'timetable' && 'View and manage weekly timetables'}
                    {view === 'attendance' && 'Track daily attendance and working hours'}
                    {view === 'leaves' && 'Review and approve leave requests'}
                    {view === 'credentials' && 'Manage system access and passwords'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

/* --- Sub-Components --- */

const TeacherDirectory = ({ teachers, setTeachers, showToast }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [newTeacher, setNewTeacher] = useState({
        name: '', email: '', phone: '', subject: '', education: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddTeacher = () => {
        if (!newTeacher.name || !newTeacher.email) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            if (editingTeacher) {
                setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...t, ...newTeacher } : t));
                showToast('Teacher updated successfully');
            } else {
                setTeachers([...teachers, {
                    id: teachers.length + 1,
                    employeeId: `TCH00${teachers.length + 1}`,
                    ...newTeacher,
                    classes: [],
                    status: 'Active',
                    experience: '0 Years',
                    hasLogin: false
                }]);
                showToast('Teacher added successfully');
            }
            setIsModalOpen(false);
            setNewTeacher({ name: '', email: '', phone: '', subject: '', education: '' });
            setEditingTeacher(null);
            setIsSubmitting(false);
        }, 1000);
    };

    const handleEdit = (teacher) => {
        setEditingTeacher(teacher);
        setNewTeacher({
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
            subject: teacher.subject,
            education: teacher.education
        });
        setIsModalOpen(true);
        setIsModalLoading(true);
        setTimeout(() => setIsModalLoading(false), 800);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full md:w-96">
                    <Search className="text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or subject..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => {
                    setIsModalOpen(true);
                    setIsModalLoading(true);
                    setTimeout(() => setIsModalLoading(false), 800);
                }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                    <Plus size={20} /> Add Teacher
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                        <tr>
                            <th className="px-6 py-4">Teacher</th>
                            <th className="px-6 py-4">Subject & Classes</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Qualification</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredTeachers.map(teacher => (
                            <tr key={teacher.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {teacher.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{teacher.name}</p>
                                            <p className="text-xs text-slate-500">{teacher.employeeId}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-slate-900">{teacher.subject}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {teacher.classes.map(cls => (
                                                <span key={cls} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                                    {cls}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail size={14} /> {teacher.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 mt-1">
                                        <Phone size={14} /> {teacher.phone}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-slate-900">{teacher.education}</p>
                                    <p className="text-xs text-slate-500">{teacher.experience}</p>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-1">
                                        <button
                                            onClick={() => handleEdit(teacher)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg" title="Assign Classes">
                                            <BookOpen size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setEditingTeacher(null); }}><X className="text-slate-400" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {isModalLoading ? (
                                <div className="flex items-center justify-center min-h-[300px]">
                                    <PageLoader />
                                </div>
                            ) : (
                                <>
                                    <input className="w-full px-3 py-2 border rounded-lg" placeholder="Full Name" value={newTeacher.name} onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })} />
                                    <input className="w-full px-3 py-2 border rounded-lg" placeholder="Email" value={newTeacher.email} onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })} />
                                    <input className="w-full px-3 py-2 border rounded-lg" placeholder="Phone" value={newTeacher.phone} onChange={e => setNewTeacher({ ...newTeacher, phone: e.target.value })} />
                                    <input className="w-full px-3 py-2 border rounded-lg" placeholder="Subject Specialization" value={newTeacher.subject} onChange={e => setNewTeacher({ ...newTeacher, subject: e.target.value })} />
                                    <input className="w-full px-3 py-2 border rounded-lg" placeholder="Education (e.g. M.Sc.)" value={newTeacher.education} onChange={e => setNewTeacher({ ...newTeacher, education: e.target.value })} />
                                </>
                            )}
                        </div>
                        {!isModalLoading && (
                            <div className="p-6 bg-slate-50 flex justify-end gap-3">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-slate-200 rounded-lg">Cancel</button>
                                <button
                                    onClick={handleAddTeacher}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        editingTeacher ? 'Update Teacher' : 'Save Teacher'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const TeacherTimetable = ({ teachers }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teachers.map(teacher => (
                <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">{teacher.name}</h3>
                            <p className="text-sm text-slate-500">{teacher.subject}</p>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">Weekly Schedule</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                            <span className="w-20 font-medium text-slate-600">Monday</span>
                            <div className="flex gap-2">
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">10-A (09:00)</span>
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">9-B (11:00)</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                            <span className="w-20 font-medium text-slate-600">Tuesday</span>
                            <div className="flex gap-2">
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">9-B (10:00)</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span className="w-20 font-medium text-slate-600">Wednesday</span>
                            <div className="flex gap-2">
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">10-A (09:00)</span>
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const TeacherAttendance = ({ teachers, showToast }) => {
    const handleMark = (id, status) => {
        showToast(`Marked as ${status}`, 'success');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Today's Attendance - {new Date().toLocaleDateString()}</h3>
            <div className="space-y-4">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                                {teacher.name[0]}
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">{teacher.name}</p>
                                <p className="text-xs text-slate-500">In Time: --:--</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleMark(teacher.id, 'Present')} className="flex items-center gap-1 px-4 py-2 bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium text-sm">
                                <CheckCircle size={16} /> Present
                            </button>
                            <button onClick={() => handleMark(teacher.id, 'Absent')} className="flex items-center gap-1 px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium text-sm">
                                <XCircle size={16} /> Absent
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeacherLeaves = ({ teachers, showToast }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Teacher</th>
                        <th className="px-6 py-4">Leave Type</th>
                        <th className="px-6 py-4">Dates</th>
                        <th className="px-6 py-4">Reason</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4  bg-slate-50 font-medium text-slate-900">Emily Davis</td>
                        <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Medical</span></td>
                        <td className="px-6 py-4 text-slate-600">Feb 10 - Feb 12</td>
                        <td className="px-6 py-4 text-slate-500 truncate max-w-xs">Doctor appointments for yearly checkup.</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center gap-2">
                                <button onClick={() => showToast('Leave Approved')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check size={18} /></button>
                                <button onClick={() => showToast('Leave Rejected', 'error')} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"><X size={18} /></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const TeacherCredentials = ({ teachers, showToast }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Teacher</th>
                        <th className="px-6 py-4">Username</th>
                        <th className="px-6 py-4">Last Login</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td className="px-6 py-4 font-medium text-slate-900">{teacher.name}</td>
                            <td className="px-6 py-4 text-slate-600">{teacher.username}</td>
                            <td className="px-6 py-4 text-slate-500">{teacher.hasLogin ? 'Yesterday' : 'Never'}</td>
                            <td className="px-6 py-4">
                                {teacher.hasLogin ?
                                    <span className="text-emerald-600 font-medium flex items-center gap-1"><Check size={14} /> Active</span> :
                                    <span className="text-slate-400 font-medium flex items-center gap-1"><X size={14} /> Disabled</span>
                                }
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-xs font-medium border border-blue-200">Reset Password</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherManagement;

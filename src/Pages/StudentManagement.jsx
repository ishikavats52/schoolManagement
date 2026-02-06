import React, { useState } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, GraduationCap,
    MapPin, Phone, Mail, User, FileText, Calendar, Check, X,
    ChevronRight, ArrowUpRight, CreditCard, Key, Upload, Download
} from 'lucide-react';
import Toast from '../Components/Toast';

const StudentManagement = ({ view = 'directory' }) => {
    const [students, setStudents] = useState([
        {
            id: 1, studentId: 'STU001', name: 'Alice Johnson', email: 'alice@school.com',
            class: 'Class 10', section: 'A', rollNo: '1',
            attendance: 95, status: 'Active',
            parentName: 'Robert Johnson', parentPhone: '+1234567890',
            hasLogin: true, username: 'alice.j'
        },
        {
            id: 2, studentId: 'STU002', name: 'Bob Smith', email: 'bob@school.com',
            class: 'Class 10', section: 'B', rollNo: '2',
            attendance: 88, status: 'Active',
            parentName: 'Mary Smith', parentPhone: '+1234567891',
            hasLogin: true, username: 'bob.s'
        },
        {
            id: 3, studentId: 'STU003', name: 'Charlie Davis', email: 'charlie@school.com',
            class: 'Class 9', section: 'A', rollNo: '3',
            attendance: 92, status: 'Active',
            parentName: 'Jennifer Davis', parentPhone: '+1234567892',
            hasLogin: false, username: ''
        }
    ]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const renderView = () => {
        switch (view) {
            case 'directory': return <StudentDirectory students={students} setStudents={setStudents} showToast={showToast} />;
            case 'attendance': return <StudentAttendance students={students} setStudents={setStudents} showToast={showToast} />;
            case 'promotion': return <StudentPromotion students={students} setStudents={setStudents} showToast={showToast} />;
            case 'documents': return <StudentDocuments students={students} showToast={showToast} />;
            case 'id_cards': return <StudentIDCards students={students} showToast={showToast} />;
            case 'credentials': return <StudentCredentials students={students} setStudents={setStudents} showToast={showToast} />;
            default: return <StudentDirectory students={students} setStudents={setStudents} showToast={showToast} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {view === 'directory' && 'Student Directory'}
                    {view === 'attendance' && 'Attendance Control'}
                    {view === 'promotion' && 'Student Promotion'}
                    {view === 'documents' && 'Document Management'}
                    {view === 'id_cards' && 'ID Card Generation'}
                    {view === 'credentials' && 'Login Credentials'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {view === 'directory' && 'Manage student records and profiles'}
                    {view === 'attendance' && 'Track and mark student attendance'}
                    {view === 'promotion' && 'Promote students to next academic year'}
                    {view === 'documents' && 'Upload and manage student documents'}
                    {view === 'id_cards' && 'Generate and print student ID cards'}
                    {view === 'credentials' && 'Manage student login access and passwords'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

/* --- Sub-Components --- */

const StudentDirectory = ({ students, setStudents, showToast }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({
        name: '', email: '', class: '', section: '', rollNo: '', parentName: '', parentPhone: ''
    });

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddStudent = () => {
        if (!newStudent.name || !newStudent.class) {
            showToast('Please fill in required fields', 'error');
            return;
        }

        if (editingStudent) {
            setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...newStudent } : s));
            showToast('Student updated successfully!');
        } else {
            const student = {
                id: students.length + 1,
                studentId: `STU00${students.length + 1}`,
                ...newStudent,
                attendance: 0,
                status: 'Active',
                hasLogin: false,
                username: ''
            };
            setStudents([...students, student]);
            showToast('Student added successfully!');
        }
        setIsModalOpen(false);
        setNewStudent({ name: '', email: '', class: '', section: '', rollNo: '', parentName: '', parentPhone: '' });
        setEditingStudent(null);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setNewStudent({
            name: student.name,
            email: student.email,
            class: student.class,
            section: student.section,
            rollNo: student.rollNo,
            parentName: student.parentName,
            parentPhone: student.parentPhone
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents(students.filter(s => s.id !== id));
            showToast('Student deleted successfully');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="p-4 border-b border-slate-200 flex justify-between gap-4">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full md:w-96">
                    <Search className="text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder-slate-400"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} /> Add Student
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Parent</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map(student => (
                            <tr key={student.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{student.studentId}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{student.name[0]}</div>
                                        <div>
                                            <p className="font-medium text-slate-900">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">{student.class}-{student.section}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{student.parentName}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-amber-600"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(student.id)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-rose-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Student Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setEditingStudent(null); }} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="John Doe"
                                        value={newStudent.name}
                                        onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="john@example.com"
                                        value={newStudent.email}
                                        onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Class</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="10"
                                        value={newStudent.class}
                                        onChange={e => setNewStudent({ ...newStudent, class: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Section</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="A"
                                        value={newStudent.section}
                                        onChange={e => setNewStudent({ ...newStudent, section: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Roll No</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                        placeholder="01"
                                        value={newStudent.rollNo}
                                        onChange={e => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Parent Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                    placeholder="Parent Name"
                                    value={newStudent.parentName}
                                    onChange={e => setNewStudent({ ...newStudent, parentName: e.target.value })}
                                />
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
                                onClick={handleAddStudent}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                {editingStudent ? 'Update Student' : 'Save Student'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StudentAttendance = ({ students, setStudents, showToast }) => {
    const handleMarkAttendance = (id, status) => {
        // In a real app, this would be an API call
        showToast(`Marked ${status} for student`, status === 'Present' ? 'success' : 'error');
    };

    const presentCount = Math.round(students.length * 0.92);
    const absentCount = students.length - presentCount;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-emerald-600 font-medium mb-1">Present Today</div>
                    <div className="text-2xl font-bold text-emerald-700">{presentCount} (92%)</div>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <div className="text-rose-600 font-medium mb-1">Absent Today</div>
                    <div className="text-2xl font-bold text-rose-700">{absentCount} (8%)</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-blue-600 font-medium mb-1">Total Students</div>
                    <div className="text-2xl font-bold text-blue-700">{students.length}</div>
                </div>
            </div>

            <h3 className="font-bold text-lg mb-4">Mark Attendance</h3>
            <div className="space-y-3">
                {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 font-bold text-slate-600">{student.name[0]}</div>
                            <div>
                                <p className="font-medium text-slate-900">{student.name}</p>
                                <p className="text-sm text-slate-500">{student.class}-{student.section}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleMarkAttendance(student.id, 'Present')}
                                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                                Present
                            </button>
                            <button
                                onClick={() => handleMarkAttendance(student.id, 'Absent')}
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-rose-50 hover:text-rose-600 transition focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            >
                                Absent
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentPromotion = ({ students, showToast }) => {
    const [selectedClass, setSelectedClass] = useState('Class 10-A');
    const [targetClass, setTargetClass] = useState('Class 11-A');

    const handlePromote = () => {
        showToast(`Promoting students from ${selectedClass} to ${targetClass}...`);
        setTimeout(() => {
            showToast('Students promoted successfully!');
        }, 1000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <select
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option>Class 10-A</option>
                        <option>Class 10-B</option>
                    </select>
                    <ArrowUpRight className="text-slate-400 self-center" />
                    <select
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                        value={targetClass}
                        onChange={(e) => setTargetClass(e.target.value)}
                    >
                        <option>Class 11-A</option>
                        <option>Class 11-B</option>
                    </select>
                </div>
                <button
                    onClick={handlePromote}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm active:scale-95"
                >
                    Promote All
                </button>
            </div>

            <div className="space-y-2">
                {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                            <span>{student.name}</span>
                        </div>
                        <span className="text-sm text-slate-500">Current: {student.attendance}% Attendance</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentDocuments = ({ students, showToast }) => {
    const handleView = (docName) => showToast(`Opening ${docName}...`, 'info');
    const handleUpload = () => showToast('Upload dialog opened', 'info');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
                <div key={student.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{student.name[0]}</div>
                        <div>
                            <p className="font-bold text-slate-900">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.studentId}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                <span>Birth Certificate</span>
                            </div>
                            <button onClick={() => handleView('Birth Certificate')} className="text-blue-600 hover:underline">View</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                <span>Transfer Cert.</span>
                            </div>
                            <button onClick={handleUpload} className="text-slate-400 hover:text-blue-600"><Upload size={16} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const StudentIDCards = ({ students, showToast }) => {
    const handleDownload = () => showToast('Downloading ID Cards...');
    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={handleDownload}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 shadow-sm active:scale-95 transition"
                >
                    <Download size={18} /> Download All IDs
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {students.map(student => (
                    <div key={student.id} className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><CreditCard size={100} /></div>
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="h-20 w-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-2 border-white/30">
                                {student.name[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{student.name}</h3>
                                <p className="text-blue-200 text-sm mb-2">{student.studentId}</p>
                                <div className="text-sm space-y-1">
                                    <p><span className="opacity-70">Class:</span> {student.class}-{student.section}</p>
                                    <p><span className="opacity-70">Roll:</span> {student.rollNo}</p>
                                    <p><span className="opacity-70">DOB:</span> 12 Jan 2008</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end">
                            <div className="text-xs opacity-70">
                                <p>School Admin Signature</p>
                                <div className="h-8 w-32 bg-white/10 mt-1 rounded"></div>
                            </div>
                            <div className="h-12 w-12 bg-white p-1 rounded-lg">
                                {/* QR Code Placeholder */}
                                <div className="w-full h-full bg-slate-900 pattern-grid-lg opacity-80"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentCredentials = ({ students, setStudents, showToast }) => {
    const handleCredentialAction = (id, hasLogin) => {
        const action = hasLogin ? 'Reset Password' : 'Generated Credentials';
        setStudents(students.map(s =>
            s.id === id ? { ...s, hasLogin: true, username: s.username || s.name.toLowerCase().replace(' ', '.') } : s
        ));
        showToast(`${action} sent to student email`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs">
                    <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Username</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Last Login</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {students.map(student => (
                        <tr key={student.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium">{student.name}</td>
                            <td className="px-6 py-4 font-mono text-slate-600">{student.username || '-'}</td>
                            <td className="px-6 py-4">
                                {student.hasLogin ?
                                    <span className="flex items-center gap-1 text-emerald-600"><Check size={14} /> Enabled</span> :
                                    <span className="flex items-center gap-1 text-slate-400"><X size={14} /> Disabled</span>
                                }
                            </td>
                            <td className="px-6 py-4 text-slate-500">2 hours ago</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => handleCredentialAction(student.id, student.hasLogin)}
                                    className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-medium transition-colors"
                                >
                                    {student.hasLogin ? 'Reset Password' : 'Generate Credentials'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default StudentManagement;

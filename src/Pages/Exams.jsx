import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, AlertCircle, Calendar, Trash2, Edit } from 'lucide-react';
import Toast from '../Components/Toast';

const Exams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [newExam, setNewExam] = useState({ name: '', date: '', class: '' });
    const [toast, setToast] = useState(null);

    const classPerformance = [
        { name: 'Class 10', avgScore: 85, passRate: 92 },
        { name: 'Class 9', avgScore: 78, passRate: 88 },
        { name: 'Class 8', avgScore: 82, passRate: 90 },
        { name: 'Class 7', avgScore: 74, passRate: 85 },
        { name: 'Class 6', avgScore: 88, passRate: 95 },
    ];

    const [recentExams, setRecentExams] = useState([
        { id: 1, name: 'Mid-Term Physics', class: 'Class 10-A', date: '2023-10-15', status: 'Completed', result: 'Published' },
        { id: 2, name: 'Unit Test Math', class: 'Class 9-B', date: '2023-10-18', status: 'Grading', result: 'Pending' },
        { id: 3, name: 'Formative English', class: 'Class 8-A', date: '2023-10-20', status: 'Scheduled', result: '-' },
    ]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleScheduleExam = () => {
        if (!newExam.name || !newExam.date || !newExam.class) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        if (editingExam) {
            // Update existing exam
            setRecentExams(recentExams.map(exam =>
                exam.id === editingExam.id
                    ? { ...exam, ...newExam }
                    : exam
            ));
            showToast(`Exam "${newExam.name}" updated successfully!`, 'success');
            setEditingExam(null);
        } else {
            // Add new exam
            const id = recentExams.length + 1;
            setRecentExams([...recentExams, {
                id,
                name: newExam.name,
                class: newExam.class,
                date: newExam.date,
                status: 'Scheduled',
                result: '-'
            }]);
            showToast(`Exam "${newExam.name}" scheduled successfully!`, 'success');
        }

        setNewExam({ name: '', date: '', class: '' });
        setIsModalOpen(false);
    };

    const handleEdit = (exam) => {
        setEditingExam(exam);
        setNewExam({ name: exam.name, date: exam.date, class: exam.class });
        setIsModalOpen(true);
    };

    const handleDeleteExam = (id) => {
        const examToDelete = recentExams.find(e => e.id === id);
        if (window.confirm(`Are you sure you want to delete "${examToDelete.name}"?`)) {
            setRecentExams(recentExams.filter(exam => exam.id !== id));
            showToast(`Exam "${examToDelete.name}" deleted successfully!`, 'success');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExam(null);
        setNewExam({ name: '', date: '', class: '' });
    };

    return (
        <div className="space-y-6">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Academic Oversight</h1>
                    <p className="text-slate-600 text-sm">Monitor examination performance and schedules</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Calendar size={16} /> Schedule Exam
                </button>
            </div>

            {/* Performance Overview Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Class-wise Performance (Avg Score)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={classPerformance}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="avgScore" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Exams List */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Recent & Upcoming Exams</h3>
                    <div className="space-y-4">
                        {recentExams.map((exam) => (
                            <div key={exam.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm border border-slate-100">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                                        <p className="text-xs text-slate-500">{exam.class} • {exam.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${exam.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            exam.status === 'Grading' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                        {exam.status}
                                    </span>
                                    <button
                                        onClick={() => handleEdit(exam)}
                                        className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteExam(exam.id)}
                                        className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pass Rate Stats */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Underperforming Areas</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                            <AlertCircle className="text-red-500 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-red-800">Class 7 Science</h4>
                                <p className="text-sm text-red-600 mt-1">Average score dropped by 15% in the last unit test. Recommended review of teaching material.</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
                            <AlertCircle className="text-orange-500 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-orange-800">Class 9 Mathematics</h4>
                                <p className="text-sm text-orange-600 mt-1">Pass rate is 65%, below the school target of 80%.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule/Edit Exam Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 transform scale-100 transition-all">
                        <h3 className="text-lg font-bold mb-4 text-slate-900">{editingExam ? 'Edit Exam' : 'Schedule New Exam'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Exam Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800"
                                    placeholder="e.g. Mid-Term Physics"
                                    value={newExam.name}
                                    onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800"
                                    value={newExam.date}
                                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Class & Section</label>
                                <input
                                    type="text"
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800"
                                    placeholder="e.g. Class 10-A"
                                    value={newExam.class}
                                    onChange={(e) => setNewExam({ ...newExam, class: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleScheduleExam}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                            >
                                {editingExam ? 'Update Exam' : 'Schedule'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exams;

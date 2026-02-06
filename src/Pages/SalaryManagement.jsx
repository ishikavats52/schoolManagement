import React, { useState } from 'react';
import { Search, DollarSign, Calendar, CheckCircle, Clock, Filter, CreditCard, ChevronRight, Edit, Download } from 'lucide-react';
import Toast from '../Components/Toast';

const SalaryManagement = () => {
    const [activeTab, setActiveTab] = useState('current');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSalary, setEditingSalary] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [toast, setToast] = useState(null);

    // Mock Data
    const [salaries, setSalaries] = useState([
        { id: 1, name: 'Sarah Wilson', employeeId: 'TCH001', role: 'Senior Teacher', baseSalary: 4500, status: 'Pending', lastPaid: '2023-09-30', bonus: 0, deductions: 0 },
        { id: 2, name: 'Mike Johnson', employeeId: 'TCH002', role: 'Math Teacher', baseSalary: 4200, status: 'Paid', lastPaid: '2023-10-30', bonus: 200, deductions: 50 },
        { id: 3, name: 'Emily Davis', employeeId: 'TCH003', role: 'Science Teacher', baseSalary: 4200, status: 'Paid', lastPaid: '2023-10-31', bonus: 0, deductions: 0 },
        { id: 4, name: 'Robert Brown', employeeId: 'TCH004', role: 'History Teacher', baseSalary: 4000, status: 'Overdue', lastPaid: '2023-09-30', bonus: 0, deductions: 100 },
        { id: 5, name: 'Lisa Anderson', employeeId: 'TCH005', role: 'English Teacher', baseSalary: 4100, status: 'Pending', lastPaid: '2023-09-30', bonus: 150, deductions: 0 },
    ]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleProcessPayment = (teacher) => {
        setSelectedTeacher(teacher);
        setEditingSalary(null);
        setIsModalOpen(true);
    };

    const handleEditSalary = (teacher) => {
        setEditingSalary(teacher);
        setSelectedTeacher(null);
        setIsModalOpen(true);
    };

    const confirmPayment = () => {
        if (!selectedTeacher) return;
        setSalaries(salaries.map(s =>
            s.id === selectedTeacher.id ? { ...s, status: 'Paid', lastPaid: new Date().toISOString().split('T')[0] } : s
        ));
        showToast(`Salary processed for ${selectedTeacher.name}`);
        setIsModalOpen(false);
        setSelectedTeacher(null);
    };

    const updateSalaryDetails = (e) => {
        e.preventDefault();
        if (!editingSalary) return;
        const formData = new FormData(e.target);
        const newBase = Number(formData.get('baseSalary'));

        setSalaries(salaries.map(s =>
            s.id === editingSalary.id ? { ...s, baseSalary: newBase } : s
        ));

        showToast(`Salary details updated for ${editingSalary.name}`);
        setIsModalOpen(false);
        setEditingSalary(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Overdue': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    const filteredSalaries = salaries.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Stats
    const totalPayout = salaries.reduce((acc, curr) => acc + curr.baseSalary, 0);
    const pendingPayout = salaries.filter(s => s.status !== 'Paid').reduce((acc, curr) => acc + curr.baseSalary, 0);

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Salary Management</h1>
                    <p className="text-slate-600 text-sm">Manage teacher salaries and payouts</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50">
                        <Download size={18} /> Export Report
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                        <CreditCard size={18} /> Process All
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Monthly Payout</p>
                            <h3 className="text-2xl font-bold text-slate-900">${totalPayout.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-slate-900">${pendingPayout.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Paid Employees</p>
                            <h3 className="text-2xl font-bold text-slate-900">{salaries.filter(s => s.status === 'Paid').length} / {salaries.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 focus-within:border-blue-500 w-full md:w-80">
                        <Search className="text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-800 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Base Salary</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last Paid</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredSalaries.map((salary) => (
                                <tr key={salary.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{salary.name}</span>
                                            <span className="text-xs text-slate-500">{salary.role} • {salary.employeeId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        ${salary.baseSalary.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(salary.status)}`}>
                                            {salary.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {salary.lastPaid}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEditSalary(salary)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit Salary"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            {salary.status !== 'Paid' && (
                                                <button
                                                    onClick={() => handleProcessPayment(salary)}
                                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                                                >
                                                    Pay
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                        {/* Process Payment Modal */}
                        {selectedTeacher && (
                            <>
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900">Confirm Payment</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-600">Employee</span>
                                            <span className="font-semibold text-slate-900">{selectedTeacher.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-600">Base Salary</span>
                                            <span className="font-semibold text-slate-900">${selectedTeacher.baseSalary}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-emerald-600">
                                            <span>Bonus</span>
                                            <span>+${selectedTeacher.bonus}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-rose-600">
                                            <span>Deductions</span>
                                            <span>-${selectedTeacher.deductions}</span>
                                        </div>
                                        <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between items-center font-bold text-lg text-slate-900">
                                            <span>Total Payable</span>
                                            <span>${selectedTeacher.baseSalary + selectedTeacher.bonus - selectedTeacher.deductions}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500">This action will mark the salary as "Paid" for the current month.</p>
                                </div>
                                <div className="p-6 bg-slate-50 flex justify-end gap-3">
                                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-slate-200 rounded-lg text-slate-700 font-medium">Cancel</button>
                                    <button onClick={confirmPayment} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-sm">Confirm Payment</button>
                                </div>
                            </>
                        )}

                        {/* Edit Salary Modal */}
                        {editingSalary && (
                            <form onSubmit={updateSalaryDetails}>
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900">Edit Salary Details</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Base Salary</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                name="baseSalary"
                                                type="number"
                                                defaultValue={editingSalary.baseSalary}
                                                className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-slate-200 rounded-lg text-slate-700 font-medium">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">Update Salary</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryManagement;

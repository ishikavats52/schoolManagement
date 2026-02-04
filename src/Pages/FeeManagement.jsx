import React, { useState } from 'react';
import { Plus, Filter, Search, CheckCircle, XCircle, Clock, DollarSign, Trash2, Edit } from 'lucide-react';
import Toast from '../Components/Toast';

const FeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [toast, setToast] = useState(null);

  // Form State
  const [newFee, setNewFee] = useState({ name: '', amount: '', type: 'Tuition Fee' });

  const [fees, setFees] = useState([
    { id: 1, name: 'John Doe', class: '10-A', type: 'Tuition Fee', amount: '$500', status: 'Paid', date: '2023-10-01' },
    { id: 2, name: 'Jane Smith', class: '10-A', type: 'Tuition Fee', amount: '$500', status: 'Pending', date: '2023-10-05' },
    { id: 3, name: 'Alice Johnson', class: '9-B', type: 'Bus Fee', amount: '$150', status: 'Overdue', date: '2023-09-30' },
    { id: 4, name: 'Bob Brown', class: '8-C', type: 'Library Fee', amount: '$50', status: 'Paid', date: '2023-10-10' },
    { id: 5, name: 'Charlie Davis', class: '9-A', type: 'Tuition Fee', amount: '$500', status: 'Pending', date: '2023-11-01' },
    { id: 6, name: 'Diana Prince', class: '10-B', type: 'Lab Fee', amount: '$200', status: 'Paid', date: '2023-10-12' },
    { id: 7, name: 'Evan Wright', class: '8-C', type: 'Sports Fee', amount: '$100', status: 'Overdue', date: '2023-09-25' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      case 'Pending': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Overdue': return 'text-rose-700 bg-rose-100 border-rose-200';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const filteredFees = fees.filter(fee => {
    const matchesClass = classFilter === 'All Classes' || fee.class.includes(classFilter.replace('Class ', ''));
    const matchesSearch = fee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleCollectFee = () => {
    if (!newFee.name || !newFee.amount) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingFee) {
      // Update existing fee
      setFees(fees.map(fee =>
        fee.id === editingFee.id
          ? { ...fee, name: newFee.name, amount: `$${newFee.amount}`, type: newFee.type }
          : fee
      ));
      showToast(`Fee record for "${newFee.name}" updated successfully!`, 'success');
      setEditingFee(null);
    } else {
      // Add new fee
      const id = fees.length + 1;
      const feeRecord = {
        id,
        name: newFee.name,
        class: 'N/A',
        type: newFee.type,
        amount: `$${newFee.amount}`,
        status: 'Paid',
        date: new Date().toISOString().split('T')[0]
      };
      setFees([feeRecord, ...fees]);
      showToast(`Fee payment of $${newFee.amount} recorded for "${newFee.name}"!`, 'success');
    }

    setNewFee({ name: '', amount: '', type: 'Tuition Fee' });
    setIsModalOpen(false);
  };

  const handleEdit = (fee) => {
    setEditingFee(fee);
    setNewFee({
      name: fee.name,
      amount: fee.amount.replace('$', ''),
      type: fee.type
    });
    setIsModalOpen(true);
  };

  const handleDeleteFee = (id) => {
    const feeToDelete = fees.find(f => f.id === id);
    if (window.confirm(`Are you sure you want to delete the fee record for "${feeToDelete.name}"?`)) {
      setFees(fees.filter(fee => fee.id !== id));
      showToast(`Fee record for "${feeToDelete.name}" deleted successfully!`, 'success');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFee(null);
    setNewFee({ name: '', amount: '', type: 'Tuition Fee' });
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fee Management</h1>
          <p className="text-slate-600 text-sm">Manage student fees and invoices</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus size={20} /> Collect Fee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 focus-within:border-blue-600 focus-within:ring-1 ring-blue-100 transition-all w-full md:w-64">
          <Search className="text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search student..."
            className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option>All Classes</option>
            <option>Class 10</option>
            <option>Class 9</option>
            <option>Class 8</option>
          </select>
          <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Fee Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFees.length > 0 ? (
                filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex flex-col">
                        <span>{fee.name}</span>
                        <span className="text-xs text-slate-500">Class {fee.class}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{fee.type}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{fee.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit border ${getStatusColor(fee.status)}`}>
                        {fee.status === 'Paid' && <CheckCircle size={12} />}
                        {fee.status === 'Pending' && <Clock size={12} />}
                        {fee.status === 'Overdue' && <XCircle size={12} />}
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{fee.date}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(fee)}
                          className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteFee(fee.id)}
                          className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No fee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fee Collection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 transform scale-100 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{editingFee ? 'Edit Fee' : 'Collect Fee'}</h3>
                <p className="text-sm text-slate-500">{editingFee ? 'Update payment record' : 'Record a new payment'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800"
                  placeholder="Enter name"
                  value={newFee.name}
                  onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800"
                  placeholder="0.00"
                  value={newFee.amount}
                  onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fee Type</label>
                <select
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 bg-white text-slate-800"
                  value={newFee.type}
                  onChange={(e) => setNewFee({ ...newFee, type: e.target.value })}
                >
                  <option>Tuition Fee</option>
                  <option>Bus Fee</option>
                  <option>Library Fee</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCollectFee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                {editingFee ? 'Update Payment' : 'Record Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeeManagement;
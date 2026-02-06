import React, { useState } from 'react';
import { Plus, Users, BookOpen, Search, Trash2, Edit } from 'lucide-react';
import Toast from '../Components/Toast';

const ClassManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [toast, setToast] = useState(null);

    const [newClass, setNewClass] = useState({ name: 'Class 10', section: '', teacher: '' });

  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 10', section: 'A', teacher: 'Sarah Wilson', students: 45, subjects: 8 },
    { id: 2, name: 'Class 10', section: 'B', teacher: 'Mike Johnson', students: 42, subjects: 8 },
    { id: 3, name: 'Class 9', section: 'A', teacher: 'Emily Davis', students: 38, subjects: 7 },
    { id: 4, name: 'Class 9', section: 'B', teacher: 'Robert Brown', students: 40, subjects: 7 },
    { id: 5, name: 'Class 8', section: 'A', teacher: 'Lisa Anderson', students: 35, subjects: 6 },
    { id: 6, name: 'Class 8', section: 'B', teacher: 'David Miller', students: 32, subjects: 6 },
  ]);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddClass = () => {
    if (!newClass.section || !newClass.teacher) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingClass) {
      // Update existing class
      setClasses(classes.map(cls =>
        cls.id === editingClass.id
          ? { ...cls, ...newClass }
          : cls
      ));
      showToast(`Class "${newClass.name}-${newClass.section}" updated successfully!`, 'success');
      setEditingClass(null);
    } else {

      
      // Add new class
      const id = classes.length + 1;
      setClasses([...classes, {
        id,
        ...newClass,
        students: 0,
        subjects: 6
      }]);
      showToast(`Class "${newClass.name}-${newClass.section}" created successfully!`, 'success');
    }

    setNewClass({ name: 'Class 10', section: '', teacher: '' });
    setIsModalOpen(false);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setNewClass({ name: cls.name, section: cls.section, teacher: cls.teacher });
    setIsModalOpen(true);
  };

  const handleDeleteClass = (id) => {
    const classToDelete = classes.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete "${classToDelete.name}-${classToDelete.section}"?`)) {
      setClasses(classes.filter(cls => cls.id !== id));
      showToast(`Class "${classToDelete.name}-${classToDelete.section}" deleted successfully!`, 'success');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
    setNewClass({ name: 'Class 10', section: '', teacher: '' });
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

      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Class Management</h1>
          <p className="text-slate-600 text-sm">Overview of all classes and sections</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus size={20} /> Add New Class
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 focus-within:border-blue-600 focus-within:ring-1 ring-blue-100 transition-all w-full md:w-96">
          <Search className="text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by class or teacher..."
            className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <div key={cls.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{cls.name} <span className="text-slate-500 font-normal">- {cls.section}</span></h3>
              <p className="text-slate-600 text-sm mt-1">Teacher: <span className="font-medium text-slate-800">{cls.teacher}</span></p>

              <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-slate-400" />
                  <span>{cls.students} Students</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} className="text-slate-400" />
                  <span>{cls.subjects} Subjects</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            No classes found matching your search.
          </div>
        )}

        {/* Add New Class Card Placeholder */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-600 transition-all min-h-50"
        >
          <Plus size={32} />
          <span className="font-medium mt-2">Create New Class</span>
        </button>
      </div>

      {/* Create/Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 transform scale-100 transition-all">
            <h3 className="text-lg font-bold mb-4 text-slate-900">{editingClass ? 'Edit Class' : 'Create New Class'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Class Name</label>
                <select
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 bg-white text-slate-800"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                >
                  <option>Class 12</option>
                  <option>Class 11</option>
                  <option>Class 10</option>
                  <option>Class 9</option>
                  <option>Class 8</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800"
                  placeholder="e.g. A"
                  value={newClass.section}
                  onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Class Teacher</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800"
                  placeholder="Enter teacher name"
                  value={newClass.teacher}
                  onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                />
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
                onClick={handleAddClass}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                {editingClass ? 'Update Class' : 'Create Class'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassManagement;

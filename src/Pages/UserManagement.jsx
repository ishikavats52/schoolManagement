// import React, { useState } from 'react';
// import { Search, Filter, Shield, User, Trash2, Edit } from 'lucide-react';
// import Toast from '../Components/Toast';

// const UserManagement = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [toast, setToast] = useState(null);

//   // Form State
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

//   const [users, setUsers] = useState([
//     { id: 1, name: 'Dr. Robert Smith', role: 'Principal', email: 'principal@school.com', status: 'Active' },
//     { id: 2, name: 'Sarah Wilson', role: 'Teacher', email: 'sarah.d@school.com', status: 'Active' },
//     { id: 3, name: 'John Doe', role: 'Student', email: 'john.d@student.com', status: 'Inactive' },
//     { id: 4, name: 'Emily Davis', role: 'Admissions', email: 'admissions@school.com', status: 'Active' },
//     { id: 5, name: 'Michael Brown', role: 'Parent', email: 'michael.b@parent.com', status: 'Active' },
//     { id: 6, name: 'James Wilson', role: 'Teacher', email: 'james.w@school.com', status: 'Active' },
//     { id: 7, name: 'Lisa Ray', role: 'Student', email: 'lisa.r@student.com', status: 'Active' },
//     { id: 8, name: 'Karen Lee', role: 'Parent', email: 'karen.l@parent.com', status: 'Active' },
//   ]);

//   const tabs = [
//     { id: 'all', label: 'All Users' },
//     { id: 'principal', label: 'Principal' },
//     { id: 'teacher', label: 'Teachers' },
//     { id: 'student', label: 'Students' },
//     { id: 'parent', label: 'Parents' },
//     { id: 'admission', label: 'Admissions' },
//   ];

//   // Filter Logic
//   const filteredUsers = users.filter(user => {
//     const matchesTab = activeTab === 'all' ||
//       (activeTab === 'admission' ? user.role === 'Admissions' : user.role.toLowerCase() === activeTab);
//     const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//   };

//   const handleAddUser = () => {
//     if (!newUser.name || !newUser.email) {
//       showToast('Please fill in all required fields', 'error');
//       return;
//     }

//     if (editingUser) {
//       // Update existing user
//       setUsers(users.map(user =>
//         user.id === editingUser.id
//           ? { ...user, ...newUser }
//           : user
//       ));
//       showToast(`User "${newUser.name}" updated successfully!`, 'success');
//       setEditingUser(null);
//     } else {
//       // Add new user
//       const id = users.length + 1;
//       setUsers([...users, { id, ...newUser, status: 'Active' }]);
//       showToast(`User "${newUser.name}" added successfully!`, 'success');
//     }

//     setNewUser({ name: '', email: '', role: 'Student' });
//     setIsModalOpen(false);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setNewUser({ name: user.name, email: user.email, role: user.role });
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     const userToDelete = users.find(u => u.id === id);
//     if (window.confirm(`Are you sure you want to delete "${userToDelete.name}"?`)) {
//       setUsers(users.filter(user => user.id !== id));
//       showToast(`User "${userToDelete.name}" deleted successfully!`, 'success');
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingUser(null);
//     setNewUser({ name: '', email: '', role: 'Student' });
//   };

//   return (
//     <div className="space-y-6">
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
//           <p className="text-slate-600 text-sm">Manage system access and permissions</p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
//         >
//           <User size={20} /> Add New User
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-slate-200">
//         <nav className="flex space-x-8 overflow-x-auto pb-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
//                 ? 'border-blue-600 text-blue-700'
//                 : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
//                 }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
//           <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full md:w-64 focus-within:border-blue-600 focus-within:ring-1 ring-blue-100 transition-all">
//             <Search className="text-slate-500" size={18} />
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
//               <Filter size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-slate-700">
//             <thead className="bg-slate-50 text-slate-800 uppercase font-semibold">
//               <tr>
//                 <th className="px-6 py-4">User</th>
//                 <th className="px-6 py-4">Role</th>
//                 <th className="px-6 py-4">Email</th>
//                 <th className="px-6 py-4">Status</th>
//                 <th className="px-6 py-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-6 py-4 flex items-center gap-3">
//                       <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
//                         {user.role === 'Admin' || user.role === 'Principal' ? <Shield size={14} /> : <User size={14} />}
//                       </div>
//                       <span className="font-medium text-slate-900">{user.name}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold border border-slate-200">{user.role}</span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-600">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
//                         }`}>
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           onClick={() => handleEdit(user)}
//                           className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
//                           title="Edit"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user.id)}
//                           className="text-slate-400 hover:text-rose-600 transition-colors p-2 hover:bg-rose-50 rounded-lg"
//                           title="Delete"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
//                     No users found matching your filters.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add/Edit User Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
//           <div className="bg-white p-6 rounded-2xl shadow-xl w-96 transform scale-100 transition-all">
//             <h3 className="text-lg font-bold mb-4 text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800"
//                   placeholder="e.g. John Doe"
//                   value={newUser.name}
//                   onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800"
//                   placeholder="john@example.com"
//                   value={newUser.email}
//                   onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
//                 <select
//                   className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800 bg-white"
//                   value={newUser.role}
//                   onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                 >
//                   <option value="Student">Student</option>
//                   <option value="Teacher">Teacher</option>
//                   <option value="Parent">Parent</option>
//                   <option value="Principal">Principal</option>
//                   <option value="Admissions">Admissions</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 mt-8">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddUser}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
//               >
//                 {editingUser ? 'Update User' : 'Create User'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;
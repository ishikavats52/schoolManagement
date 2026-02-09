import React, { useState } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, GraduationCap,
    MapPin, Phone, Mail, User, FileText, Calendar, Check, X,
    ChevronRight, ArrowUpRight, CreditCard, Key, Upload, Download
} from 'lucide-react';
import Toast from '../Components/Toast';

const StudentManagement = ({ view = 'directory' }) => {
    // Core state
    const [currentView, setCurrentView] = useState(view);
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

    // Sync prop changes to state
    React.useEffect(() => {
        setCurrentView(view);
    }, [view]);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const [editingStudent, setEditingStudent] = useState(null);

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setCurrentView('edit_student');
    };

    const handleSaveStudent = (studentData) => {
        if (editingStudent) {
            setStudents(students.map(s => s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s));
            showToast('Student Updated Successfully');
        } else {
            const newStudent = {
                id: students.length + 1,
                studentId: studentData.admissionNo || `STU00${students.length + 1}`,
                ...studentData,
                name: `${studentData.firstName} ${studentData.lastName}`, // Ensure name is constructed for display
                parentName: studentData.fatherName || studentData.motherName || studentData.guardianName, // Ensure parentName is constructed
                attendance: 0,
                status: 'Active',
                hasLogin: false,
                username: ''
            };
            setStudents([...students, newStudent]);
            showToast('Student Added Successfully');
        }
        setEditingStudent(null);
        setCurrentView('directory');
    };

    const renderView = () => {
        switch (currentView) {
            case 'directory': return <StudentDirectory students={students} setStudents={setStudents} showToast={showToast} onEditStudent={handleEditStudent} onAddStudent={() => { setEditingStudent(null); setCurrentView('add_student'); }} />;
            case 'attendance': return <StudentAttendance students={students} setStudents={setStudents} showToast={showToast} />;
            case 'promotion': return <StudentPromotion students={students} setStudents={setStudents} showToast={showToast} />;
            case 'documents': return <StudentDocuments students={students} showToast={showToast} />;
            case 'id_cards': return <StudentIDCards students={students} showToast={showToast} />;
            case 'credentials': return <StudentCredentials students={students} setStudents={setStudents} showToast={showToast} />;
            case 'credentials': return <StudentCredentials students={students} setStudents={setStudents} showToast={showToast} />;
            case 'add_student': return <AddStudentForm onBack={() => { setCurrentView('directory'); setEditingStudent(null); }} onSave={handleSaveStudent} showToast={showToast} initialData={editingStudent} />;
            case 'edit_student': return <AddStudentForm onBack={() => { setCurrentView('directory'); setEditingStudent(null); }} onSave={handleSaveStudent} showToast={showToast} initialData={editingStudent} />;
            default: return <StudentDirectory students={students} setStudents={setStudents} showToast={showToast} onEditStudent={handleEditStudent} onAddStudent={() => { setEditingStudent(null); setCurrentView('add_student'); }} />;
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    {currentView === 'directory' && 'Student Directory'}
                    {currentView === 'attendance' && 'Attendance Control'}
                    {currentView === 'promotion' && 'Student Promotion'}
                    {currentView === 'documents' && 'Document Management'}
                    {currentView === 'id_cards' && 'ID Card Generation'}
                    {currentView === 'credentials' && 'Login Credentials'}
                    {currentView === 'add_student' && 'Add New Student'}
                </h1>
                <p className="text-slate-600 text-sm">
                    {currentView === 'directory' && 'Manage student records and profiles'}
                    {currentView === 'attendance' && 'Track and mark student attendance'}
                    {currentView === 'promotion' && 'Promote students to next academic year'}
                    {currentView === 'documents' && 'Upload and manage student documents'}
                    {currentView === 'id_cards' && 'Generate and print student ID cards'}
                    {currentView === 'credentials' && 'Manage student login access and passwords'}
                    {currentView === 'add_student' && 'Enter student details to create a new record'}
                </p>
            </div>

            {renderView()}
        </div>
    );
};

// ... (Rest of existing components: StudentDirectory, StudentAttendance, etc.)



// ... other components ...

const AddStudentForm = ({ onBack, onSave, showToast, initialData }) => {
    // Form state - using a single state object for simplicity in this demo
    const [formData, setFormData] = useState({
        academicYear: 'June 2024/25', admissionDate: '', admissionNo: '', rollNo: '',
        status: 'Active', firstName: '', lastName: '', class: '', section: '',
        gender: '', dob: '', bloodGroup: '', house: '', religion: '', category: '',
        phone: '', email: '', password: '', caste: '', motherTongue: '', languagesKnown: ['English', 'Spanish'],
        currentAddress: '', permanentAddress: '',

        fatherName: '', fatherEmail: '', fatherPhone: '', fatherOccupation: '',
        motherName: '', motherEmail: '', motherPhone: '', motherOccupation: '',

        guardianName: '', guardianRelation: '', guardianPhone: '', guardianEmail: '',

        transportRoute: '', vehicleNo: '', pickupPoint: '',
        hostelName: '', roomNo: '',

        medicalCondition: 'Good', allergies: ['Peanuts'], medications: ['Inhaler'],
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const fileInputRef = React.useRef(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                showToast('File size must be less than 4MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoPreview(null);
        setFormData(prev => ({ ...prev, photo: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Father's Photo Logic
    const [fatherPhotoPreview, setFatherPhotoPreview] = useState(null);
    const fatherFileInputRef = React.useRef(null);

    const handleFatherPhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                showToast('File size must be less than 4MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFatherPhotoPreview(reader.result);
                setFormData(prev => ({ ...prev, fatherPhoto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFatherPhoto = () => {
        setFatherPhotoPreview(null);
        setFormData(prev => ({ ...prev, fatherPhoto: null }));
        if (fatherFileInputRef.current) {
            fatherFileInputRef.current.value = '';
        }
    };

    const triggerFatherFileInput = () => {
        fatherFileInputRef.current.click();
    };

    // Mother's Photo Logic
    const [motherPhotoPreview, setMotherPhotoPreview] = useState(null);
    const motherFileInputRef = React.useRef(null);

    const handleMotherPhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                showToast('File size must be less than 4MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setMotherPhotoPreview(reader.result);
                setFormData(prev => ({ ...prev, motherPhoto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveMotherPhoto = () => {
        setMotherPhotoPreview(null);
        setFormData(prev => ({ ...prev, motherPhoto: null }));
        if (motherFileInputRef.current) {
            motherFileInputRef.current.value = '';
        }
    };

    const triggerMotherFileInput = () => {
        motherFileInputRef.current.click();
    };

    React.useEffect(() => {
        if (initialData) {
            // Handle data mapping for legacy/mock data or ensure fields are populated
            const parsedData = { ...initialData };

            // Split name if firstName/lastName are missing
            if ((!parsedData.firstName || !parsedData.lastName) && parsedData.name) {
                const nameParts = parsedData.name.split(' ');
                parsedData.firstName = nameParts[0] || '';
                parsedData.lastName = nameParts.slice(1).join(' ') || '';
            }

            // Map generic parent info if specific fields are missing
            if (!parsedData.fatherName && !parsedData.motherName && parsedData.parentName) {
                parsedData.fatherName = parsedData.parentName; // Default to father fields for display
            }
            if (!parsedData.fatherPhone && !parsedData.motherPhone && parsedData.parentPhone) {
                parsedData.fatherPhone = parsedData.parentPhone;
            }

            setFormData(prev => ({
                ...prev,
                ...parsedData
            }));

            if (parsedData.photo) {
                setPhotoPreview(parsedData.photo);
            }
            if (parsedData.fatherPhoto) {
                setFatherPhotoPreview(parsedData.fatherPhoto);
            }
            if (parsedData.motherPhoto) {
                setMotherPhotoPreview(parsedData.motherPhoto);
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="space-y-6 pb-10">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-4 transition-colors">
                <ChevronRight className="rotate-180" size={20} /> Back to Directory
            </button>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <h2 className="font-bold text-slate-800">Personal Information</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Photo Upload */}
                        <div className="flex flex-col gap-3 shrink-0">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <div
                                onClick={triggerFileInput}
                                className={`w-32 h-32 rounded-xl border-2 border-dashed ${photoPreview ? 'border-blue-500' : 'border-slate-300'} bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors group overflow-hidden relative`}
                            >
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Student Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload size={24} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-medium">Upload Photo</span>
                                    </>
                                )}
                            </div>
                            {photoPreview && (
                                <button onClick={handleRemovePhoto} className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
                            )}
                            <p className="text-[10px] text-slate-400 text-center max-w-[128px]">Max size 4MB, JPG/PNG</p>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Academic Year</label>
                                <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option>June 2024/25</option>
                                    <option>June 2025/26</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Admission Number</label>
                                <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="e.g. ADM2024001" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Admission Date <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" />
                                    <Calendar className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Roll Number</label>
                                <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="e.g. 101" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="John" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="Doe" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Class <span className="text-red-500">*</span></label>
                                <select name="class" value={formData.class} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option value="">Select Class</option>
                                    <option>Class 1</option>
                                    <option>Class 10</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Section</label>
                                <select name="section" value={formData.section} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option value="">Select Section</option>
                                    <option>A</option>
                                    <option>B</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Date of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option>Select</option>
                                    <option>A+</option>
                                    <option>O+</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Primary Contact</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="+1 234..." />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="student@example.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" placeholder="Enter Password" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Mother Tongue</label>
                                <select name="motherTongue" value={formData.motherTongue} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700">
                                    <option>Select</option>
                                    <option>English</option>
                                    <option>Hindi</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-semibold text-slate-600">Languages Known</label>
                                <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg bg-white min-h-[38px]">
                                    {formData.languagesKnown.map((lang, idx) => (
                                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                                            {lang}
                                            <button className="hover:text-red-500"><X size={12} /></button>
                                        </span>
                                    ))}
                                    <input type="text" placeholder="Add..." className="bg-transparent outline-none text-xs min-w-[60px] flex-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Parents & Guardian */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    <h2 className="font-bold text-slate-800">Parents & Guardian Information</h2>
                </div>

                <div className="p-6 space-y-8">
                    {/* Father */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Father's Info</h3>
                        <div className="flex items-start gap-6">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="file"
                                    ref={fatherFileInputRef}
                                    onChange={handleFatherPhotoUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className={`w-24 h-24 rounded-xl border ${fatherPhotoPreview ? 'border-blue-500' : 'border-slate-200'} bg-slate-50 flex items-center justify-center text-slate-400 overflow-hidden relative`}>
                                    {fatherPhotoPreview ? (
                                        <img src={fatherPhotoPreview} alt="Father" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={triggerFatherFileInput} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">Upload</button>
                                    {fatherPhotoPreview && (
                                        <button onClick={handleRemoveFatherPhoto} className="px-3 py-1 bg-red-50 border border-red-100 rounded text-xs font-medium text-red-600 hover:bg-red-100">Remove</button>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Father Name</label>
                                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Email</label>
                                    <input type="email" name="fatherEmail" value={formData.fatherEmail} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                                    <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Occupation</label>
                                    <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mother */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Mother's Info</h3>
                        <div className="flex items-start gap-6">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="file"
                                    ref={motherFileInputRef}
                                    onChange={handleMotherPhotoUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className={`w-24 h-24 rounded-xl border ${motherPhotoPreview ? 'border-blue-500' : 'border-slate-200'} bg-slate-50 flex items-center justify-center text-slate-400 overflow-hidden relative`}>
                                    {motherPhotoPreview ? (
                                        <img src={motherPhotoPreview} alt="Mother" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={triggerMotherFileInput} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">Upload</button>
                                    {motherPhotoPreview && (
                                        <button onClick={handleRemoveMotherPhoto} className="px-3 py-1 bg-red-50 border border-red-100 rounded text-xs font-medium text-red-600 hover:bg-red-100">Remove</button>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Mother Name</label>
                                    <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Email</label>
                                    <input type="email" name="motherEmail" value={formData.motherEmail} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                                    <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600">Occupation</label>
                                    <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guardian Details */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Guardian Details</h3>
                        <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <input type="radio" name="guardian" id="g_parents" className="text-blue-600" defaultChecked />
                                <label htmlFor="g_parents" className="text-sm text-slate-700">Parents</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" name="guardian" id="g_guardian" className="text-blue-600" />
                                <label htmlFor="g_guardian" className="text-sm text-slate-700">Other Guardian</label>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Guardian Name</label>
                                <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Relation</label>
                                <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Phone</label>
                                <input type="text" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600">Email</label>
                                <input type="text" name="guardianEmail" value={formData.guardianEmail} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-slate-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <h2 className="font-bold text-slate-800">Address</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600">Current Address</label>
                        <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 text-slate-700 h-24 resize-none"></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600">Permanent Address</label>
                        <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 text-slate-700 h-24 resize-none"></textarea>
                    </div>
                </div>
            </div>

            {/* Transport & Hostel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Transport */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                            <h2 className="font-bold text-slate-800">Transport Information</h2>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Route</label>
                            <select name="transportRoute" value={formData.transportRoute} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-slate-700">
                                <option>Select Route</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Pickup Point</label>
                            <select name="pickupPoint" value={formData.pickupPoint} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-slate-700">
                                <option>Select Pickup Point</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Hostel */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                            <h2 className="font-bold text-slate-800">Hostel Information</h2>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Hostel Name</label>
                            <select name="hostelName" value={formData.hostelName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 text-slate-700">
                                <option>Select Hostel</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Room Number</label>
                            <input type="text" name="roomNo" value={formData.roomNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 text-slate-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                    <h2 className="font-bold text-slate-800">Documents</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600">Transfer Certificate</label>
                        <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">No file chosen</span>
                            <button className="text-xs bg-slate-100 px-3 py-1.5 rounded hover:bg-slate-200 text-slate-700 font-medium">Upload</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600">Birth Certificate</label>
                        <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">No file chosen</span>
                            <button className="text-xs bg-slate-100 px-3 py-1.5 rounded hover:bg-slate-200 text-slate-700 font-medium">Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                    <h2 className="font-bold text-slate-800">Medical History</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-700">Medical Condition of Student:</span>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input type="radio" name="medicalCondition" value="Good" checked={formData.medicalCondition === 'Good'} onChange={handleChange} className="text-teal-600" /> Good
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input type="radio" name="medicalCondition" value="Bad" checked={formData.medicalCondition === 'Bad'} onChange={handleChange} className="text-teal-600" /> Bad
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Allergies</label>
                            <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg bg-white min-h-[38px]">
                                {formData.allergies.map((item, idx) => (
                                    <span key={idx} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-red-100">
                                        {item}
                                        <button className="hover:text-red-800"><X size={12} /></button>
                                    </span>
                                ))}
                                <input type="text" placeholder="Add..." className="bg-transparent outline-none text-xs min-w-[60px] flex-1" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Medications</label>
                            <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg bg-white min-h-[38px]">
                                {formData.medications.map((item, idx) => (
                                    <span key={idx} className="bg-teal-50 text-teal-600 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-teal-100">
                                        {item}
                                        <button className="hover:text-teal-800"><X size={12} /></button>
                                    </span>
                                ))}
                                <input type="text" placeholder="Add..." className="bg-transparent outline-none text-xs min-w-[60px] flex-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={() => onSave(formData)} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    {initialData ? 'Update Student' : 'Save Student'}
                </button>
            </div>
        </div>
    );
};


/* --- Sub-Components --- */

/* --- Sub-Components --- */

const StudentDirectory = ({ students, setStudents, showToast, onAddStudent, onEditStudent }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <button onClick={onAddStudent} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
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
                                            onClick={() => onEditStudent(student)}
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
                    <div key={student.id} className="flex items-center justify-between p-3 border-b text-slate-600 border-slate-100 last:border-0 hover:bg-slate-50 transition">
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
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border text-slate-600 border-slate-200 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                <span>Birth Certificate</span>
                            </div>
                            <button onClick={() => handleView('Birth Certificate')} className="text-blue-600 hover:underline">View</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border text-slate-600 border-slate-200 text-sm">
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

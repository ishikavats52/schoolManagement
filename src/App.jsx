import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout"
import ClassManagement from "./Pages/ClassManagement"
import FeeManagement from "./Pages/FeeManagement"
import Home from "./Pages/Home"
import Exams from "./Pages/Exams"
import ParentManagement from "./Pages/ParentManagement"
import TeacherManagement from "./Pages/TeacherManagement"
import PrincipalManagement from "./Pages/PrincipalManagement";
import StudentManagement from "./Pages/StudentManagement"
import AdmissionManagement from "./Pages/AdmissionManagement"
import SalaryManagement from "./Pages/SalaryManagement"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/classmateManagement' element={<ClassManagement />} />

          {/* Parent Management Routes */}
          <Route path='/ParentManagement' element={<ParentManagement view="directory" />} />
          <Route path='/parents/login-control' element={<ParentManagement view="login" />} />
          <Route path='/parents/notifications' element={<ParentManagement view="notifications" />} />
          <Route path='/parents/activity' element={<ParentManagement view="activity" />} />

          {/* Teacher Management Routes */}
          <Route path='/TeacherManagement' element={<TeacherManagement view="directory" />} />
          <Route path='/teachers/timetable' element={<TeacherManagement view="timetable" />} />
          <Route path='/teachers/attendance' element={<TeacherManagement view="attendance" />} />
          <Route path='/teachers/leaves' element={<TeacherManagement view="leaves" />} />
          <Route path='/teachers/credentials' element={<TeacherManagement view="credentials" />} />

          {/* Principal Management Routes */}
          <Route path='/PrincipalManagement' element={<PrincipalManagement view="directory" />} />
          <Route path='/principals/permissions' element={<PrincipalManagement view="permissions" />} />
          <Route path='/principals/reports' element={<PrincipalManagement view="reports" />} />
          <Route path='/principals/performance' element={<PrincipalManagement view="performance" />} />
          <Route path='/principals/communication' element={<PrincipalManagement view="communication" />} />

          {/* Student Management Routes */}
          <Route path='/StudentManagement' element={<StudentManagement view="directory" />} />
          <Route path='/students/attendance' element={<StudentManagement view="attendance" />} />
          <Route path='/students/promotion' element={<StudentManagement view="promotion" />} />
          <Route path='/students/documents' element={<StudentManagement view="documents" />} />
          <Route path='/students/id-cards' element={<StudentManagement view="id_cards" />} />
          <Route path='/students/credentials' element={<StudentManagement view="credentials" />} />

          {/* Admission Management Routes */}
          <Route path='/AdmissionManagement' element={<AdmissionManagement view="dashboard" />} />
          <Route path='/admissions/applications' element={<AdmissionManagement view="applications" />} />
          <Route path='/admissions/forms' element={<AdmissionManagement view="forms" />} />

          <Route path='/SalaryManagement' element={<SalaryManagement />} />
          <Route path='/FeeManagement' element={<FeeManagement />} />
          <Route path='/exams' element={<Exams />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

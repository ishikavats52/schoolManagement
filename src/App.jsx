import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout"
import ClassManagement from "./Pages/ClassManagement"
import FeeManagement from "./Pages/FeeManagement"
import UserManagement from "./Pages/UserManagement"
import Home from "./Pages/Home"
import Exams from "./Pages/Exams"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/classmateManagement' element={<ClassManagement />} />
          <Route path='/FeeManagement' element={<FeeManagement />} />
          <Route path='/UserManagement' element={<UserManagement />} />
          <Route path='/exams' element={<Exams />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

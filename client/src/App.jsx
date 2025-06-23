import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from './pages/NotFound';
import { HrProjectManagement } from './pages/HrProjectManagement';
import { HrCourseManagement } from './pages/HrCourseManagement';
import { HrEmployeeManagement } from './pages/HrEmployeeManagement';
import { HrEmployeeDetail } from './pages/HrEmployeeDetail';
import { HrCreateCourse } from './pages/HrCreateCourse';
import { HrOverviewLearning } from './pages/Hroverviewlearn';
import './App.css'
import './index.css'
import { GeoFencing } from './components/employeeManagement/GeoFencing';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login/>}></Route>
        <Route path="/project" element={<HrProjectManagement/>}></Route>
        <Route path="/course" element={<HrCourseManagement/>}></Route>
        <Route path="/employee" element={<HrEmployeeManagement/>}></Route>
        <Route path="/employee/role" element={<GeoFencing/>}></Route>
        <Route path="/employee/details"  element={<HrEmployeeDetail/>}></Route>
        <Route path="/createcourse" element={<HrCreateCourse/>}></Route>
        <Route path="/overviewlearning" element={<HrOverviewLearning/>}></Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

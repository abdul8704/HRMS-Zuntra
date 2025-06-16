import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar"
import { CourseCard } from "./components/courseManagement/CourseCard"
import { NotFound } from './pages/NotFound';
import { HrProjectManagement } from './pages/HrProjectManagement';
import './App.css'
import { HrCourseManagement } from './pages/HrCourseManagement';
import { HrEmployeeManagement } from './pages/HrEmployeeManagement';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Sidebar/>}></Route>
        <Route path="/project" element={<HrProjectManagement/>}></Route>
        <Route path="/course" element={<HrCourseManagement/>}></Route>
        <Route path="/employee" element={<HrEmployeeManagement/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

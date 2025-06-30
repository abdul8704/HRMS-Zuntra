import { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from './pages/NotFound';
import { HrProjectDetails } from './pages/HrProjectDetails';
import { HrProjectManagement } from './pages/HrProjectManagement';
import { HrCourseManagement } from './pages/HrCourseManagement';
import { HrEmployeeManagement } from './pages/HrEmployeeManagement';
import { HrEmployeeDetail } from './pages/HrEmployeeDetail';
import  HrCreateCourse  from './pages/HrCreateCourse';
import { HrOverviewLearning } from './pages/Hroverviewlearn';
import { NewUser } from "./pages/NewUser";
import { GeoFencing } from './components/employeeManagement/GeoFencing';
import { HrPersonalAttendance } from './pages/HrPersonalAttendance';
import { Upskill } from './pages/Upskill';
import { DashBoard } from './pages/DashBoard';
import { HrUpskillSideBar } from './pages/HrUpskillSideBar';
import './App.css'
import './index.css'

function App() {
  const [userid, setUserid] = useState('');

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/" element={<Login/>}></Route>
        {/* <Route path="/hrupskill" element={<HrUpskillLearn/>}></Route> */}
        <Route path="/newuser" element={<NewUser/>} />
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/projects/:navId" element={<HrProjectManagement/>}></Route>
        <Route path="/project/:projectId/:navId" element={<HrProjectDetails/>}></Route>
        <Route path="/employee/:navId" element={<HrEmployeeManagement/>}></Route>
        <Route path="/employee/details"  element={<HrEmployeeDetail/>}></Route>
        <Route path="/courses/:navId" element={<HrCourseManagement/>}></Route>
        <Route path="/attendance" element={<HrPersonalAttendance/>}></Route>
        <Route path="/upskill/:navId" element={<Upskill/>}></Route>
        <Route path="/createcourse" element={<HrCreateCourse/>}></Route>
        <Route path="/overviewlearning" element={<HrOverviewLearning/>}></Route>
        <Route path="/hrupskillsidebar" element={<HrUpskillSideBar/>}></Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { DashBoard } from './pages/DashBoard';
import { NotFound } from './pages/NotFound';
import { CourseManagement } from './pages/CourseManagement';
import { CourseIntro } from './pages/CourseIntro';
import { CourseLearn } from './pages/CourseLearn';
import { ProjectOverview } from './pages/ProjectOverview';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { EmployeeManagement } from './pages/EmployeeManagement';
import { HrProjectDetails } from './pages/HrProjectDetails';
import { HrProjectManagement } from './pages/HrProjectManagement';
import  HrCreateCourse  from './pages/HrCreateCourse';
import { Upskill } from './pages/Upskill';
import { Attendance } from './pages/Attendance';
import './App.css'
import './index.css'
import { NewUser } from './pages/NewUser';


function App() {
  const [userid, setUserid] = useState('');

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        {/* <Route path="/hrupskill" element={<HrUpskillLearn/>}></Route> */}
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/employee/:navId" element={<EmployeeManagement/>}></Route>
        <Route path="/employee/:empId/details/:navId"  element={<EmployeeDetails type={"user"}/>}></Route>
        <Route path="/employee/role/:roleId/details"  element={<EmployeeDetails type={"role"}/>}></Route>
        <Route path="/courses/:navId" element={<CourseManagement/>}></Route>
        <Route path="
        
        
        
        " element={<CourseIntro/>}></Route>
        <Route path="/course/learn/:courseId" element={<CourseLearn />}></Route>
        <Route path="/projectoverview" element={<ProjectOverview />}></Route>
        <Route path="/projects/:navId" element={<HrProjectManagement/>}></Route>
        <Route path="/project/:projectId/:navId" element={<HrProjectDetails/>}></Route>
        <Route path="/attendance" element={<Attendance/>}></Route>
        <Route path="/upskill/:navId" element={<Upskill/>}></Route>
        <Route path="/createcourse" element={<HrCreateCourse/>}></Route>
        <Route path="/newuser" element={<NewUser/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

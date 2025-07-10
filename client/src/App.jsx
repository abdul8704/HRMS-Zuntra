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
import { HrPersonalAttendance } from './pages/HrPersonalAttendance';
import { ProtectRoute } from './ProtectRoute';
import './App.css'
import './index.css'


function App() {
  const [userid, setUserid] = useState('');

 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectRoute>
            <DashBoard />
          </ProtectRoute>
        }/>

        <Route path="/employee/:navId" element={
          <ProtectRoute>
            <EmployeeManagement />
          </ProtectRoute>
        }/>

        <Route path="/employee/:empId/details/:navId" element={
          <ProtectRoute>
            <EmployeeDetails type="user" />
          </ProtectRoute>
        }/>

        <Route path="/employee/role/:roleId/details" element={
          <ProtectRoute>
            <EmployeeDetails type="role" />
          </ProtectRoute>
        }/>

        <Route path="/courses/:navId" element={
          <ProtectRoute>
            <CourseManagement />
          </ProtectRoute>
        }/>

        <Route path="/course/:courseId/intro" element={
          <ProtectRoute>
            <CourseIntro />
          </ProtectRoute>
        }/>

        <Route path="/course/learn/:courseId" element={
          <ProtectRoute>
            <CourseLearn />
          </ProtectRoute>
        }/>

        <Route path="/projectoverview" element={
          <ProtectRoute>
            <ProjectOverview />
          </ProtectRoute>
        }/>

        <Route path="/projects/:navId" element={
          <ProtectRoute>
            <HrProjectManagement />
          </ProtectRoute>
        }/>

        <Route path="/project/:projectId/:navId" element={
          <ProtectRoute>
            <HrProjectDetails />
          </ProtectRoute>
        }/>

        <Route path="/attendance/:navId" element={
          <ProtectRoute>
            <Attendance />
          </ProtectRoute>
        }/>

        <Route path="/attendance/" element={
          <ProtectRoute>
            <HrPersonalAttendance />
          </ProtectRoute>
        }/>

        <Route path="/upskill/:navId" element={
          <ProtectRoute>
            <Upskill />
          </ProtectRoute>
        }/>

        <Route path="/createcourse" element={
          <ProtectRoute>
            <HrCreateCourse />
          </ProtectRoute>
        }/>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

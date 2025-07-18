import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { DashBoard } from './pages/dashboard/DashBoard';
import { NotFound } from './pages/NotFound';
import { CourseManagement } from './pages/course/CourseManagement';
import { CourseIntro } from './pages/course/CourseIntro';
import { CourseLearn } from './pages/course/CourseLearn';
import { ProjectOverview } from './pages/project/ProjectOverview';
import { EmployeeDetails } from './pages/employee/EmployeeDetails';
import { EmployeeManagement } from './pages/employee/EmployeeManagement';
import { HrProjectDetails } from './pages/HrProjectDetails';
import { HrProjectManagement } from './pages/project/HrProjectManagement';
import { Upskill } from './pages/course/Upskill';
import { Attendance } from './pages/attendance/Attendance';
import { HrPersonalAttendance } from './pages/HrPersonalAttendance';
import './App.css'
import './index.css'


function App() {
  const [userid, setUserid] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <DashBoard />
        } />

        <Route path="/employee/:navId" element={
          <EmployeeManagement />
        } />

        <Route path="/employee/:empId/details/:navId" element={
          <EmployeeDetails type="user" />
        } />

        <Route path="/employee/role/:roleId/details" element={
          <EmployeeDetails type="role" />
        } />

        <Route path="/courses/:navId" element={
          <CourseManagement />
        } />

        <Route path="/course/:courseId/intro" element={
          <CourseIntro />
        } />

        <Route path="/course/learn/:courseId" element={
          <CourseLearn />
        } />

        <Route path="/projects/:navId" element={<ProjectOverview />} />
        {/* <Route path="/projects/:navId" element={<HrProjectManagement />} /> */}


        <Route path="/project/:projectId/:navId" element={
          <HrProjectDetails />
        } />

        <Route path="/attendance/:navId" element={
          <Attendance />
        } />

        <Route path="/attendance/" element={
          <HrPersonalAttendance />
        } />

        <Route path="/upskill/:navId" element={
          <Upskill />
        } />


        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

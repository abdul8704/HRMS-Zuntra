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
import { ProtectRoute } from './pages/ProtectRoute';
import './App.css'
import './index.css'
import { ShiftDetails } from './pages/employee/components/ShiftDetails';


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

        <Route path="/shift/details" element={
          <ProtectRoute>
            <ShiftDetails />
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

        <Route path="/projects/:navId" element={
          <ProtectRoute>
            {/* <HrProjectManagement /> */}
            <ProjectOverview />
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


        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { DashBoard } from './pages/dashboard/DashBoard';
import { NotFound } from './pages/NotFound';
import { CourseManagement } from './pages/course/CourseManagement';
import { CourseIntro } from './pages/course/CourseIntro';
import { CourseLearn } from './pages/course/CourseLearn';
import { ProjectDetails } from './pages/project/ProjectDetails';
import { EmployeeDetails } from './pages/employee/EmployeeDetails';
import { EmployeeManagement } from './pages/employee/EmployeeManagement';
import { ProjectManagement } from './pages/project/ProjectManagement';
import { Upskill } from './pages/course/Upskill';
import { Attendance } from './pages/attendance/Attendance';
import { HrPersonalAttendance } from './pages/HrPersonalAttendance';
import { CeoDashboard } from './pages/dashboard/CeoDashboard';
import { CompanyDocs } from './pages/companyDocs/CompanyDocs';
import { ToDo } from './pages/project/ToDo';
import { Progress } from './pages/project/Progress';
import { Review } from './pages/project/Review';
import { Completed } from './pages/project/Completed';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import './index.css'
// Remove this import since ShiftDetails will be part of EmployeeManagement
// import { ShiftDetails } from './pages/employee/components/ShiftDetails';
import { Unauthorized } from './pages/Unauthorized';
import { RemoveEmployeePopup } from './pages/employee/components/RemoveEmployeePopup';
import { NewUser } from './pages/dashboard/NewUser';
import { TeamsDashboard } from './pages/teams/TeamsDashboard';


function App() {
  const [userid, setUserid] = useState('');

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/employee/:navId" element={<EmployeeManagement />} />
            <Route path="/employee/:empId/details/:navId" element={<EmployeeDetails type="user" />} />
            <Route path="/employee/role/:roleId/details" element={<EmployeeDetails type="role" />} />
            <Route path="/course/:courseId/details" element={<EmployeeDetails type="course" />} />
            <Route path="/courses/:navId" element={<CourseManagement />} />
            <Route path="/course/:courseId/intro" element={<CourseIntro />} />
            <Route path="/course/learn/:courseId" element={<CourseLearn />} />
            <Route path="/projects/:navId" element={<ProjectManagement />} />
            <Route path="/project/:projectId/:navId" element={<ProjectDetails />} />
            <Route path="/attendance/:navId" element={<Attendance />} />
            <Route path="/attendance/" element={<HrPersonalAttendance />} />
            <Route path="/upskill/:navId" element={<Upskill />} />
            <Route path="/documents/:navId" element={<CompanyDocs />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/review" element={<Review />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/ceo" element={<CeoDashboard />} />
            <Route path="/remove-emp-request" element={<RemoveEmployeePopup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Remove the separate ShiftDetails route - it will be part of EmployeeManagement */}
            {/* <Route path="/employee/shifts" element={<ShiftDetails />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="/newdashboard" element={<NewUser />} />
            <Route path="/teams" element={<TeamsDashboard />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
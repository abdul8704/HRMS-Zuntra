import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from "../components/Sidebar";
import { EmpNavbar } from '../components/employeeManagement/EmpNavbar';
import { EmpCard } from '../components/employeeManagement/EmpCard';
import { EmployeeCard } from '../components/employeeManagement/EmployeeCard';
import { EmpRoleCard } from '../components/employeeManagement/EmpRoleCard';
import { AddRolePopup } from '../components/employeeManagement/AddRolePopup';
import { EditRolePopup } from '../components/employeeManagement/EditRolePopup';
import { GeoFencing } from '../components/employeeManagement/GeoFencing';
import { EmpAssignmentPopUp } from '../components/employeeManagement/EmpAssignmentPopUp';
import { AddLocationForm } from '../components/employeeManagement/AddLocationForm';
import api from '../api/axios';

const fetchPendingEmployees = async () => (await api.get('/api/hr/pending')).data.data;
const fetchEmployees = async () => (await api.get('/api/employee')).data.employees;
const fetchAllRoles = async () => {
  const response = await api.get('/api/roles')
  console.log("Roles fetched:", response.data);
  return response.data;
}
const fetchAllBranches = async () => (await api.get('/api/branch')).data.branches;

export const HrEmployeeManagement = () => {
  const { navId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);

  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRolesData(await fetchAllRoles());
        setEmployees(await fetchEmployees());
        setPendingEmployees(await fetchPendingEmployees());
        setBranches(await fetchAllBranches());
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchData();
  }, []);

  const handleEditRole = (roleData) => setEditRoleData(roleData);
  const handleSaveEditedRole = () => setEditRoleData(null);
  const handleCloseEdit = () => setEditRoleData(null);
  const handleClosePopup = () => {
    setShowAssignPopup(false);
    setSelectedEmployee(null);
  };

  const handleApprove = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignPopup(true);
  };

  const handleSaveAssignment = () => handleClosePopup();

  const handleAddNewBranch = async (formData) => {
    try {
      const response = await api.post('/api/branch/new-branch', formData);
      if (response.data.success) {
        setBranches((prev) => [...prev, response.data.branch]);
        setShowLocationForm(false);
      }
    } catch (error) {
      console.error("Error adding new branch:", error);
    }
  };

  const bgClasses = ['#FBEDEA', '#D7B5EB', '#D2EFEA', '#ECECFD'];
  const getGridBgColors = (length, columns, colors) => {
    return Array.from({ length }, (_, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      return colors[(col + row) % colors.length];
    });
  };
  const bgColorList = getGridBgColors(employees.length, 3, bgClasses);

  const roleData = [
    { role: "HR Manager", memberCount: 1, bgColor: "#ffe0dc", ibgcolor: "#f44336" },
    { role: "Executive Manager", memberCount: 2, bgColor: "#d6e9f8", ibgcolor: "#3f51b5" },
    { role: "UI/UX Designer", memberCount: 2, bgColor: "#ffe0dc", ibgcolor: "#f44336" },
    { role: "App Developer", memberCount: 2, bgColor: "#ccfbf1", ibgcolor: "#00acc1" },
    { role: "Web Developer", memberCount: 2, bgColor: "#fbcfe8", ibgcolor: "#e91e63" },
    { role: "Data Scientist", memberCount: 1, bgColor: "#f3e8ff", ibgcolor: "#9c27b0" },
    { role: "DevOps Engineer", memberCount: 2, bgColor: "#c084fc", ibgcolor: "#6200ea" },
    { role: "Marketing", memberCount: 3, bgColor: "#ede9fe", ibgcolor: "#8e24aa" },
    { role: "Content Writer", memberCount: 2, bgColor: "#d9f99d", ibgcolor: "#558b2f" },
  ];
  console.log("Branches: ", branches);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-[1rem]">
        <EmpNavbar />

        {navId === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] px-[1rem] overflow-y-auto h-[calc(100vh-7rem)] mt-[1rem]">
            {employees.map((emp, index) => (
              <EmployeeCard
                key={index}
                name={emp.username}
                email={emp.email}
                phone={emp.phoneNumber}
                image={emp.profilePicture}
                role={emp.role.role}
                inTime="10:00"
                outTime="16:00"
                workTime="10:01"
                breakTime="12:00"
                bgColor={bgColorList[index]}
              />
            ))}
          </div>
        )}

        {navId === "roles" && (
          <div className="p-4 flex flex-wrap gap-4 overflow-y-auto h-[calc(100vh-7rem)]">
            {roleData.map((role, idx) => (
              <EmpRoleCard
                key={idx}
                role={role.role}
                memberCount={role.memberCount}
                bgColor={role.bgColor}
                ibgcolor={role.ibgcolor}
                onEdit={() => handleEditRole({
                  role: role.role,
                  members: role.memberCount,
                  color: role.bgColor,
                })}
              />
            ))}
            <div
              className="fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]"
              onClick={() => setShowPopup(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 -960 960 960" width="2rem" fill="#000000">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>
          </div>
        )}

        {navId === "geofencing" && (
          <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-7rem)]">
            {branches.map((loc, index) => (
              <GeoFencing key={index} embedUrl={loc.embedURL} branchName={loc.campusName} />
            ))}
            <button
              className="fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]"
              onClick={() => setShowLocationForm(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 -960 960 960" width="2rem" fill="#000000">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
          </div>
        )}

        {navId === "newusers" && (
          <div className="p-4 flex flex-wrap gap-4 overflow-y-auto h-[calc(100vh-7rem)]">
            {pendingEmployees.map((emp, index) => (
              <EmpCard
                key={index}
                name={emp.name}
                email={emp.email}
                phone={emp.phone}
                date={emp.date}
                image={emp.image}
                color={bgColorList[index]}
                onApprove={() => handleApprove(emp)}
              />
            ))}
          </div>
        )}

        {showLocationForm && (
          <AddLocationForm
            isOpen={showLocationForm}
            onClose={() => setShowLocationForm(false)}
            onSubmit={handleAddNewBranch}
          />
        )}
      </div>

      {showPopup && <AddRolePopup onClose={() => setShowPopup(false)} />}

      {showAssignPopup && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]">
          <EmpAssignmentPopUp
            email={selectedEmployee.email}
            employee={selectedEmployee}
            isOpen={true}
            onClose={handleClosePopup}
            onSave={handleSaveAssignment}
          />
        </div>
      )}

      {editRoleData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]">
          <EditRolePopup
            role={editRoleData.role}
            members={editRoleData.members}
            color={editRoleData.color}
            onClose={handleCloseEdit}
            onSave={handleSaveEditedRole}
          />
        </div>
      )}
    </div>
  );
};

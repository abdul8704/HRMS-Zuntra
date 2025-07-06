import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from "../components/Sidebar";
import { Navbar } from '../components/Navbar';
import { EmployeeCard } from '../components/employeeManagement/EmployeeCard';
import { EmployeeRoleCard } from '../components/employeeManagement/EmployeeRoleCard';
import { AddRolePopup } from '../components/employeeManagement/AddRolePopup';
import { EditRolePopup } from '../components/employeeManagement/EditRolePopup';
import { GeoFencing } from '../components/employeeManagement/GeoFencing';
import { EmpAssignmentPopUp } from '../components/employeeManagement/EmployeeAssignmentPopup';
import { AddLocationForm } from '../components/employeeManagement/AddLocationForm';
import { Loading } from '../components/Loading';
import api from '../api/axios';

export const EmployeeManagement = () => {
  const { navId } = useParams();

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleSearchTerm, setRoleSearchTerm] = useState("All Roles");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [selectedLoginStatus, setSelectedLoginStatus] = useState("All Users");

  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);

  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [branches, setBranches] = useState([]);

  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isErrorRoles, setIsErrorRoles] = useState(false);

  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [isErrorEmployees, setIsErrorEmployees] = useState(false);

  const [isLoadingPending, setIsLoadingPending] = useState(true);
  const [isErrorPending, setIsErrorPending] = useState(false);

  const [isLoadingBranches, setIsLoadingBranches] = useState(true);
  const [isErrorBranches, setIsErrorBranches] = useState(false);
  useEffect(() => {
    // Force component to acknowledge filter changes
    console.log('Filter state changed:', {
      searchTerm,
      selectedRole,
      selectedLoginStatus,
      isFilterActive
    });
  }, [searchTerm, selectedRole, selectedLoginStatus, isFilterActive]);
  useEffect(()=>{
    handleClearFilters();
  },[navId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingRoles(true);
        setIsLoadingEmployees(true);
        setIsLoadingPending(true);
        setIsLoadingBranches(true);

        setIsErrorRoles(false);
        setIsErrorEmployees(false);
        setIsErrorPending(false);
        setIsErrorBranches(false);

        const [roles, emps, pending, brs] = await Promise.all([
          api.get('/api/roles'),
          api.get('/api/employee'),
          api.get('/api/hr/pending'),
          api.get('/api/branch'),
        ]);

        setRolesData(roles.data);
        setEmployees(emps.data.employees);
        setPendingEmployees(pending.data.pendingEmployees);
        setBranches(brs.data.branches);
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsErrorRoles(true);
        setIsErrorEmployees(true);
        setIsErrorPending(true);
        setIsErrorBranches(true);
      } finally {
        setIsLoadingRoles(false);
        setIsLoadingEmployees(false);
        setIsLoadingPending(false);
        setIsLoadingBranches(false);
      }
    };
    fetchData();
  }, []);
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.role-dropdown')) {
        setShowRoleDropdown(false);
      }
      if (!event.target.closest('.login-dropdown')) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allRolesList = ["All Roles", ...rolesData.map((r) => r.role)];

  // Show all roles when dropdown is opened or when search is empty
  const filteredRoles = roleSearchTerm.trim() === "" || roleSearchTerm === selectedRole
    ? allRolesList
    : allRolesList.filter((role) =>
      role.toLowerCase().includes(roleSearchTerm.toLowerCase())
    );

  // Filter employees based on all active filters
  const filteredEmployees = employees.filter((emp) => {
    // Role filter
    if (selectedRole !== "All Roles" && emp.role?.role !== selectedRole) {
      return false;
    }

    // Search filter (name, email, phone)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        emp.username?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.phoneNumber?.toLowerCase().includes(term);
      if (!matchesSearch) return false;
    }

    // Login status filter
    if (selectedLoginStatus !== "All Users") {
      const isLoggedIn = !!emp.loginTime;
      if (selectedLoginStatus === "Present" && !isLoggedIn) return false;
      if (selectedLoginStatus === "Absent" && isLoggedIn) return false;
    }

    return true;
  });
  // Filter for new users (pending employees)
  const filteredPendingEmployees = pendingEmployees.filter((emp) => {
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        emp.name?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.phone?.toLowerCase().includes(term);
      if (!matchesSearch) return false;
    }

    // Date filter
    if (selectedRole && selectedRole !== "All Roles") {
      if (emp.date !== selectedRole) return false;
    }

    return true;
  });

  // Filter for branches/locations
  const filteredBranches = branches.filter((branch) => {
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      if (!branch.campusName?.toLowerCase().includes(term)) return false;
    }

    // Location filter
    if (selectedRole !== "All Locations" && selectedRole !== "All Roles") {
      if (branch.campusName !== selectedRole) return false;
    }

    return true;
  });

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

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedRole(navId === "newusers" ? "" : navId === "geofencing" ? "All Locations" : "All Roles");
    setRoleSearchTerm("All Roles");
    setSelectedLoginStatus("All Users");
    setShowRoleDropdown(false);
    setShowLoginDropdown(false);
    setIsFilterActive(false);
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen">
        <Navbar isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} handleClearFilters={handleClearFilters} />
        {isFilterActive && (
          <div className="w-full bg-[#BBD3CC] rounded-xl flex gap-[0.5rem] p-[0.5rem]">
            {/* Search Input - Show for all, newusers, and geofencing */}
            {(navId === "all" || navId === "roles" || navId === "newusers" || navId === "geofencing") && (
              <input
                type="text"
                placeholder={navId === "roles" ? "Search roles" : navId === "geofencing" ? "Search locations" : "Search by name, email, or phone"}
                className="bg-white/50 flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            {/* Role Dropdown - Only for 'all' navId */}
            {navId === "all" && (
              <div className="relative flex-1 role-dropdown">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
                    value={roleSearchTerm}
                    onChange={(e) => {
                      setRoleSearchTerm(e.target.value);
                      setShowRoleDropdown(true);
                    }}
                    onFocus={() => setShowRoleDropdown(true)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
                    onClick={() => {
                      setShowRoleDropdown(!showRoleDropdown);
                      if (!showRoleDropdown) {
                        setRoleSearchTerm("");
                      }
                    }}
                  >
                    <svg className={`w-4 h-4 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {showRoleDropdown && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredRoles.length === 0 ? (
                      <div className="px-3 py-2 text-gray-500">No roles found</div>
                    ) : (
                      filteredRoles.map((role, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedRole === role ? 'bg-[#BBD3CC]' : ''
                            }`}
                          onClick={() => {
                            setSelectedRole(role);
                            setRoleSearchTerm(role);
                            setShowRoleDropdown(false);
                          }}
                        >
                          {role}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Date Dropdown - Only for 'newusers' navId */}
            {navId === "newusers" && (
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
                  value={selectedRole} // reusing selectedRole state for date
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
              </div>
            )}

            {/* Login Status Dropdown - Only for 'all' navId */}
            {navId === "all" && (
              <div className="relative flex-1 login-dropdown">
                <div
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#A6C4BA] flex items-center justify-between"
                  onClick={() => setShowLoginDropdown((prev) => !prev)}
                >
                  <span>{selectedLoginStatus}</span>
                  <svg className={`w-4 h-4 transition-transform ${showLoginDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showLoginDropdown && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                    {["All Users", "Present", "Absent"].map((status) => (
                      <div
                        key={status}
                        className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedLoginStatus === status ? 'bg-[#BBD3CC]' : ''
                          }`}
                        onClick={() => {
                          setSelectedLoginStatus(status);
                          setShowLoginDropdown(false);
                        }}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-white/70 text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
        )}

        {/* Filter Summary */}
        {isFilterActive && (
          <div className="px-[1rem] flex items-center justify-between text-sm text-gray-600">
            <div>
              {navId === "all" && `Showing ${filteredEmployees.length} of ${employees.length} employees`}
              {navId === "newusers" && `Showing ${filteredPendingEmployees.length} of ${pendingEmployees.length} new users`}
              {navId === "geofencing" && `Showing ${filteredBranches.length} of ${branches.length} locations`}
              {navId === "roles" && `Showing ${rolesData.filter(role => {
                if (!searchTerm.trim()) return true;
                return role.role.toLowerCase().includes(searchTerm.toLowerCase());
              }).length} of ${rolesData.length} roles`}
            </div>
            <div className="flex gap-2">
              {searchTerm && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Search: "{searchTerm}"</span>}
              {navId === "all" && selectedRole !== "All Roles" && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Role: {selectedRole}</span>}
              {navId === "newusers" && selectedRole && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Date: {selectedRole}</span>}
              {navId === "geofencing" && selectedRole !== "All Locations" && selectedRole !== "All Roles" && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Location: {selectedRole}</span>}
              {navId === "all" && selectedLoginStatus !== "All Users" && <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">Status: {selectedLoginStatus}</span>}
            </div>
          </div>
        )}
        {/* All Employees */}
        {navId === "all" && (
          <div className="px-[1rem] grid grid-cols-1 md:grid-cols-2 gap-[1rem] overflow-y-auto">
            {isLoadingEmployees ? (
              <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                <Loading />
              </div>
            ) : isErrorEmployees ? (
              <p className="text-center col-span-full mt-4 text-red-500 font-semibold">Error fetching employees</p>
            ) : filteredEmployees.length === 0 ? (
              <p className="text-center col-span-full mt-4 text-gray-500 font-medium">
                {employees.length === 0 ? "No employees available" : "No employees match the current filters"}
              </p>
            ) : (
              filteredEmployees.map((emp, index) => (
                <EmployeeCard
                  key={emp.id || index}
                  name={emp.username}
                  email={emp.email}
                  phone={emp.phoneNumber}
                  image={emp.profilePicture}
                  role={emp.role.name}
                  inTime={emp.loginTime || "N/A"}
                  outTime={emp.logoutTime || "N/A"}
                  workTime="10:01"
                  breakTime="12:00"
                  bgColor={emp.role.color}
                />
              ))
            )}
          </div>
        )}

        {/* Roles */}
        {navId === "roles" && (
          <div className="flex-1 px-[1rem] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1rem] justify-items-center">
              {isLoadingRoles ? (
                <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                  <Loading />
                </div>
              ) : isErrorRoles ? (
                <p className="text-center col-span-full mt-4 text-red-500 font-semibold">Error fetching roles</p>
              ) : rolesData.length === 0 ? (
                <p className="text-center col-span-full mt-4 text-gray-500 font-medium">No roles available</p>
              ) : (
                // Filter roles based on search term
                rolesData
                  .filter((role) => {
                    if (!searchTerm.trim()) return true;
                    return role.role.toLowerCase().includes(searchTerm.toLowerCase());
                  })
                  .map((role, idx) => (
                    <EmployeeRoleCard
                      key={idx}
                      role={role.role}
                      bgColor={role.color || "#e0e0e0"}
                      onEdit={() =>
                        handleEditRole({
                          role: role.role,
                          members: role.memberCount,
                          color: role.bgColor || "#e0e0e0",
                        })
                      }
                    />
                  ))
              )}
            </div>
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


        {/* Geofencing */}
        {navId === "geofencing" && (
          <div className="flex flex-col px-[1rem] gap-4 overflow-y-auto flex-1">
            {isLoadingBranches ? (
              <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                <Loading />
              </div>
            ) : isErrorBranches ? (
              <p className="text-center mt-4 text-red-500 font-semibold">Error fetching branches</p>
            ) : branches.length === 0 ? (
              <p className="text-center mt-4 text-gray-500 font-medium">No branches available</p>
            ) : (
              filteredBranches.map((loc, index) => (
                <GeoFencing key={index} embedUrl={loc.embedURL} branchName={loc.campusName} />
              ))
            )}
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

        {/* New Users */}
        {navId === "newusers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] px-[1rem] overflow-y-auto">
            {isLoadingPending ? (
              <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                <Loading />
              </div>
            ) : isErrorPending ? (
              <p className="text-center col-span-full mt-4 text-red-500 font-semibold">Error fetching new users</p>
            ) : pendingEmployees.length === 0 ? (
              <p className="text-center col-span-full mt-4 text-gray-500 font-medium">No new users pending</p>
            ) : (
              filteredPendingEmployees.map((emp, index) => (
                <EmployeeCard
                  key={index}
                  name={emp.name}
                  email={emp.email}
                  phone={emp.phone}
                  role={emp.date}
                  bgColor={bgColorList[index]}
                  image={emp.image}
                  isNewUser={true}
                  onApprove={() => handleApprove(emp)}
                />
              ))
            )}
          </div>
        )}

        {/* Location Form */}
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
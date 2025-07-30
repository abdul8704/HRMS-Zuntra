import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Sidebar } from "../../components/Sidebar";
import { Navbar } from '../../components/Navbar';
import { Loading } from "../utils/Loading";

import { EmployeeCard } from './components/EmployeeCard';
import { RoleCard } from './components/RoleCard';
import AddRole from './components/AddRole';
import { EditRolePopup } from './components/EditRolePopup';
import { GeoFencing } from './components/GeoFencing';
import { EmpAssignmentPopUp } from './components/EmployeeAssignmentPopup';
import { AddLocationForm } from './components/AddLocationForm';
import { useAuth } from "../../context/AuthContext";

import api from '../../api/axios';
import { BASE_URL } from '../../api/axios';


export const EmployeeManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const { user, authDataLoading } = useAuth();

  // Filter states
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLoginStatus, setSelectedLoginStatus] = useState("All Users");

  // Role dropdown states
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [roleSearchTerm, setRoleSearchTerm] = useState("All Roles");
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);

  // Data states
  const [employees, setEmployees] = useState([]);
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [branches, setBranches] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    employees: true,
    pending: true,
    roles: true,
    branches: true
  });

  // Error states
  const [errors, setErrors] = useState({
    employees: false,
    pending: false,
    roles: false,
    branches: false
  });

  const validTabs = ["all", "roles", "newusers", "locations"];

  // Validate navId
  useEffect(() => {
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }
  }, [navId, navigate]);

  // Clear filters when navId changes
  useEffect(() => {
    handleClearFilters();
  }, [navId]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        employees: true,
        pending: true,
        roles: true,
        branches: true
      });

      setErrors({
        employees: false,
        pending: false,
        roles: false,
        branches: false
      });

      try {
        const [roles, emps, pending, brs] = await Promise.all([
          api.get('/api/roles'),
          api.get('/api/employee'),
          api.get('/api/hr/pending'),
          api.get('/api/branch'),
        ]);

        setRolesData(roles.data || []);
        setEmployees(emps.data.employees || []);
        setPendingEmployees(pending.data.pendingEmployees || []);
        setBranches(brs.data.branches || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrors({
          employees: true,
          pending: true,
          roles: true,
          branches: true
        });
      } finally {
        setLoading({
          employees: false,
          pending: false,
          roles: false,
          branches: false
        });
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

  // Memoized role list
  const allRolesList = useMemo(() => {
    return ["All Roles", ...rolesData.map((r) => r.role || r.name)];
  }, [rolesData]);

  // Memoized filtered roles for dropdown
  const filteredRoleDropdown = useMemo(() => {
    if (roleSearchTerm.trim() === "" || roleSearchTerm === selectedRole) {
      return allRolesList;
    }
    return allRolesList.filter((role) =>
      role.toLowerCase().includes(roleSearchTerm.toLowerCase())
    );
  }, [allRolesList, roleSearchTerm, selectedRole]);

  // Utility function to check if string includes search term
  const includesSearchTerm = useCallback((str, term) => {
    return str?.toLowerCase().includes(term.toLowerCase()) || false;
  }, []);

  // Memoized filtered employees
  const filteredEmployees = useMemo(() => {
    if (!employees.length) return [];

    return employees.filter((emp) => {
      // Role filter - Fixed to handle different role object structures
      if (selectedRole !== "All Roles") {
        const empRole = emp.role?.role || emp.role?.name || emp.role;
        if (empRole !== selectedRole) {
          return false;
        }
      }

      // Search filter (name, email, phone)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          includesSearchTerm(emp.username, term) ||
          includesSearchTerm(emp.name, term) ||
          includesSearchTerm(emp.email, term) ||
          includesSearchTerm(emp.phoneNumber, term) ||
          includesSearchTerm(emp.phone, term);

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
  }, [employees, selectedRole, searchTerm, selectedLoginStatus, includesSearchTerm]);

  // Memoized filtered pending employees
  const filteredPendingEmployees = useMemo(() => {
    if (!pendingEmployees.length) return [];

    return pendingEmployees.filter((emp) => {
      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          includesSearchTerm(emp.name, term) ||
          includesSearchTerm(emp.email, term) ||
          includesSearchTerm(emp.phone, term) ||
          includesSearchTerm(emp.phoneNumber, term);

        if (!matchesSearch) return false;
      }

      // Date filter (reusing selectedRole state)
      if (selectedRole && selectedRole !== "All Roles" && selectedRole !== "") {
        if (emp.date !== selectedRole) return false;
      }

      return true;
    });
  }, [pendingEmployees, searchTerm, selectedRole, includesSearchTerm]);

  // Memoized filtered branches
  const filteredBranches = useMemo(() => {
    if (!branches.length) return [];

    return branches.filter((branch) => {
      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        if (!includesSearchTerm(branch.campusName, term)) return false;
      }

      // Location filter
      if (selectedRole !== "All Locations" && selectedRole !== "All Roles" && selectedRole !== "") {
        if (branch.campusName !== selectedRole) return false;
      }

      return true;
    });
  }, [branches, searchTerm, selectedRole, includesSearchTerm]);

  // Memoized filtered roles
  const filteredRoles = useMemo(() => {
    if (!rolesData.length) return [];

    return rolesData.filter((role) => {
      if (!searchTerm.trim()) return true;
      const roleName = role.role || role.name || '';
      return includesSearchTerm(roleName, searchTerm);
    });
  }, [rolesData, searchTerm, includesSearchTerm]);

  // Event handlers
  const handleEditRole = useCallback((roleData) => {
    setEditRoleData(roleData);
  }, []);

  const handleSaveEditedRole = useCallback(() => {
    setEditRoleData(null);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setEditRoleData(null);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowAssignPopup(false);
    setSelectedEmployee(null);
  }, []);

  const handleApprove = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowAssignPopup(true);
  }, []);


  const handleSaveAssignment = useCallback(() => {
    handleClosePopup();
  }, [handleClosePopup]);

  const handleAddNewBranch = useCallback(async (formData) => {
    try {
      const response = await api.post('/api/branch/new-branch', formData);
      if (response.data.success) {
        setBranches((prev) => [...prev, response.data.branch]);
        setShowLocationForm(false);
      }
    } catch (error) {
      console.error("Error adding new branch:", error);
    }
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedRole(navId === "newusers" ? "" : navId === "locations" ? "All Locations" : "All Roles");
    setRoleSearchTerm("All Roles");
    setSelectedLoginStatus("All Users");
    setShowRoleDropdown(false);
    setShowLoginDropdown(false);
    setIsFilterActive(false);
  }, [navId]);

  // Background color generation
  const bgClasses = ['#FBEDEA', '#D7B5EB', '#D2EFEA', '#ECECFD'];
  const getGridBgColors = useCallback((length, columns, colors) => {
    return Array.from({ length }, (_, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      return colors[(col + row) % colors.length];
    });
  }, []);

  const bgColorList = useMemo(() => {
    return getGridBgColors(employees.length, 3, bgClasses);
  }, [employees.length, getGridBgColors]);

  // Get current data and loading state based on navId
  const getCurrentData = () => {
    switch (navId) {
      case "all":
        return {
          data: filteredEmployees,
          loading: loading.employees,
          error: errors.employees,
          total: employees.length
        };
      case "roles":
        return {
          data: filteredRoles,
          loading: loading.roles,
          error: errors.roles,
          total: rolesData.length
        };
      case "newusers":
        return {
          data: filteredPendingEmployees,
          loading: loading.pending,
          error: errors.pending,
          total: pendingEmployees.length
        };
      case "locations":
        return {
          data: filteredBranches,
          loading: loading.branches,
          error: errors.branches,
          total: branches.length
        };
      default:
        return { data: [], loading: false, error: false, total: 0 };
    }
  };

  const currentData = getCurrentData();

  return (
    (authDataLoading) ?
      (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      ) : (
        <div className="flex w-screen h-screen">
          <Sidebar />
          <div className="flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen">
            <Navbar
              type="employeeManagement"
              showFilter={true}
              isFilterActive={isFilterActive}
              setIsFilterActive={setIsFilterActive}
              handleClearFilters={handleClearFilters}
            />

            {/* Filter Section */}
            {isFilterActive && (
              <div className="w-full bg-[#BBD3CC] rounded-xl flex gap-[0.5rem] p-[0.5rem]">
                {/* Search Input */}
                {(navId === "all" || navId === "roles" || navId === "newusers" || navId === "locations") && (
                  <input
                    type="text"
                    placeholder={
                      navId === "roles" ? "Search roles" :
                        navId === "locations" ? "Search locations" :
                          "Search by name, email, or phone"
                    }
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
                        {filteredRoleDropdown.length === 0 ? (
                          <div className="px-3 py-2 text-gray-500">No roles found</div>
                        ) : (
                          filteredRoleDropdown.map((role, idx) => (
                            <div
                              key={idx}
                              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedRole === role ? 'bg-[#BBD3CC]' : ''}`}
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
                      value={selectedRole}
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
                            className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedLoginStatus === status ? 'bg-[#BBD3CC]' : ''}`}
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
                  Showing {currentData.data.length} of {currentData.total} {
                    navId === "all" ? "employees" :
                      navId === "newusers" ? "new users" :
                        navId === "locations" ? "locations" : "roles"
                  }
                </div>
                <div className="flex gap-2">
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {navId === "all" && selectedRole !== "All Roles" && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      Role: {selectedRole}
                    </span>
                  )}
                  {navId === "newusers" && selectedRole && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      Date: {selectedRole}
                    </span>
                  )}
                  {navId === "locations" && selectedRole !== "All Locations" && selectedRole !== "All Roles" && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      Location: {selectedRole}
                    </span>
                  )}
                  {navId === "all" && selectedLoginStatus !== "All Users" && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                      Status: {selectedLoginStatus}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Content Sections */}

            {/* All Employees */}
            {navId === "all" && (
              <div className="px-[1rem] grid grid-cols-1 md:grid-cols-2 gap-[1rem] overflow-y-auto">
                {currentData.loading ? (
                  <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                    <Loading />
                  </div>
                ) : currentData.error ? (
                  <p className="text-center col-span-full mt-4 text-red-500 font-semibold">
                    Error fetching employees
                  </p>
                ) : currentData.data.length === 0 ? (
                  <p className="text-center col-span-full mt-4 text-gray-500 font-medium">
                    {currentData.total === 0 ? "No employees available" : "No employees match the current filters"}
                  </p>
                ) : (
                  currentData.data.map((emp, index) => (
                    <div
                      key={emp._id || index}
                      onClick={() => navigate(`/employee/${emp._id}/details/attendance`)}
                      className="cursor-pointer transition-transform hover:scale-[1.01] w-full"
                    >
                      <EmployeeCard
                        name={emp.username || emp.name}
                        email={emp.email}
                        phone={emp.phoneNumber || emp.phone}
                        image={`${BASE_URL}/uploads/profilePictures/${emp._id}.png`}
                        role={emp.role?.role || emp.role?.name || emp.role || "N/A"}
                        inTime={emp.loginTime || "N/A"}
                        outTime={emp.logoutTime || "N/A"}
                        workTime="10:01"
                        breakTime="12:00"
                        bgColor={emp.role?.color || bgColorList[index]}
                      />
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Roles */}
            {navId === "roles" && (
              <div className="flex-1 px-[1rem] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1rem] justify-items-center">
                  {currentData.loading ? (
                    <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                      <Loading />
                    </div>
                  ) : currentData.error ? (
                    <p className="text-center col-span-full mt-4 text-red-500 font-semibold">
                      Error fetching roles
                    </p>
                  ) : currentData.data.length === 0 ? (
                    <p className="text-center col-span-full mt-4 text-gray-500 font-medium">
                      {currentData.total === 0 ? "No roles available" : "No roles match the current filters"}
                    </p>
                  ) : (
                    currentData.data.map((role, idx) => (
                      <div
                        key={role._id || idx}
                        onClick={() => navigate(`/employee/role/${role._id}/details`)}
                        className="cursor-pointer transition-transform hover:scale-[1.01] w-full"
                      >
                        <RoleCard
                          role={role.role || role.name}
                          bgColor={role.color || "#e0e0e0"}
                          onEdit={() =>
                            handleEditRole({
                              role: role.role || role.name,
                              members: role.memberCount || 0,
                              color: role.color || "#e0e0e0",
                            })
                          }
                        />
                      </div>
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
            {navId === "locations" && (
              <div className="flex flex-col px-[1rem] gap-4 overflow-y-auto flex-1">
                {currentData.loading ? (
                  <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                    <Loading />
                  </div>
                ) : currentData.error ? (
                  <p className="text-center mt-4 text-red-500 font-semibold">
                    Error fetching branches
                  </p>
                ) : currentData.data.length === 0 ? (
                  <p className="text-center mt-4 text-gray-500 font-medium">
                    {currentData.total === 0 ? "No branches available" : "No branches match the current filters"}
                  </p>
                ) : (
                  currentData.data.map((loc, index) => (
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
                {currentData.loading ? (
                  <div className="text-center col-span-full mt-4 text-gray-600 font-semibold">
                    <Loading />
                  </div>
                ) : currentData.error ? (
                  <p className="text-center col-span-full mt-4 text-red-500 font-semibold">
                    Error fetching new users
                  </p>
                ) : currentData.data.length === 0 ? (
                  <p className="text-center col-span-full mt-4 text-gray-500 font-medium">
                    {currentData.total === 0 ? "No new users pending" : "No new users match the current filters"}
                  </p>
                ) : (
                  currentData.data.map((emp, index) => (
                    <EmployeeCard
                      key={index}
                      name={emp.name}
                      email={emp.email}
                      phone={emp.phone || emp.phoneNumber}
                      role={(() => {
                        const dob = new Date(emp.dateJoined);
                        const day = String(dob.getDate()).padStart(2, '0');
                        const month = String(dob.getMonth() + 1).padStart(2, '0');
                        const year = dob.getFullYear();
                        return `${day}-${month}-${year}`;
                      })()}
                      bgColor={bgColorList[index]}
                      image={`${BASE_URL}/uploads/profilePictures/${emp._id}.png`}
                      option={3}
                      onApprove={() => handleApprove(emp)}
                    />
                  ))
                )}
              </div>
            )}

            {/* Modals and Popups */}
            {showLocationForm && (
              <AddLocationForm
                isOpen={showLocationForm}
                onClose={() => setShowLocationForm(false)}
                onSubmit={handleAddNewBranch}
              />
            )}
          </div>

          {showPopup && <AddRole onClose={() => setShowPopup(false)} />}

          {
            showAssignPopup && selectedEmployee && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]">
                <EmpAssignmentPopUp
                  employee={selectedEmployee}
                  onClose={handleClosePopup}
                  onSave={handleSaveAssignment}
                />
              </div>
            )
          }

          {
            editRoleData && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]">
                <EditRolePopup
                  role={editRoleData.role}
                  members={editRoleData.members}
                  color={editRoleData.color}
                  onClose={handleCloseEdit}
                  onSave={handleSaveEditedRole}
                />
              </div>
            )
          }
        </div >
      )
  )
};
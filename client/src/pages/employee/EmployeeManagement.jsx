import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Sidebar } from '../../components/Sidebar'
import { Navbar } from '../../components/Navbar'
import { Loading } from '../utils/Loading'
import { ShiftTable } from './components/ShiftTable'
import { EmployeeCard } from './components/EmployeeCard'
import { RoleCard } from './components/RoleCard'
import AddRole from './components/AddRole'
import { EditRolePopup } from './components/EditRolePopup'
import { GeoFencing } from './components/GeoFencing'
import { EmpAssignmentPopUp } from './components/EmployeeAssignmentPopup'
import { AddLocationForm } from './components/AddLocationForm'
import { RemoveEmployeePopup } from './components/RemoveEmployeePopup' // ADDED
import { useAuth } from '../../context/AuthContext'

import axios from '../../api/axios'
import { BASE_URL } from '../../api/axios'

// Shift Details Component
const ShiftDetails = () => {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      shiftName: "Morning Shift",
      startTime: "09:00",
      endTime: "17:00",
      noOfUsers: "12"
    },
    {
      id: 2,
      shiftName: "Night Shift",
      startTime: "22:00",
      endTime: "06:00",
      noOfUsers: "8"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [formData, setFormData] = useState({
    shiftName: '',
    startTime: '',
    endTime: '',
    noOfUsers: ''
  });

  const openModal = (shift = null) => {
    if (shift) {
      setEditingShift(shift);
      setFormData(shift);
    } else {
      setEditingShift(null);
      setFormData({
        shiftName: '',
        startTime: '',
        endTime: '',
        noOfUsers: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingShift(null);
    setFormData({
      shiftName: '',
      startTime: '',
      endTime: '',
      noOfUsers: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.shiftName || !formData.startTime || !formData.endTime || !formData.noOfUsers) {
      alert('Please fill in all fields');
      return;
    }

    if (editingShift) {
      // Update existing shift
      setShifts(prev => prev.map(shift =>
        shift.id === editingShift.id ? { ...formData, id: editingShift.id } : shift
      ));
    } else {
      // Add new shift
      const newShift = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      setShifts(prev => [...prev, newShift]);
    }

    closeModal();
  };

  const handleDeleteShift = (shiftId) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      setShifts(prev => prev.filter(shift => shift.id !== shiftId));
    }
  };

  const PlusButton = () => {
    return (
      <button
        type="button"
        onClick={() => openModal()}
        aria-label="Add new shift"
        className="fixed bottom-8 right-20 w-16 h-16 bg-[#c2d9d7] rounded-full flex items-center justify-center cursor-pointer group hover:bg-[#b2ccc9] transition-colors duration-300 z-[1000]"
      >
        <svg
          className="w-8 h-8 text-black transform transition-transform duration-300 ease-in-out group-hover:rotate-[180deg]"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full bg-white relative px-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
                Shift Name
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
                Start Time
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
                End Time
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
                No. of Users
              </th>

            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id} className="border-b border-gray-200 hover:bg-blue-50 group relative">
                <td className="py-4 px-4 text-sm text-black">
                  {shift.shiftName}
                </td>
                <td className="py-4 px-4 text-sm text-black">
                  {shift.startTime}
                </td>
                <td className="py-4 px-4 text-sm text-black">
                  {shift.endTime}
                </td>

                <td className="py-4 px-4 text-sm text-black relative pr-20">
                  {shift.noOfUsers}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <button
                      onClick={() => openModal(shift)}
                      className="text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200"
                      title="Edit shift"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteShift(shift.id)}
                      className="text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200"
                      title="Delete shift"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {shifts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No shifts available. Click the + button to add a new shift.
        </div>
      )}

      {/* Plus Button */}
      <PlusButton />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {editingShift ? 'Edit Shift' : 'Add New Shift'}
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="shiftName" className="block text-sm font-medium text-gray-700 mb-1">
                  Shift Name
                </label>
                <input
                  type="text"
                  id="shiftName"
                  name="shiftName"
                  value={formData.shiftName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shift name"
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="noOfUsers" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Users
                </label>
                <input
                  type="number"
                  id="noOfUsers"
                  name="noOfUsers"
                  value={formData.noOfUsers}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of users"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingShift ? 'Update' : 'Add'} Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EmployeeManagement = () => {
  const { navId } = useParams()
  const navigate = useNavigate()
  const { user, authDataLoading } = useAuth()

  // Filter states
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All Roles')
  const [selectedLoginStatus, setSelectedLoginStatus] = useState('All Users')

  // Role dropdown states
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [roleSearchTerm, setRoleSearchTerm] = useState('All Roles')
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  // Popup states
  const [showPopup, setShowPopup] = useState(false)
  const [showAssignPopup, setShowAssignPopup] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [editRoleData, setEditRoleData] = useState(null)
  const [showRemovePopup, setShowRemovePopup] = useState(false) // ADDED
  const [employeeToRemove, setEmployeeToRemove] = useState(null) // ADDED

  // Data states
  const [employees, setEmployees] = useState([])
  const [pendingEmployees, setPendingEmployees] = useState([])
  const [rolesData, setRolesData] = useState([])
  const [branches, setBranches] = useState([])

  // Loading states
  const [loading, setLoading] = useState({
    employees: true,
    pending: true,
    roles: true,
    branches: true
  })

  // Error states
  const [errors, setErrors] = useState({
    employees: false,
    pending: false,
    roles: false,
    branches: false
  })

  const validTabs = ['all', 'roles', 'newusers', 'shifts', 'locations']

  // Validate navId
  useEffect(() => {
    if (!validTabs.includes(navId)) {
      navigate('/404')
      return
    }
  }, [navId, navigate])

  // Clear filters when navId changes
  useEffect(() => {
    handleClearFilters()
  }, [navId])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        employees: true,
        pending: true,
        roles: true,
        branches: true
      })

      setErrors({
        employees: false,
        pending: false,
        roles: false,
        branches: false
      })

      try {
        const [roles, emps, pending, brs] = await Promise.all([
          axios.get('/api/roles'),
          axios.get('/api/employee'),
          axios.get('/api/hr/pending'),
          axios.get('/api/branch')
        ])

        setRolesData(roles.data || [])
        setEmployees(emps.data.employees || [])
        setPendingEmployees(pending.data.pendingEmployees || [])
        setBranches(brs.data.branches || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setErrors({
          employees: true,
          pending: true,
          roles: true,
          branches: true
        })
      } finally {
        setLoading({
          employees: false,
          pending: false,
          roles: false,
          branches: false
        })
      }
    }

    // Only fetch data for tabs that need it (not shifts)
    if (navId !== 'shifts') {
      fetchData()
    }
  }, [navId])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest('.role-dropdown')) {
        setShowRoleDropdown(false)
      }
      if (!event.target.closest('.login-dropdown')) {
        setShowLoginDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Memoized role list
  const allRolesList = useMemo(() => {
    return ['All Roles', ...rolesData.map(r => r.role || r.name)]
  }, [rolesData])

  // Memoized filtered roles for dropdown
  const filteredRoleDropdown = useMemo(() => {
    if (roleSearchTerm.trim() === '' || roleSearchTerm === selectedRole) {
      return allRolesList
    }
    return allRolesList.filter(role =>
      role.toLowerCase().includes(roleSearchTerm.toLowerCase())
    )
  }, [allRolesList, roleSearchTerm, selectedRole])

  // Utility function to check if string includes search term
  const includesSearchTerm = useCallback((str, term) => {
    return str?.toLowerCase().includes(term.toLowerCase()) || false
  }, [])

  // Memoized filtered employees
  const filteredEmployees = useMemo(() => {
    if (!employees.length) return []

    return employees.filter(emp => {
      // Role filter - Fixed to handle different role object structures
      if (selectedRole !== 'All Roles') {
        const empRole = emp.role?.role || emp.role?.name || emp.role
        if (empRole !== selectedRole) {
          return false
        }
      }

      // Search filter (name, email, phone)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase()
        const matchesSearch =
          includesSearchTerm(emp.username, term) ||
          includesSearchTerm(emp.name, term) ||
          includesSearchTerm(emp.email, term) ||
          includesSearchTerm(emp.phoneNumber, term) ||
          includesSearchTerm(emp.phone, term)

        if (!matchesSearch) return false
      }

      // Login status filter
      if (selectedLoginStatus !== 'All Users') {
        const isLoggedIn = !!emp.loginTime
        if (selectedLoginStatus === 'Present' && !isLoggedIn) return false
        if (selectedLoginStatus === 'Absent' && isLoggedIn) return false
      }

      return true
    })
  }, [
    employees,
    selectedRole,
    searchTerm,
    selectedLoginStatus,
    includesSearchTerm
  ])

  // Memoized filtered pending employees
  const filteredPendingEmployees = useMemo(() => {
    if (!pendingEmployees.length) return []

    return pendingEmployees.filter(emp => {
      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase()
        const matchesSearch =
          includesSearchTerm(emp.name, term) ||
          includesSearchTerm(emp.email, term) ||
          includesSearchTerm(emp.phone, term) ||
          includesSearchTerm(emp.phoneNumber, term)

        if (!matchesSearch) return false
      }

      // Date filter (reusing selectedRole state)
      if (selectedRole && selectedRole !== 'All Roles' && selectedRole !== '') {
        if (emp.date !== selectedRole) return false
      }

      return true
    })
  }, [pendingEmployees, searchTerm, selectedRole, includesSearchTerm])

  // Memoized filtered branches
  const filteredBranches = useMemo(() => {
    if (!branches.length) return []

    return branches.filter(branch => {
      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase()
        if (!includesSearchTerm(branch.campusName, term)) return false
      }

      // Location filter
      if (
        selectedRole !== 'All Locations' &&
        selectedRole !== 'All Roles' &&
        selectedRole !== ''
      ) {
        if (branch.campusName !== selectedRole) return false
      }

      return true
    })
  }, [branches, searchTerm, selectedRole, includesSearchTerm])

  // Memoized filtered roles
  const filteredRoles = useMemo(() => {
    if (!rolesData.length) return []

    return rolesData.filter(role => {
      if (!searchTerm.trim()) return true
      const roleName = role.role || role.name || ''
      return includesSearchTerm(roleName, searchTerm)
    })
  }, [rolesData, searchTerm, includesSearchTerm])

  // Event handlers
  const handleEditRole = useCallback(roleData => {
    setEditRoleData(roleData)
  }, [])

  const handleSaveEditedRole = useCallback(() => {
    setEditRoleData(null)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setEditRoleData(null)
  }, [])

  const handleClosePopup = useCallback(() => {
    setShowAssignPopup(false)
    setSelectedEmployee(null)
  }, [])

  const handleApprove = useCallback(employee => {
    setSelectedEmployee(employee)
    setShowAssignPopup(true)
  }, [])

  const handleSaveAssignment = useCallback(() => {
    handleClosePopup()
  }, [handleClosePopup])

  // ADDED: Remove employee handlers
  const handleRemoveEmployee = useCallback((employee) => {
    setEmployeeToRemove(employee)
    setShowRemovePopup(true)
  }, [])

  const handleCloseRemovePopup = useCallback(() => {
    setShowRemovePopup(false)
    setEmployeeToRemove(null)
  }, [])

  const handleConfirmRemoval = useCallback(async (data) => {
    try {
      console.log('Employee removal confirmed:', data);

      // Uncomment and modify API call as needed:
      // const response = await axios.delete(`/api/employee/${data.employeeId}`, {
      //   data: { message: data.message }
      // })

      // if (response.data.success) {
      //   // Remove from pending employees if it's from newusers section
      //   setPendingEmployees(prev => prev.filter(emp => emp._id !== data.employeeId))
      //   // Or remove from regular employees if it's from all section
      //   setEmployees(prev => prev.filter(emp => emp._id !== data.employeeId))
      // }

      handleCloseRemovePopup();
    } catch (error) {
      console.error('Error removing employee:', error);
      alert('Failed to remove employee. Please try again.');
    }
  }, [handleCloseRemovePopup])
  const fetchBranches = async () => {
    try {
      const res = await axios.get("/api/branch");
      setBranches(res.data.branches || []);
    } catch (err) {
      console.error("Failed to fetch branches:", err);
    }
  };

  // add a branch
  const handleAddBranch = async (formData) => {
    try {
      const res = await axios.post("/api/branch/new-branch", formData);
      if (res.data.success) {
        setBranches(prev => [...prev, res.data.branch]);
        setShowLocationForm(false);
      }
    } catch (err) {
      console.error("Error adding branch:", err);
    }
  };

  // edit a branch
  const handleEditBranch = async (oldCampusId, updates) => {
    try {
      const res = await axios.patch("/api/branch/edit-branch", {
        oldCampusId,
        ...updates
      });
      if (res.data.success) {
        // Refresh the branches list or update state
        fetchBranches(); // Call your fetch function
        // OR update state manually:
        // setBranches(prev => 
        //   prev.map(b => (b._id === oldCampusId ? res.data.campus : b))
        // );
      }
    } catch (err) {
      console.error("Error editing branch:", err);
    }
  };

  // Update your delete function to match your backend:
  const handleDeleteBranch = async (oldCampusId, newCampusId = null) => {
  try {
    console.log("Calling delete API with:", { oldCampusId, newCampusId });
    const response = await axios.delete(`/geo-location/delete-branch`, {
  data: { oldCampusId, moveUsersTo: newCampusId }
})

    console.log("Delete success:", response.data);
    setGeoLocations(prev => prev.filter(loc => loc._id !== oldCampusId));
  } catch (error) {
    console.error("Error deleting branch:", error.response || error);
  }
};


  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedRole(
      navId === 'newusers'
        ? ''
        : navId === 'locations'
          ? 'All Locations'
          : 'All Roles'
    )
    setRoleSearchTerm('All Roles')
    setSelectedLoginStatus('All Users')
    setShowRoleDropdown(false)
    setShowLoginDropdown(false)
    setIsFilterActive(false)
  }, [navId])

  // Background color generation
  const bgClasses = ['#FBEDEA', '#D7B5EB', '#D2EFEA', '#ECECFD']
  const getGridBgColors = useCallback((length, columns, colors) => {
    return Array.from({ length }, (_, i) => {
      const col = i % columns
      const row = Math.floor(i / columns)
      return colors[(col + row) % colors.length]
    })
  }, [])

  const bgColorList = useMemo(() => {
    return getGridBgColors(employees.length, 3, bgClasses)
  }, [employees.length, getGridBgColors])

  // Get current data and loading state based on navId
  const getCurrentData = () => {
    switch (navId) {
      case 'all':
        return {
          data: filteredEmployees,
          loading: loading.employees,
          error: errors.employees,
          total: employees.length
        }
      case 'roles':
        return {
          data: filteredRoles,
          loading: loading.roles,
          error: errors.roles,
          total: rolesData.length
        }
      case 'newusers':
        return {
          data: filteredPendingEmployees,
          loading: loading.pending,
          error: errors.pending,
          total: pendingEmployees.length
        }
      case 'locations':
        return {
          data: filteredBranches,
          loading: loading.branches,
          error: errors.branches,
          total: branches.length
        }
      case 'shifts':
        return { data: [], loading: false, error: false, total: 0 }
      default:
        return { data: [], loading: false, error: false, total: 0 }
    }
  }

  const currentData = getCurrentData()

  return authDataLoading ? (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg font-medium'>Loading dashboard...</p>
    </div>
  ) : (
    <div className='flex w-screen h-screen'>
      <Sidebar />
      <div className='flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen'>
        <Navbar
          type='employeeManagement'
          showFilter={navId !== 'shifts'}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
          handleClearFilters={handleClearFilters}
        />

        {/* Filter Section - Hidden for shifts */}
        {isFilterActive && navId !== 'shifts' && (
          <div className='w-full bg-[#BBD3CC] rounded-xl flex gap-[0.5rem] p-[0.5rem]'>
            {/* Search Input */}
            {(navId === 'all' ||
              navId === 'roles' ||
              navId === 'newusers' ||
              navId === 'locations') && (
                <input
                  type='text'
                  placeholder={
                    navId === 'roles'
                      ? 'Search roles'
                      : navId === 'locations'
                        ? 'Search locations'
                        : 'Search by name, email, or phone'
                  }
                  className='bg-white/50 flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              )}

            {/* Role Dropdown - Only for 'all' navId */}
            {navId === 'all' && (
              <div className='relative flex-1 role-dropdown'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search roles...'
                    className='w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]'
                    value={roleSearchTerm}
                    onChange={e => {
                      setRoleSearchTerm(e.target.value)
                      setShowRoleDropdown(true)
                    }}
                    onFocus={() => setShowRoleDropdown(true)}
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded'
                    onClick={() => {
                      setShowRoleDropdown(!showRoleDropdown)
                      if (!showRoleDropdown) {
                        setRoleSearchTerm('')
                      }
                    }}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${showRoleDropdown ? 'rotate-180' : ''
                        }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                </div>
                {showRoleDropdown && (
                  <div className='absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                    {filteredRoleDropdown.length === 0 ? (
                      <div className='px-3 py-2 text-gray-500'>
                        No roles found
                      </div>
                    ) : (
                      filteredRoleDropdown.map((role, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedRole === role ? 'bg-[#BBD3CC]' : ''
                            }`}
                          onClick={() => {
                            setSelectedRole(role)
                            setRoleSearchTerm(role)
                            setShowRoleDropdown(false)
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
            {navId === 'newusers' && (
              <div className='relative flex-1'>
                <input
                  type='date'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]'
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                />
              </div>
            )}

            {/* Login Status Dropdown - Only for 'all' navId */}
            {navId === 'all' && (
              <div className='relative flex-1 login-dropdown'>
                <div
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#A6C4BA] flex items-center justify-between'
                  onClick={() => setShowLoginDropdown(prev => !prev)}
                >
                  <span>{selectedLoginStatus}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showLoginDropdown ? 'rotate-180' : ''
                      }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
                {showLoginDropdown && (
                  <div className='absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg'>
                    {['All Users', 'Present', 'Absent'].map(status => (
                      <div
                        key={status}
                        className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedLoginStatus === status ? 'bg-[#BBD3CC]' : ''
                          }`}
                        onClick={() => {
                          setSelectedLoginStatus(status)
                          setShowLoginDropdown(false)
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
              className='px-4 py-2 bg-white/70 text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Clear
            </button>
          </div>
        )}

        {/* Filter Summary - Hidden for shifts */}
        {isFilterActive && navId !== 'shifts' && (
          <div className='px-[1rem] flex items-center justify-between text-sm text-gray-600'>
            <div>
              Showing {currentData.data.length} of {currentData.total}{' '}
              {navId === 'all'
                ? 'employees'
                : navId === 'newusers'
                  ? 'new users'
                  : navId === 'locations'
                    ? 'locations'
                    : 'roles'}
            </div>
            <div className='flex gap-2'>
              {searchTerm && (
                <span className='px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                  Search: "{searchTerm}"
                </span>
              )}
              {navId === 'all' && selectedRole !== 'All Roles' && (
                <span className='px-2 py-1 bg-green-100 text-green-800 rounded'>
                  Role: {selectedRole}
                </span>
              )}
              {navId === 'newusers' && selectedRole && (
                <span className='px-2 py-1 bg-green-100 text-green-800 rounded'>
                  Date: {selectedRole}
                </span>
              )}
              {navId === 'locations' &&
                selectedRole !== 'All Locations' &&
                selectedRole !== 'All Roles' && (
                  <span className='px-2 py-1 bg-green-100 text-green-800 rounded'>
                    Location: {selectedRole}
                  </span>
                )}
              {navId === 'all' && selectedLoginStatus !== 'All Users' && (
                <span className='px-2 py-1 bg-orange-100 text-orange-800 rounded'>
                  Status: {selectedLoginStatus}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Sections */}

        {/* All Employees */}
        {navId === 'all' && (
          <div className='px-[1rem] grid grid-cols-1 md:grid-cols-2 gap-[1rem] overflow-y-auto'>
            {currentData.loading ? (
              <div className='text-center col-span-full mt-4 text-gray-600 font-semibold'>
                <Loading />
              </div>
            ) : currentData.error ? (
              <p className='text-center col-span-full mt-4 text-red-500 font-semibold'>
                Error fetching employees
              </p>
            ) : currentData.data.length === 0 ? (
              <p className='text-center col-span-full mt-4 text-gray-500 font-medium'>
                {currentData.total === 0
                  ? 'No employees available'
                  : 'No employees match the current filters'}
              </p>
            ) : (
              currentData.data.map((emp, index) => (
                <div
                  key={emp._id || index}
                  onClick={() =>
                    navigate(`/employee/${emp._id}/details/attendance`)
                  }
                  className='cursor-pointer transition-transform hover:scale-[1.01] w-full'
                >
                  <EmployeeCard
                    name={emp.username || emp.name}
                    email={emp.email}
                    phone={emp.phoneNumber || emp.phone}
                    image={`${BASE_URL}/uploads/profilePictures/${emp._id}.png`}
                    role={emp.role?.role || emp.role?.name || emp.role || 'N/A'}
                    userid={emp._id}
                    bgColor={emp.role?.color || bgColorList[index]}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* Roles */}
        {navId === 'roles' && (
          <div className='flex-1 px-[1rem] overflow-y-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1rem] justify-items-center'>
              {currentData.loading ? (
                <div className='text-center col-span-full mt-4 text-gray-600 font-semibold'>
                  <Loading />
                </div>
              ) : currentData.error ? (
                <p className='text-center col-span-full mt-4 text-red-500 font-semibold'>
                  Error fetching roles
                </p>
              ) : currentData.data.length === 0 ? (
                <p className='text-center col-span-full mt-4 text-gray-500 font-medium'>
                  {currentData.total === 0
                    ? 'No roles available'
                    : 'No roles match the current filters'}
                </p>
              ) : (
                currentData.data.map((role, idx) => (
                  <div
                    key={role._id || idx}
                    onClick={() =>
                      navigate(`/employee/role/${role._id}/details`)
                    }
                    className='cursor-pointer transition-transform hover:scale-[1.01] w-full'
                  >
                    <RoleCard
                      role={role.role || role.name}
                      bgColor={role.color || '#e0e0e0'}
                      onEdit={() =>
                        handleEditRole({
                          role: role.role || role.name,
                          members: role.memberCount || 0,
                          color: role.color || '#e0e0e0'
                        })
                      }
                    />
                  </div>
                ))
              )}
            </div>
            <div
              className='fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]'
              onClick={() => setShowPopup(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='2rem'
                viewBox='0 -960 960 960'
                width='2rem'
                fill='#000000'
              >
                <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
              </svg>
            </div>
          </div>
        )}

        {/* Shifts */}
        {navId === 'shifts' && (
          <div className='flex-1 overflow-y-auto'>
            <ShiftTable />
          </div>
        )}

        {/* Geofencing */}
        {navId === 'locations' && (
          <div className='flex flex-col px-[1rem] gap-4 overflow-y-auto flex-1'>
            {currentData.loading ? (
              <div className='text-center col-span-full mt-4 text-gray-600 font-semibold'>
                <Loading />
              </div>
            ) : currentData.error ? (
              <p className='text-center mt-4 text-red-500 font-semibold'>
                Error fetching branches
              </p>
            ) : currentData.data.length === 0 ? (
              <p className='text-center mt-4 text-gray-500 font-medium'>
                {currentData.total === 0
                  ? 'No branches available'
                  : 'No branches match the current filters'}
              </p>
            ) : (
              currentData.data.map((loc, index) => (
                <GeoFencing
                  id={loc._id}
                  embedUrl={loc.embedURL}
                  branchName={loc.campusName}
                  _id={loc._id}
                  geoFenceRadius={loc.radius}
                  onRefresh={fetchBranches} // ✅ Pass refresh function instead of edit handler
                  onDelete={() => handleDeleteBranch(loc._id)}
                />
              ))

            )}
            <button
              className='fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]'
              onClick={() => setShowLocationForm(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='2rem'
                viewBox='0 -960 960 960'
                width='2rem'
                fill='#000000'
              >
                <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
              </svg>
            </button>
          </div>
        )}

        {/* New Users */}
        {navId === 'newusers' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-[1rem] px-[1rem] overflow-y-auto'>
            {currentData.loading ? (
              <div className='text-center col-span-full mt-4 text-gray-600 font-semibold'>
                <Loading />
              </div>
            ) : currentData.error ? (
              <p className='text-center col-span-full mt-4 text-red-500 font-semibold'>
                Error fetching new users
              </p>
            ) : currentData.data.length === 0 ? (
              <p className='text-center col-span-full mt-4 text-gray-500 font-medium'>
                {currentData.total === 0
                  ? 'No new users pending'
                  : 'No new users match the current filters'}
              </p>
            ) : (
              currentData.data.map((emp, index) => (
                <EmployeeCard
                  key={index}
                  name={emp.name}
                  email={emp.email}
                  phone={emp.phone || emp.phoneNumber}
                  role={(() => {
                    const dob = new Date(emp.dateJoined)
                    const day = String(dob.getDate()).padStart(2, '0')
                    const month = String(dob.getMonth() + 1).padStart(2, '0')
                    const year = dob.getFullYear()
                    return `${day}-${month}-${year}`
                  })()}
                  bgColor={bgColorList[index]}
                  image={`${BASE_URL}/uploads/profilePictures/${emp._id}.png`}
                  option={3}
                  onApprove={() => handleApprove(emp)}
                  onRemove={() => handleRemoveEmployee(emp)} // ADDED: This connects X button to popup
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
            onSubmit={handleAddBranch}
          />
        )}
      </div>

      {showPopup && <AddRole onClose={() => setShowPopup(false)} />}

      {showAssignPopup && selectedEmployee && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]'>
          <EmpAssignmentPopUp
            employee={selectedEmployee}
            onClose={handleClosePopup}
            onSave={handleSaveAssignment}
          />
        </div>
      )}

      {editRoleData && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]'>
          <EditRolePopup
            role={editRoleData.role}
            members={editRoleData.members}
            color={editRoleData.color}
            onClose={handleCloseEdit}
            onSave={handleSaveEditedRole}
          />
        </div>
      )}

      {/* ADDED: RemoveEmployeePopup */}
      {showRemovePopup && employeeToRemove && (
        <RemoveEmployeePopup
          employee={employeeToRemove}
          onClose={handleCloseRemovePopup}
          onConfirm={handleConfirmRemoval}
        />
      )}
    </div>
  )
}
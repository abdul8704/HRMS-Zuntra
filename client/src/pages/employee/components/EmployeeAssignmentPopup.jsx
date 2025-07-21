import React, { useState, useEffect, useRef } from 'react';
import { User, ChevronDown, Search } from 'lucide-react';
import api, { BASE_URL } from '../../../api/axios';

export const EmpAssignmentPopUp = ({ employee, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedShiftId, setSelectedShiftId] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [salary, setSalary] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showShiftDropdown, setShowShiftDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [manualSalary, setManualSalary] = useState(false);

  const [roles, setRoles] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [branches, setBranches] = useState([]);

  const roleInputRef = useRef(null);
  const shiftInputRef = useRef(null);
  const branchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, shiftsRes, branchesRes] = await Promise.all([
          api.get('/api/roles'),
          api.get('/api/shifts'),
          api.get('/api/branch')
        ]);

        const formattedRoles = rolesRes.data.map(role => ({
          id: role._id,
          name: role.role,
          baseSalary: role.baseSalary
        }));

        const formattedShifts = shiftsRes.data.map(shift => ({
          id: shift._id,
          name: shift.shiftName,
          startTime: new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));

        const formattedBranches = branchesRes.data.branches.map(branch => ({
          id: branch._id,
          name: branch.campusName
        }));

        setRoles(formattedRoles);
        setShifts(formattedShifts);
        setBranches(formattedBranches);
      } catch (error) {
        alert("Error fetching assignment data. Please try again later.");
        console.error("API fetch error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!manualSalary && selectedRole) {
      const role = roles.find(r => r.name === selectedRole);
      if (role) setSalary(role.baseSalary);
    }
  }, [selectedRole, manualSalary, roles]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleInputRef.current && !roleInputRef.current.contains(e.target)) setShowRoleDropdown(false);
      if (shiftInputRef.current && !shiftInputRef.current.contains(e.target)) setShowShiftDropdown(false);
      if (branchInputRef.current && !branchInputRef.current.contains(e.target)) setShowBranchDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(selectedRole.toLowerCase())
  );

  const handleRoleSelect = (role) => {
    setSelectedRole(role.name);
    setSelectedRoleId(role.id);
    setShowRoleDropdown(false);
    setManualSalary(false);
  };

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift.name);
    setSelectedShiftId(shift.id);
    setShowShiftDropdown(false);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch.name);
    setSelectedBranchId(branch.id);
    setShowBranchDropdown(false);
  };

  const handleSalaryChange = (e) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(val) && parseFloat(val) >= 0)) {
      setSalary(val);
      setManualSalary(true);
    }
  };

  const isFormValid =
    selectedRoleId && selectedShiftId && selectedBranchId && salary.toString().trim();

  const handleSubmit = async () => {
    if (isFormValid) {
      const selectedShiftData = shifts.find(shift => shift.id === selectedShiftId);

      if (!selectedShiftData) {
        alert("Invalid shift selected.");
        return;
      }

      try {
        const payload = {
          email: employee.email,
          shiftId: selectedShiftId,
          campusId: selectedBranchId,
          roleId: selectedRoleId,
          salary: salary
        };

        console.log("Submitting:", payload);

        const response = await api.post('/api/hr/accept', payload);

        alert("Employee assigned successfully");
        onSave();
        onClose();
        window.location.reload();
      } catch (err) {
        console.error("Error assigning employee:", err);
        alert("Error assigning employee. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setSelectedRole('');
    setSelectedShift('');
    setSelectedBranch('');
    setSelectedRoleId('');
    setSelectedShiftId('');
    setSelectedBranchId('');
    setSalary('');
    setManualSalary(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl mx-4 overflow-hidden">
          <div className="w-2/5 bg-gradient-to-br from-[#BBD3CC] to-[#A6C4BA] p-8 flex flex-col justify-center items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={`${BASE_URL}/uploads/profilePictures/${employee._id}.png`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{employee.name}</h3>
            <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full mb-2">
              <p className="text-sm font-medium text-gray-700">{employee.email}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 overflow-hidden cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" fill="none" viewBox="0 0 13 12">
                <path
                  fill="#000"
                  fillOpacity=".5"
                  d="M2.536 5.166C3.544 7.018 5.169 8.53 7.15 9.477l1.541-1.439a.732.732 0 0 1 .715-.157 8.507 8.507 0 0 0 2.5.373c.386 0 .7.294.7.654v2.283c0 .36-.314.654-.7.654C5.33 11.845 0 6.867 0 .726 0 .364.315.07.7.07h2.452c.385 0 .7.295.7.654 0 .818.14 1.603.4 2.336a.626.626 0 0 1-.175.667l-1.541 1.44Z"
                />
              </svg>
              <span className="truncate">{employee.phoneNumber}</span>
            </div>
            <p className="text-sm text-gray-600">Applied on: {employee.dateJoined}</p>
          </div>

          <div className="flex-1 p-8">
            <div className="space-y-6">
              <div className="relative" ref={roleInputRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setShowRoleDropdown(true);
                      setManualSalary(false);
                    }}
                    onFocus={() => setShowRoleDropdown(true)}
                    placeholder="Search for a role..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 pr-10"
                  />
                  <Search size={20} className="absolute right-3 top-3.5 text-gray-400" />
                </div>
                {showRoleDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredRoles.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 italic">No roles found</div>
                    ) : (
                      filteredRoles.map((role) => (
                        <div
                          key={role.name}
                          onClick={() => handleRoleSelect(role)}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                        >
                          <span className="text-gray-800">{role.name}</span>
                          <span className="text-sm text-gray-500">{role.baseSalary}/hr</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="relative" ref={shiftInputRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shift</label>
                <div
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setShowShiftDropdown(!showShiftDropdown)}
                >
                  <span className={selectedShift ? 'text-gray-800' : 'text-gray-500'}>
                    {selectedShift || 'Select shift'}
                  </span>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                {showShiftDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {shifts.map((shift) => (
                      <div
                        key={shift.id}
                        onClick={() => handleShiftSelect(shift)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                      >
                        <span className="text-gray-800 capitalize">{shift.name}</span>
                        <span className="text-sm text-gray-500">{shift.startTime} - {shift.endTime}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={branchInputRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                <div
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                >
                  <span className={selectedBranch ? 'text-gray-800' : 'text-gray-500'}>
                    {selectedBranch || 'Select branch'}
                  </span>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                {showBranchDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {branches.map((branch) => (
                      <div
                        key={branch.id}
                        onClick={() => handleBranchSelect(branch)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-800">{branch.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Salary (per hour)</label>
                <input
                  type="number"
                  min="0"
                  value={salary}
                  onChange={handleSalaryChange}
                  placeholder="Select role to get salary"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={handleCancel}
                  className="py-3 min-w-[120px] border border-gray-300 text-gray-700 rounded-full font-medium transition-colors duration-300 hover:bg-[#E1BEC5] hover:text-white hover:border-[#E1BEC5]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`py-3 min-w-[120px] rounded-full font-medium transition-colors duration-300 ${isFormValid
                    ? 'bg-[#BBD3CC] text-gray-700 hover:bg-[#A6C4BA]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  Recruit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
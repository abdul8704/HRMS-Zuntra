import React, { useState, useEffect, useRef } from 'react';
import { User, ChevronDown, Search, X } from 'lucide-react';

export const EmpAssignmentPopUp = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [salary, setSalary] = useState('');c  
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showShiftDropdown, setShowShiftDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [manualSalary, setManualSalary] = useState(false);

  const roleInputRef = useRef(null);
  const shiftInputRef = useRef(null);
  const branchInputRef = useRef(null);

  // Mock data
  const roles = [
    { name: 'Marketing Head', baseSalary: 25 },
    { name: 'Marketing Lead', baseSalary: 20 },
    { name: 'Marketing Executive', baseSalary: 15 },
    { name: 'Sales Manager', baseSalary: 22 },
    { name: 'Sales Executive', baseSalary: 18 },
    { name: 'HR Manager', baseSalary: 24 },
    { name: 'HR Executive', baseSalary: 16 },
    { name: 'Developer', baseSalary: 30 },
    { name: 'Designer', baseSalary: 20 },
    { name: 'Content Writer', baseSalary: 14 }
  ];

  const shifts = [
    { id: 1, name: 'Morning', startTime: '09:00', endTime: '17:00' },
    { id: 2, name: 'Evening', startTime: '17:00', endTime: '01:00' },
    { id: 3, name: 'Night', startTime: '01:00', endTime: '09:00' }
  ];

  const branches = [
    { id: 1, name: 'Zuntre Perungudi' },
    { id: 2, name: 'New York Office' },
    { id: 3, name: 'Los Angeles Office' },
    { id: 4, name: 'Chicago Office' },
    { id: 5, name: 'Miami Office' }
  ];

  const employee = {
    name: 'John Doe',
    email: 'doe@gmail.com',
    phone: '5461664',
    date: '2025-07-01'
  };

  // Auto-update salary when role changes
  useEffect(() => {
    if (!manualSalary && selectedRole) {
      const role = roles.find(r => r.name === selectedRole);
      if (role) {
        setSalary(role.baseSalary);
      }
    }
  }, [selectedRole, manualSalary]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleInputRef.current && !roleInputRef.current.contains(e.target)) {
        setShowRoleDropdown(false);
      }
      if (shiftInputRef.current && !shiftInputRef.current.contains(e.target)) {
        setShowShiftDropdown(false);
      }
      if (branchInputRef.current && !branchInputRef.current.contains(e.target)) {
        setShowBranchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(selectedRole.toLowerCase())
  );

  const handleRoleSelect = (role) => {
    setSelectedRole(role.name);
    setShowRoleDropdown(false);
    setManualSalary(false);
  };

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift.name);
    setShowShiftDropdown(false);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch.name);
    setShowBranchDropdown(false);
  };

  const handleSalaryChange = (e) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(val) && parseFloat(val) >= 0)) {
      setSalary(val);
      setManualSalary(true);
    }
  };

  const isFormValid = selectedRole.trim() && selectedShift.trim() && selectedBranch.trim() && salary.toString().trim();

  const handleSubmit = () => {
    if (isFormValid) {
      alert(`Employee assigned successfully!
Role: ${selectedRole}
Shift: ${selectedShift}
Branch: ${selectedBranch}
Salary: ${salary}/hour`);
    }
  };

  const handleCancel = () => {
    // Reset all form fields
    setSelectedRole('');
    setSelectedShift('');
    setSelectedBranch('');
    setSalary('');
    setManualSalary(false);
    // In a real app, this would close the popup
    alert('Assignment cancelled');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl mx-4 overflow-hidden">
        {/* Left Side - Employee Info */}
        <div className="w-2/5 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex flex-col justify-center items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User size={48} className="text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{employee.name}</h3>
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full mb-2">
            <p className="text-sm font-medium text-gray-700">{employee.email}</p>
          </div>
          <p className="text-sm text-gray-600 mb-1">{employee.phone}</p>
          <p className="text-sm text-gray-600">Applied on: {employee.date}</p>
        </div>

        {/* Right Side - Assignment Form */}
        <div className="flex-1 p-8">
          <div className="space-y-6">
            {/* Role Selection */}
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

            {/* Shift Selection */}
            <div className="relative" ref={shiftInputRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shift</label>
              <div 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 cursor-pointer flex justify-between items-center"
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

            {/* Branch Selection */}
            <div className="relative" ref={branchInputRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
              <div 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 cursor-pointer flex justify-between items-center"
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

            {/* Salary Input */}
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button 
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFormValid 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Recruit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default EmpAssignmentPopUp;
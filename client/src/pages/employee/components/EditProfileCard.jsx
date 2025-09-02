import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import api, { BASE_URL } from '../../../api/axios';

export const EditProfileCard = ({ data, onClose, onSave, editMode, currentUser }) => {
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Initial Values for Personal Details
  const initialDob = formatDateForInput(data.personalDetail?.DOB) || '';
  const initialReligion = data.personalDetail?.religion || '';
  const initialAddress = data.personalDetail?.Address || '';

  // Initial Values for Professional Details
  const initialRole = data.role?._id || '';
  const initialCampus = data.campus?._id || '';
  const initialShift = data.shift?._id || '';
  const initialSalary = data.personalDetail?.Salary || '';

  // State Management for Personal Details
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageEdited, setProfileImageEdited] = useState(false);
  const [dob, setDob] = useState(initialDob);
  const [religion, setReligion] = useState(initialReligion);
  const [address, setAddress] = useState(initialAddress);
  
  // State Management for Professional Details
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedCampus, setSelectedCampus] = useState(initialCampus);
  const [selectedShift, setSelectedShift] = useState(initialShift);
  const [salary, setSalary] = useState(initialSalary);

  // Dropdown Options State
  const [roles, setRoles] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [shifts, setShifts] = useState([]);
  
  // Religion Dropdown State
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);
  const [filteredReligions, setFilteredReligions] = useState([]);

  const religionInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Determine if this is personal editing mode
  const isPersonalMode = editMode === 'personal';
  const isProfessionalMode = editMode === 'professional';

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhism', 'Other'];

  // Validation Logic
  const isPersonalFormValid = () => {
    return (
      dob.trim() &&
      religion.trim() &&
      address.trim() &&
      (
        dob !== initialDob ||
        religion !== initialReligion ||
        address !== initialAddress ||
        profileImageEdited
      )
    );
  };

  const isProfessionalFormValid = () => {
    return (
      selectedRole &&
      selectedCampus &&
      selectedShift &&
      salary &&
      (
        selectedRole !== initialRole ||
        selectedCampus !== initialCampus ||
        selectedShift !== initialShift ||
        salary !== initialSalary
      )
    );
  };

  const isFormValid = isPersonalMode ? isPersonalFormValid() : isProfessionalFormValid();

  // Fetch dropdown options for professional editing
  useEffect(() => {
    const fetchDropdownData = async () => {
      if (isProfessionalMode) {
        try {
          const [rolesRes, campusesRes, shiftsRes] = await Promise.all([
            api.get('/api/roles'),
            api.get('/api/campuses'),
            api.get('/api/shifts')
          ]);

          if (rolesRes.data.success) setRoles(rolesRes.data.data);
          if (campusesRes.data.success) setCampuses(campusesRes.data.data);
          if (shiftsRes.data.success) setShifts(shiftsRes.data.data);
        } catch (error) {
          console.error('Error fetching dropdown data:', error);
        }
      }
    };

    fetchDropdownData();
  }, [isProfessionalMode]);

  // Submit Handler
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      if (isPersonalMode) {
        // Personal details update (own profile)
        const userData = { dob, religion, address };
        await api.patch('/api/employee/updateprofile', userData);

        if (profileImageEdited) {
          const formData = new FormData();
          formData.append("profilePicture", profileImage);
          await api.post(`/auth/signup/uploadprofile/${data._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      } else if (isProfessionalMode) {
        // Professional details update (CEO/HR editing others)
        const professionalData = {
          roleId: selectedRole,
          campusId: selectedCampus,
          shiftId: selectedShift,
          salary: parseFloat(salary)
        };
        await api.patch(`/api/employee/updateprofessional/${data._id}`, professionalData);
      }

      alert('Profile updated successfully');
      window.location.reload();
      onSave?.();
      onClose?.();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset personal details
    setDob(initialDob);
    setReligion(initialReligion);
    setAddress(initialAddress);
    setProfileImage(null);
    setProfileImageEdited(false);
    
    // Reset professional details
    setSelectedRole(initialRole);
    setSelectedCampus(initialCampus);
    setSelectedShift(initialShift);
    setSalary(initialSalary);
    
    onClose?.();
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImageEdited(true);
    }
  };

  const handleReligionInput = (input) => {
    const match = religions.filter((r) =>
      r.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredReligions(match);
    setReligion(input);
    setShowReligionDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (religionInputRef.current && !religionInputRef.current.contains(e.target)) {
        setShowReligionDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl mx-4">
        {/* Left - Profile Summary */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[#BBD3CC] to-[#A6C4BA] p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-md">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : `${BASE_URL}/uploads/profilePictures/${data._id}.png`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isPersonalMode && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-sm hover:bg-gray-100"
                >
                  ✎
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                hidden
                ref={fileInputRef}
              />
            </div>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{data.username || 'No name'}</h3>
          <p className="text-sm text-gray-700 mt-1">{data.email || 'No email'}</p>
          <p className="text-sm text-gray-600">{data.phoneNumber || 'No phone'}</p>
          <p className="text-sm text-gray-600 mt-1">
            {data.personalDetail?.Salary ? `₹ ${data.personalDetail.Salary} per hour` : '₹0'}
          </p>
          {!isPersonalMode && (
            <div className="mt-3 text-sm text-gray-600">
              <p className="bg-white/20 px-3 py-1 rounded-full">
                Editing by: {currentUser?.username} ({currentUser?.role?.role})
              </p>
            </div>
          )}
        </div>

        {/* Right - Form */}
        <div className="flex-1 p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isPersonalMode ? 'Edit Personal Details' : 'Edit Professional Details'}
          </h2>

          {isPersonalMode ? (
            // Personal Details Form
            <>
              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Religion Dropdown */}
              <div className="relative" ref={religionInputRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <div
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowReligionDropdown(!showReligionDropdown)}
                >
                  <input
                    type="text"
                    value={religion}
                    onChange={(e) => handleReligionInput(e.target.value)}
                    placeholder="Select religion"
                    className="bg-transparent w-full outline-none text-gray-800"
                  />
                  <ChevronDown className="text-gray-400" size={18} />
                </div>
                {showReligionDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow">
                    {(filteredReligions.length > 0 ? filteredReligions : religions).map((rel) => (
                      <div
                        key={rel}
                        onClick={() => {
                          setReligion(rel);
                          setShowReligionDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {rel}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          ) : (
            // Professional Details Form (CEO/HR editing others)
            <>
              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campus Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campus/Branch</label>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Campus</option>
                  {campuses.map((campus) => (
                    <option key={campus._id} value={campus._id}>
                      {campus.campusName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shift Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  {shifts.map((shift) => (
                    <option key={shift._id} value={shift._id}>
                      {shift.shiftName?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary (per hour)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Enter hourly salary"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleCancel}
              className="py-2 px-6 border border-gray-300 rounded-full text-gray-700 hover:bg-[#E1BEC5] hover:text-white hover:border-[#E1BEC5] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`py-2 px-6 rounded-full font-medium transition 
                ${isFormValid
                  ? 'bg-[#BBD3CC] text-gray-700 hover:bg-[#A6C4BA]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              Save {isPersonalMode ? 'Personal' : 'Professional'} Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
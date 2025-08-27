import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import api, { BASE_URL } from '../../../api/axios';

export const EditProfileCard = ({ data, onClose, onSave }) => {
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Initial Values
  const initialDob = formatDateForInput(data.personalDetail?.DOB) || '';
  const initialReligion = data.personalDetail?.religion || '';
  const initialAddress = data.personalDetail?.Address || '';

  // State Management
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageEdited, setProfileImageEdited] = useState(false);
  const [dob, setDob] = useState(initialDob);
  const [religion, setReligion] = useState(initialReligion);
  const [address, setAddress] = useState(initialAddress);
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);
  const [filteredReligions, setFilteredReligions] = useState([]);

  const religionInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhism', 'Other'];

  const isFormValid =
    dob.trim() &&
    religion.trim() &&
    address.trim() &&
    (
      dob !== initialDob ||
      religion !== initialReligion ||
      address !== initialAddress ||
      profileImageEdited
    );

  // Submit Handler
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      const userData = { dob, religion, address };
      await api.patch('/api/employee/updateprofile', userData);

      if (profileImageEdited) {
        const formData = new FormData();
        formData.append("profilePicture", profileImage);
        await api.post(`/auth/signup/uploadprofile/${data._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
    setDob(initialDob);
    setReligion(initialReligion);
    setAddress(initialAddress);
    setProfileImage(null);
    setProfileImageEdited(false);
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
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-sm hover:bg-gray-100"
              >
                ✎
              </button>
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
        </div>

        {/* Right - Form */}
        <div className="flex-1 p-6 space-y-6">
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

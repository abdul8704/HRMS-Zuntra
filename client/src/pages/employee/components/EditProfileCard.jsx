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

  // State
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageEdited, setProfileImageEdited] = useState(false);
  const [dob, setDob] = useState(initialDob);
  const [religion, setReligion] = useState(initialReligion);
  const [address, setAddress] = useState(initialAddress);
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);

  const religionInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const religions = ['Hindu', 'Muslim', 'Christian', 'Atheist', 'Other'];

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

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      const userData = { dob, religion, address };
      await api.patch('/api/employee/updateprofile', userData);
      if (profileImageEdited) {
        const formData = new FormData();
        formData.append("profilePicture", profileImage);
        await api.post(`/auth/signup/uploadprofile/${data._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      alert('Profile updated successfully');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl mx-4 overflow-hidden">
        {/* Left: Profile Summary */}
        <div className="w-2/5 bg-gradient-to-br from-[#BBD3CC] to-[#A6C4BA] p-8 flex flex-col justify-center items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg relative">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : `${BASE_URL}/uploads/profilePictures/${data._id}.png`
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center transition"
                title="Edit Profile Picture"
              >
                ✎
              </button>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                hidden
                ref={fileInputRef}
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.username || 'No name'}</h3>
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full mb-2">
            <p className="text-sm font-medium text-gray-700">{data.email || 'No email'}</p>
          </div>
          <p className="text-sm text-gray-600 mb-1">{data.phoneNumber || 'No phone'}</p>
          <p className="text-sm text-gray-600 mb-1">
            {data.personalDetail?.Salary ? `₹ ${data.personalDetail.Salary} per hour` : '₹0'}
          </p>
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-8">
          <div className="space-y-6">
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Select date of birth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Religion Dropdown */}
            <div className="relative" ref={religionInputRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Religion</label>
              <div
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => setShowReligionDropdown(!showReligionDropdown)}
              >
                <span className={religion ? 'text-gray-800' : 'text-gray-500'}>
                  {religion || 'Select religion'}
                </span>
                <ChevronDown size={20} className="text-gray-400" />
              </div>
              {showReligionDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {religions.map((rel) => (
                    <div
                      key={rel}
                      onClick={() => {
                        setReligion(rel);
                        setShowReligionDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
                    >
                      <span className="text-gray-800">{rel}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                rows="3"
                className="w-full h-20 px-4 py-3 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 resize-none overflow-y-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* Buttons */}
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
                className={`py-3 min-w-[120px] rounded-full font-medium transition-colors duration-300
                  ${isFormValid
                    ? 'bg-[#BBD3CC] text-gray-700 hover:bg-[#A6C4BA]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
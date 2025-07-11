import React, { useState } from 'react';
import userIcon from "../../assets/user-icon.jpg";

export default function EditProfileCard({ onClose }) {
  const [profile, setProfile] = useState({
    username: '',
    phone: '',
    dob: '',
    religion: '',
    address: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    alert('Submitted!');
  };

  return (
    <>
      <div className="edit-card-container">
        <div className="edit-card-header">
          <h2>Edit Profile</h2>
          <span onClick={onClose} className="popup-close-btn">&times;</span>
        </div>

        {/* Profile Picture */}
        <div className="profile-picture-wrapper">
          <div className="profile-picture-circle">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : userIcon}
              alt="Profile"
              className="profile-picture-img"
            />
          </div>

          <label htmlFor="profile-upload" className="profile-edit-icon">
            <span className="edit-icon">✎</span>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              hidden
            />
          </label>
        </div>

        {/* Form Fields */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />

        <label>Phone Number</label>
        <input
          type="number"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        <label>Religion</label>
        <input
          type="text"
          name="religion"
          value={profile.religion}
          onChange={handleChange}
          placeholder="Enter your religion"
        />

        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Enter your address"
          rows="3"
        />

        <button className="submit-btn" onClick={handleSubmitChanges}>Submit</button>
      </div>

      <style jsx>{`

        .edit-card-container {
          max-width: 640px;
          padding: 20px 32px;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
          position: relative;
        }

        .edit-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .popup-close-btn {
          font-size: 22px;
          cursor: pointer;
          font-weight: bold;
          color: #aaa;
        }

        .popup-close-btn:hover {
          color: #444;
        }

        .profile-picture-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 24px;
        }

        .profile-picture-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-picture-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-edit-icon {
          position: absolute;
          bottom: 4px;
          right: 6px;
          background: #08bdb1;
          color: white;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
        }

        label {
          display: block;
          margin-top: 18px;
          font-size: 14px;
          font-weight: 500;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 10px;
          margin-top: 6px;
          background: #f9f9f9;
          color: #111;
        }

        textarea {
          resize: vertical;
        }

        .submit-btn {
          margin-top: 28px;
          width: 100%;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          background-color: #08bdb1;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .submit-btn:hover {
          background-color: rgb(2, 154, 110);
        }
      `}</style>
    </>
  );
}

import React, { useState } from 'react';

export default function EditProfileCard({ onClose }) {
  const [profile, setProfile] = useState({
    username: 'a.b.i.s.h_',
    phone: '',
    dob: '',
    religion: '',
    address: '',
    photo: '/Abish.jpg',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setNewImageUrl('');
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmitPhoto = () => {
    if (newImageUrl.trim() !== '') {
      setProfile({ ...profile, photo: newImageUrl });
    }
    closeModal();
  };

  const handleSubmitChanges = (e) => {
    alert("sdjhvbsdkjhfv")
  }

  return (
    <>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Edit Profile</h2>
          {/* Close Popup Button */}
          <span onClick={onClose} className="popup-close-btn">&times;</span>
        </div>

        {/* Header Card */}
        <div className="header-card">
          <img src={profile.photo} alt="Profile" className="profile-pic" />
          <div className="user-details">
            <p className="username">{profile.username || 'Username'}</p>
          </div>
          <button className="change-photo-btn" onClick={openModal}>Change photo</button>
        </div>

        {/* Username */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />

        {/* Phone */}
        <label>Phone Number</label>
        <input
          type="number"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        {/* DOB */}
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        {/* Religion */}
        <label>Religion</label>
        <input
          type="text"
          name="religion"
          value={profile.religion}
          onChange={handleChange}
          placeholder="Enter your religion"
        />

        {/* Address */}
        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Enter your address"
          rows="3"
        />

        {/* Submit */}
        <button className="submit-btn" onClick={handleSubmitChanges}>Submit</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Enter Image URL</h3>
              <span onClick={closeModal} className="close-btn">&times;</span>
            </div>
            {newImageUrl && (
              <img src={newImageUrl} alt="Preview" className="preview-image" />
            )}
            <label>Image URL</label>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <div className="modal-buttons">
              <button className="cancel" onClick={closeModal}>Cancel</button>
              <button className="submit" onClick={handleSubmitPhoto} disabled={!newImageUrl.trim()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 520px;
          margin: 60px auto;
          padding: 32px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
          font-family: 'Segoe UI', sans-serif;
          color: #111;
          position: relative;
        }

        h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .popup-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          cursor: pointer;
          font-size: 24px;
          font-weight: bold;
          color: #999;
          z-index: 10;
        }

        .popup-close-btn:hover {
          color: #333;
        }

        .header-card {
          display: flex;
          align-items: center;
          background: #f4f4f4;
          padding: 16px;
          border-radius: 14px;
          gap: 16px;
          margin-bottom: 24px;
        }

        .profile-pic {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-details {
          flex-grow: 1;
        }

        .username {
          font-weight: 600;
          font-size: 16px;
        }

        .change-photo-btn {
          background-color: rgb(14, 194, 139);
          color: white;
          font-size: 13px;
          padding: 6px 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        label {
          display: block;
          margin-top: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 12px;
          margin-top: 6px;
          background: #f9f9f9;
          color: #111;
        }

        textarea {
          resize: vertical;
        }

        .submit-btn {
          margin-top: 30px;
          width: 100%;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          background-color:rgb(14, 194, 139);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .submit-btn:hover {
          background-color: rgb(2, 154, 110);
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 16px;
        }

        .close-btn {
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
        }

        .modal input {
          margin-top: 6px;
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 12px;
          background: #f9f9f9;
          box-sizing: border-box;
        }

        .preview-image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 12px;
          border: 1px solid #ddd;
        }

        .modal-buttons {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal-buttons button {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          border: none;
        }

        .modal-buttons .cancel {
          background: #eee;
        }

        .modal-buttons .submit {
          background: rgb(14, 194, 139);
          color: white;
        }

        .modal-buttons .submit:disabled {
          background: #bbb;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

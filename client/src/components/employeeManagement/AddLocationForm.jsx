import React, { useState } from 'react';

export const AddLocationForm = ({ isOpen = false, onClose = () => { }, onSubmit = () => { } }) => {
  const [formData, setFormData] = useState({
    branchName: '',
    address: '',
    radius: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    console.log('Form Data:', formData);
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="add-loc-overlay">
        <div className="add-loc-container">
          <button
            onClick={onClose}
            className="add-loc-close-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="add-loc-content">
            <h2 className="add-loc-title">Add New Company Location</h2>

            <div className="add-loc-input-group">
              <input
                type="text"
                placeholder="Enter branch name"
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
                className="add-loc-input"
              />

              <input
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="add-loc-input"
              />

              <input
                type="text"
                placeholder="Enter radius (in meters)"
                value={formData.radius}
                onChange={(e) => handleInputChange('radius', e.target.value)}
                className="add-loc-input"
              />
            </div>

            <div className="add-loc-button-wrapper">
              <button
                onClick={handleAdd}
                className="add-loc-add-btn"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .add-loc-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
          }

          .add-loc-container {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            width: 100%;
            max-width: 32rem;
            margin: 1rem;
            position: relative;
          }

          .add-loc-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            color: #9ca3af;
            transition: color 0.3s;
          }

          .add-loc-close-btn:hover {
            color: #4b5563;
          }

          .add-loc-content {
            padding: 2rem;
          }

          .add-loc-title {
            font-size: 1.25rem;
            font-weight: 500;
            color: #1f2937;
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .add-loc-input-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .add-loc-input {
            width: 100%;
            padding: 1rem;
            background-color: #f3f4f6;
            border: none;
            border-radius: 0.5rem;
            outline: none;
            color: #374151;
            transition: background-color 0.3s;
          }

          .add-loc-input::placeholder {
            color: #6b7280;
          }

          .add-loc-input:focus {
            background-color: #e5e7eb;
          }

          .add-loc-button-wrapper {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
          }

          .add-loc-add-btn {
            background-color: #BBD3CC;
            color: #374151;
            font-weight: 500;
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            min-width: 120px;
            transition: background-color 0.3s;
          }

          .add-loc-add-btn:hover {
            background-color: #BBD3CC;
          }
        `}
      </style>
    </>
  );
};

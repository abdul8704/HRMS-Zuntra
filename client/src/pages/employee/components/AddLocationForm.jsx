import React, { useState } from 'react';
import axios from "../../../api/axios";
export const AddLocationForm = ({ isOpen = false, onClose = () => { }, refreshLocations = () => { } }) => {
  const [formData, setFormData] = useState({
    campusName: '',
    embedURL: '',
    radius: ''
  });

  const [formErrors, setFormErrors] = useState({
    campusName: '',
    embedURL: '',
    radius: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleAdd = async () => {
    const { campusName, embedURL, radius } = formData;
    const errors = { campusName: "", embedURL: "", radius: "" };
    let isValid = true;

    if (!campusName.trim()) {
      errors.campusName = "Branch name is required.";
      isValid = false;
    }
    if (!embedURL.trim()) {
      errors.embedURL = 'Address is required.';
      isValid = false;
    } else if (!embedURL.startsWith('https://www.google.com/maps/embed?')) {
      errors.embedURL = 'Address must be a valid Google Maps embed URL.';
      isValid = false;
    }

    const radiusValue = parseFloat(radius);
    if (!radius.trim()) {
      errors.radius = "Radius is required.";
      isValid = false;
    } else if (isNaN(radiusValue) || radiusValue <= 0) {
      errors.radius = "Radius must be a valid positive number.";
      isValid = false;
    }

    setFormErrors(errors);
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/branch/new-branch", {
        campusName,
        embedURL,
        radius: radiusValue,
      });

      // ✅ Success
      console.log("Added:", res.data);
      refreshLocations(); // reload list
      onClose();
    } catch (err) {
      console.error("Add branch failed:", err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="add-loc-overlay">
      <div className="add-loc-container">
        <button onClick={onClose} className="add-loc-close-btn">✕</button>
        <div className="add-loc-content">
          <h2 className="add-loc-title">Add New Company Location</h2>
          <form className="add-loc-input-group" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Enter campus name"
                value={formData.campusName}
                onChange={(e) => handleInputChange('campusName', e.target.value)}
                className="add-loc-input"
              />
              {formErrors.campusName && <p className="add-loc-error-text">{formErrors.campusName}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter address URL"
                value={formData.embedURL}
                onChange={(e) => handleInputChange('embedURL', e.target.value)}
                className="add-loc-input"
              />
              {formErrors.embedURL && <p className="add-loc-error-text">{formErrors.embedURL}</p>}
            </div>

            <div>
              <input
                type="number"
                min="0"
                placeholder="Enter radius (in meters)"
                value={formData.radius}
                onChange={(e) => handleInputChange('radius', e.target.value)}
                className="add-loc-input"
              />
              {formErrors.radius && <p className="add-loc-error-text">{formErrors.radius}</p>}
            </div>
          </form>

          <div className="add-loc-button-wrapper">
            <button onClick={handleAdd} disabled={loading} className="add-loc-add-btn">
              {loading ? "Adding..." : "Add"}
            </button>
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
            z-index: 2000;
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
            background-color: #A6C4BA;
          }

          .add-loc-error-text {
            color: #dc2626;
            font-size: 0.675rem;
            margin-top: 0.25rem;
            margin-left: 0.25rem;
          }
        `}
      </style>
    </div>
  );
};

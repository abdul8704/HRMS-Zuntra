import React, { useState, useEffect, useRef } from "react";

export const EmpAssignmentPopUp = ({ employee, isOpen, onClose, onSave }) => {
  const roles = {
    'Software Engineer': '80000',
    'Senior Software Engineer': '120000',
    'Team Lead': '150000',
    'Project Manager': '180000',
    'HR Executive': '600000',
    'Business Analyst': '100000',
    'UI/UX Designer': '750000',
    'QA Engineer': '605000',
    'DevOps Engineer': '110000',
    'Data Analyst': '900000',
  };

  const shifts = [
    'Morning (9:00 AM - 6:00 PM)',
    'Evening (2:00 PM - 11:00 PM)',
    'Night (10:00 PM - 7:00 AM)',
    'Flexible',
  ];

  const branches = ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'];

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [salary, setSalary] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [manualSalary, setManualSalary] = useState(false);

  const roleInputRef = useRef(null);

  useEffect(() => {
    if (!manualSalary && roles[selectedRole]) {
      setSalary(roles[selectedRole]);
    }
  }, [selectedRole]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleInputRef.current && !roleInputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isFormValid) {
      onSave({
        role: selectedRole,
        shift: selectedShift,
        branch: selectedBranch,
        salary,
      });
    }
  };

  const filteredRoles = Object.keys(roles).filter((role) =>
    role.toLowerCase().includes(selectedRole.toLowerCase())
  );

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setShowDropdown(false);
    setManualSalary(false);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
    setManualSalary(true);
  };

  const isFormValid =
    selectedRole.trim() &&
    selectedShift.trim() &&
    selectedBranch.trim() &&
    salary.toString().trim();

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Left */}
        <div className="popup-left">
          <img src={employee.image} alt="Profile" />
          <h3 className="emp-emp-name">{employee.name}</h3>
          <p className="emp-info emp-email-bg">{employee.email}</p>
          <p className="emp-info">{employee.phone}</p>
          <p className="emp-info">Applied on : {employee.date}</p>
        </div>

        {/* Right */}
        <div className="popup-right">
          <label ref={roleInputRef}>
            Role:
            <input
              type="text"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setManualSalary(false);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Select or search role"
            />
            {showDropdown && (
              <ul className="dropdown">
                {filteredRoles.length === 0 ? (
                  <li className="no-option">No roles found</li>
                ) : (
                  filteredRoles.map((role) => (
                    <li key={role} onClick={() => handleSelectRole(role)}>
                      {role}
                    </li>
                  ))
                )}
              </ul>
            )}
          </label>

          <label>
            Shift:
            <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)} required>
              <option value="" disabled hidden>Select shift</option>
              {shifts.map((shift) => (
                <option key={shift} value={shift}>{shift}</option>
              ))}
            </select>
          </label>

          <label>
            Branch:
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} required>
              <option value="" disabled hidden>Select branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </label>

          <label>
            Salary (per hour):
            <input
              type="number"
              value={salary}
              onChange={handleSalaryChange}
              placeholder="Select role to get salary"
            />
          </label>

          <div className="popup-buttons">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="recruit-btn" onClick={handleSubmit} disabled={!isFormValid}>Recruit</button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-container {
          background: white;
          border-radius: 1rem;
          display: flex;
          flex-direction: row;
          width: 90%;
          max-width: 43.75rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
          overflow: hidden;
          align-items: stretch;
        }

        .popup-left {
          width: 35%;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          text-align: center;
        }

        .popup-left img {
          width: 7rem;
          height: 7rem;
          border-radius: 1rem;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .emp-emp-name {
          font-size: 1.5rem;
          font-weight: normal;
          margin: 0.5rem 0;
          word-wrap: break-word;
          white-space: normal;
          text-align: center;
          width: 100%;
        }

        .emp-info {
          font-size: 0.85rem;
          opacity: 0.7;
          margin: 0.15rem 0;
          word-wrap: break-word;
          white-space: normal;
          text-align: center;
          width: 100%;
        }

        .emp-email-bg {
          background-color: rgba(255, 255, 255, 0.8);
          color: rgba(0, 0, 0, 0.7);
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          display: inline-block;
          font-size: 0.85rem;
          opacity: 0.9;
          word-wrap: break-word;
          white-space: normal;
          text-align: center;
          max-width: 100%;
        }

        .popup-right {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }

        label {
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        input,
        select {
          padding: 0.5rem;
          margin-top: 0.3rem;
          border-radius: 0.4rem;
          border: 0.0625rem solid #ccc;
          font-size: 0.95rem;
        }

        select:invalid {
          color: rgba(0, 0, 0, 0.4);
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 0.0625rem solid #ccc;
          border-radius: 0.4rem;
          max-height: 8rem;
          overflow-y: auto;
          z-index: 10;
        }

        .dropdown li {
          padding: 0.5rem;
          cursor: pointer;
        }

        .dropdown li:hover {
          background-color: #f0f0f0;
        }

        .no-option {
          padding: 0.5rem;
          color: #888;
        }

        .popup-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .cancel-btn,
        .recruit-btn {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cancel-btn {
          background-color: #f3f4f6;
          color: black;
          font-weight: normal;
        }

        .cancel-btn:hover {
          background-color: red;
          opacity: 0.5;
          color: white;
          font-weight: normal;
        }

        .recruit-btn {
          background-color: rgba(140, 221, 132, 0.8);
          color: white;
          font-weight: normal;
        }

        .recruit-btn:not(:disabled):hover {
          background-color: green;
          opacity: 0.7;
          font-weight: normal;
        }

        .recruit-btn:disabled,
        .recruit-btn:disabled:hover {
          background-color: #d1d5d6;
          opacity: 1;
          cursor: not-allowed;
          font-weight: normal;
        }

        @media (max-width: 37.5rem) {
          .popup-container {
            flex-direction: column;
            max-width: 95%;
          }

          .popup-left,
          .popup-right {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

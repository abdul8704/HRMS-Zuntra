import React, { useState, useEffect, useRef } from 'react';
import { X, Check, User, Clock, IndianRupee } from 'lucide-react';

export const EmpAssignmentPopUp = ({ employee, isOpen, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [salary, setSalary] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const roleInputRef = useRef();

  const roleSalaryMap = {
    'Software Engineer': '₹8,00,000',
    'Senior Software Engineer': '₹1,20,000',
    'Team Lead': '₹1,50,000',
    'Project Manager': '₹1,80,000',
    'HR Executive': '₹6,00,000',
    'Business Analyst': '₹1,00,000',
    'UI/UX Designer': '₹75,000',
    'QA Engineer': '₹65,000',
    'DevOps Engineer': '₹1,10,000',
    'Data Analyst': '₹90,000'
  };

  const roles = Object.keys(roleSalaryMap);
  const shifts = [
    'Morning (9:00 AM - 6:00 PM)',
    'Evening (2:00 PM - 11:00 PM)',
    'Night (10:00 PM - 7:00 AM)',
    'Flexible'
  ];

  const getSortedRoles = (input) => {
    if (!input) return roles;
    const lowerInput = input.toLowerCase();
    const startsWithInput = roles.filter((r) =>
      r.toLowerCase().startsWith(lowerInput)
    );
    const includesInput = roles.filter(
      (r) =>
        !r.toLowerCase().startsWith(lowerInput) &&
        r.toLowerCase().includes(lowerInput)
    );
    return [...startsWithInput, ...includesInput];
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setSalary(roleSalaryMap[role] || '');
    setShowDropdown(false);
  };

  const handleSave = () => {
    if (!selectedRole || !selectedShift) {
      alert('Please select both role and shift');
      return;
    }

    const assignmentData = {
      employee,
      role: selectedRole,
      shift: selectedShift,
      salary
    };

    onSave(assignmentData);
    handleClose();
  };

  const handleClose = () => {
    setSelectedRole('');
    setSelectedShift('');
    setSalary('');
    setShowDropdown(false);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleInputRef.current && !roleInputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen || !employee) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-emp-info">
            <img src={employee.image} alt={employee.name} className="popup-avatar" />
            <div>
              <h3 className="popup-emp-name">{employee.name}</h3>
              <p className="popup-emp-email">{employee.email}</p>
              <p className="popup-emp-date">Applied: {employee.date}</p>
            </div>
          </div>

          <div className="popup-body">
            <div ref={roleInputRef} style={{ position: 'relative' }}>
  <label className="popup-label">Select Role *</label>
  <div className="popup-select-wrapper">
    <input
      type="text"
      placeholder="Choose the role"
      value={selectedRole}
      onChange={(e) => {
        setSelectedRole(e.target.value);
        setShowDropdown(true);
      }}
      onFocus={() => setShowDropdown(true)}
      className="popup-select role-input"
    />
  </div>
  {showDropdown && (
    <ul className="popup-dropdown">
      {getSortedRoles(selectedRole).map((role) => (
        <li
          key={role}
          className="popup-dropdown-item"
          onClick={() => handleRoleChange(role)}
        >
          {role}
        </li>
      ))}
    </ul>
  )}
</div>


            <div>
              <label className="popup-label">
                Select Shift *
              </label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="popup-select"
              >
                <option value="">Choose a shift...</option>
                {shifts.map((shift) => (
                  <option key={shift} value={shift}>{shift}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="popup-label">
                Monthly Salary
              </label>
              <div className={`popup-salary ${!salary ? 'dim-text' : ''}`}>
                {salary || 'Select a role to see salary'}
              </div>
            </div>
          </div>

          <div className="popup-footer">
            <button className="popup-cancel" onClick={handleClose}>Cancel</button>
            <button
              className="popup-submit"
              onClick={handleSave}
              disabled={!selectedRole || !selectedShift}
            >
             
              Assign Employee
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
        }

        .popup-container {
          background: #fff;
          border-radius: 16px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
        }

        .popup-emp-info {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .popup-avatar {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid #eee;
        }

        .popup-emp-name {
          margin: 0;
          font-weight: bold;
          color: #111827;
        }

        .popup-emp-email {
          margin: 2px 0;
          font-size: 13px;
          color: #6b7280;
        }

        .popup-emp-date {
          font-size: 11px;
          color: #9ca3af;
        }

        .popup-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .popup-label {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
          color:black;
        }

        .popup-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          background-color:#d9d9d9;
        }

        .popup-select-wrapper {
          position: relative;
        }
        .role-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 36px; /* space for arrow */
}
        .popup-select-wrapper::after {
  content: "";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23444' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
}

        .popup-dropdown {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          max-height: 160px;
          overflow-y: auto;
          background-color: white;
          margin-top: 4px;
          position: absolute;
          width: 100%;
          z-index: 1000;
        }

        .popup-dropdown-item {
          padding: 10px;
          cursor: pointer;
        }

        .popup-dropdown-item:hover {
          background-color: #f3f4f6;
        }

        .popup-salary {
          padding: 10px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          font-weight: bold;
          color: #111827;
        }

        .dim-text {
          opacity: 0.5;
          font-weight: normal;
        }

        .popup-select option:first-child {
          color: #6b7280;
          opacity: 0.5;
          font-size: 13px;
        }

        .popup-footer {
          padding: 20px;
          display: flex;
          gap: 12px;
          border-top: 1px solid #eee;
        }

        .popup-footer .popup-cancel {
          flex: 1;
          padding: 10px;
          border: 1px solid #e5e7eb;
          background-color: rgba(255, 0, 0, 0.6); /* semi-transparent red */
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .popup-footer .popup-submit {
          flex: 1;
          padding: 10px;
          background-color: rgba(0, 128, 0, 0.6); /* semi-transparent green */
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .popup-submit:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};
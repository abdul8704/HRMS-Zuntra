import React, { useState, useEffect, useRef } from 'react';

export const EmpAssignmentPopUp = ({ employee, isOpen, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [salary, setSalary] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const roleInputRef = useRef();

  const roleSalaryMap = {
    'Software Engineer': '₹80,000',
    'Senior Software Engineer': '₹1,20,000',
    'Team Lead': '₹1,50,000',
    'Project Manager': '₹1,80,000',
    'HR Executive': '₹6,00,000',
    'Business Analyst': '₹1,00,000',
    'UI/UX Designer': '₹7,50,000',
    'QA Engineer': '₹6,05,000',
    'DevOps Engineer': '₹1,10,000',
    'Data Analyst': '₹9,00,000'
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
      <div className="emp-card-popup-overlay">
        <div className="emp-card-popup-container">
          <div className="emp-card-popup-content">
            {/* Left: Employee Info */}
            <div className="emp-card-popup-emp-info">
              <img src={employee.image} alt={employee.name} className="popup-avatar" />
              <div className="emp-card-popup-emp-details">
                <h3 className="emp-card-popup-emp-name">{employee.name}</h3>
                <p className="emp-card-popup-emp-email">{employee.email}</p>
                <p className="emp-card-popup-emp-phone">{employee.phone}</p>
                <p className="emp-card-popup-emp-date">Applied: {employee.date}</p>
              </div>
            </div>

            {/* Right: Form Side */}
            <div className="emp-card-popup-body">
              <div ref={roleInputRef} className="emp-card-popup-select-wrapper">
                <input
                  type="text"
                  placeholder="Choose the role"
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setShowDropdown(true);
                    setSalary(roleSalaryMap[e.target.value] || ''); // update salary live
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="emp-card-popup-select role-input"
                />
                {showDropdown && (
                  <ul className="emp-card-popup-dropdown">
                    {getSortedRoles(selectedRole).length > 0 ? (
                      getSortedRoles(selectedRole).map((role) => (
                        <li
                          key={role}
                          className="emp-card-popup-dropdown-item"
                          onClick={() => handleRoleChange(role)}
                        >
                          {role}
                        </li>
                      ))
                    ) : (
                      <li className="emp-card-popup-dropdown-item no-result">Not found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="emp-card-popup-select-wrapper no-arrow">
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="emp-card-popup-select"
                >
                  {shifts.map((shift) => (
                    <option key={shift} value={shift}>{shift}</option>
                  ))}
                </select>
              </div>

              <div className="emp-card-popup-select-wrapper no-arrow">
                <input
                  type="text"
                  placeholder="Select role to get salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="emp-card-popup-select"
                />
              </div>

              <div className="emp-card-popup-button-group">
                <button className="emp-card-popup-cancel" onClick={handleClose}>Cancel</button>
                <button
                  className="emp-card-popup-submit"
                  onClick={handleSave}
                  disabled={!selectedRole || !selectedShift}
                >
                  Recruit Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .emp-card-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
        }

        .emp-card-popup-container {
          background: #fff;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .emp-card-popup-content {
          display: flex;
          flex-direction: row;
          padding: 20px;
          gap: 20px;
        }

        .emp-card-popup-emp-info {
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border-right: 1px solid #eee;
          padding-right: 10px;
        }

        .emp-card-popup-emp-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .emp-card-popup-avatar {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border: 2px solid #eee;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .emp-card-popup-emp-name {
          margin: 0;
          font-weight: bold;
          color: #111827;
        }

        .emp-card-popup-emp-email,
        .emp-card-popup-emp-phone {
          margin: 2px 0;
          font-size: 14px;
          color: #6b7280;
        }

        .emp-card-popup-emp-date {
          font-size: 13px;
          color: #9ca3af;
        }

        .emp-card-popup-body {
          width: 65%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
        }

        .emp-card-popup-select-wrapper {
          position: relative;
        }

        .emp-card-popup-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          background-color: #d9d9d9;
        }

        .emp-card-popup-select-wrapper:not(.no-arrow)::after {
          content: "";
          position: absolute;
          right: 12px;
          top: 50%;
          transfor        m: translateY(-50%);
          width: 12px;
          height: 12px;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23444' strokeWidth='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
        }

        .emp-card-popup-dropdown {
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

        .emp-card-popup-dropdown-item {
          padding: 10px;
          cursor: pointer;
        }

        .emp-card-popup-dropdown-item:hover {
          background-color: #f3f4f6;
        }

        .emp-card-no-result {
          color: rgba(0, 0, 0, 0.7);
          cursor: default;
          font-style: italic;
        }

        .emp-card-popup-button-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 10px;
        }

        .emp-card-popup-button-group .emp-card-popup-cancel {
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background-color: #E1BEC5;
          color: black;
          border-radius: 8px;
          cursor: pointer;
        }

        .emp-card-popup-button-group .emp-card-popup-submit {
          padding: 10px 16px;
          background-color: #C1E8BD;
          color: black;
          border: none;
          border-radius: 8px;
          font-weight: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .emp-card-popup-submit:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .emp-card-popup-button-group .emp-card-popup-cancel:hover{
          background-color:red;
          color:white;
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

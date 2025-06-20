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
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-content">
            {/* Left: Employee Info */}
            <div className="popup-emp-info">
              <img src={employee.image} alt={employee.name} className="popup-avatar" />
              <div className="popup-emp-details">
                <h3 className="popup-emp-name">{employee.name}</h3>
                <p className="popup-emp-email">{employee.email}</p>
                <p className="popup-emp-phone">{employee.phone}</p>
                <p className="popup-emp-date">Applied: {employee.date}</p>
              </div>
            </div>

            {/* Right: Form Side */}
            <div className="popup-body">
              <div ref={roleInputRef} className="popup-select-wrapper">
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
                  className="popup-select role-input"
                />
                {showDropdown && (
                  <ul className="popup-dropdown">
                    {getSortedRoles(selectedRole).length > 0 ? (
                      getSortedRoles(selectedRole).map((role) => (
                        <li
                          key={role}
                          className="popup-dropdown-item"
                          onClick={() => handleRoleChange(role)}
                        >
                          {role}
                        </li>
                      ))
                    ) : (
                      <li className="popup-dropdown-item no-result">Not found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="popup-select-wrapper no-arrow">
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="popup-select"
                >
                  {shifts.map((shift) => (
                    <option key={shift} value={shift}>{shift}</option>
                  ))}
                </select>
              </div>

              <div className="popup-select-wrapper no-arrow">
                <input
                  type="text"
                  placeholder="Select role to get salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="popup-select"
                />
              </div>

              <div className="popup-button-group">
                <button className="popup-cancel" onClick={handleClose}>Cancel</button>
                <button
                  className="popup-submit"
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
          max-width: 600px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .popup-content {
          display: flex;
          flex-direction: row;
          padding: 20px;
          gap: 20px;
        }

        .popup-emp-info {
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border-right: 1px solid #eee;
          padding-right: 10px;
        }

        .popup-emp-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .popup-avatar {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border: 2px solid #eee;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .popup-emp-name {
          margin: 0;
          font-weight: bold;
          color: #111827;
        }

        .popup-emp-email,
        .popup-emp-phone {
          margin: 2px 0;
          font-size: 14px;
          color: #6b7280;
        }

        .popup-emp-date {
          font-size: 13px;
          color: #9ca3af;
        }

        .popup-body {
          width: 65%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
        }

        .popup-select-wrapper {
          position: relative;
        }

        .popup-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          background-color: #d9d9d9;
        }

        .popup-select-wrapper:not(.no-arrow)::after {
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

        .no-result {
          color: rgba(0, 0, 0, 0.7);
          cursor: default;
          font-style: italic;
        }

        .popup-button-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 10px;
        }

        .popup-button-group .popup-cancel {
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background-color: #E1BEC5;
          color: black;
          border-radius: 8px;
          cursor: pointer;
        }

        .popup-button-group .popup-submit {
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

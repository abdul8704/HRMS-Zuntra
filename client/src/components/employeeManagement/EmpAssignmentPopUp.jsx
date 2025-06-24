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

  // Mock employee data for demo
  const mockEmployee = employee || {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="emp-card-popup-overlay">
        <div className="emp-card-popup-container">
          <div className="emp-card-popup-content">
            {/* Left: Employee Info */}
            <div className="emp-card-popup-emp-info">
              <img src={mockEmployee.image} alt={mockEmployee.name} className="popup-avatar" />
              <div className="emp-card-popup-emp-details">
                <h3 className="emp-card-popup-emp-name">{mockEmployee.name}</h3>
                <p className="emp-card-popup-emp-email">{mockEmployee.email}</p>
                <p className="emp-card-popup-emp-phone">{mockEmployee.phone}</p>
                <p className="emp-card-popup-emp-date">Applied: {mockEmployee.date}</p>
              </div>
            </div>

            {/* Right: Form Side */}
            <div className="emp-card-popup-body">
              <div className="form-field">
                <label className="field-label">Role</label>
                <div ref={roleInputRef} className="emp-card-popup-select-wrapper">
                  <input
                    type="text"
                    placeholder="Choose the role"
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setShowDropdown(true);
                      setSalary(roleSalaryMap[e.target.value] || '');
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
              </div>

              <div className="form-field">
                <label className="field-label">Shift</label>
                <div className="emp-card-popup-select-wrapper no-arrow">
                  <select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    className="emp-card-popup-select"
                  >
                    <option value="">Select shift</option>
                    {shifts.map((shift) => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">Salary</label>
                <div className="emp-card-popup-select-wrapper no-arrow">
                  <input
                    type="text"
                    placeholder="Select role to get salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="emp-card-popup-select"
                  />
                </div>
              </div>

              <div className="emp-card-popup-button-group">
                <button className="emp-card-popup-cancel" onClick={handleClose}>
                  Cancel
                </button>
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
          height: 100vh;
          width: 100vw;
        }

        .emp-card-popup-container {
          background: #fff;
          border-radius: 16px;
          width: 100%;
          max-width: 700px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
        }

        .emp-card-popup-content {
          display: flex;
          flex-direction: row;
          min-height: 400px;
        }

        .emp-card-popup-emp-info {
          flex: 0 0 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 30px 20px;
          border-right: 1px solid #e5e7eb;
        }

        .popup-avatar {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
          border: 3px solid #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .emp-card-popup-emp-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .emp-card-popup-emp-name {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .emp-card-popup-emp-email,
        .emp-card-popup-emp-phone {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
          word-break: break-word;
        }

        .emp-card-popup-emp-date {
          margin: 0;
          font-size: 13px;
          color: #9ca3af;
          margin-top: 8px;
        }

        .emp-card-popup-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 40px 30px;
          justify-content: center;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 4px;
        }

        .emp-card-popup-select-wrapper {
          position: relative;
        }

        .emp-card-popup-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          background-color: #ffffff;
          transition: all 0.2s ease;
          outline: none;
        }

        .emp-card-popup-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .emp-card-popup-select::placeholder {
          color: #9ca3af;
        }

        .emp-card-popup-select-wrapper:not(.no-arrow)::after {
          content: "";
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23666' strokeWidth='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
        }

        .emp-card-popup-dropdown {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          max-height: 200px;
          overflow-y: auto;
          background-color: white;
          margin-top: 4px;
          position: absolute;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .emp-card-popup-dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        .emp-card-popup-dropdown-item:last-child {
          border-bottom: none;
        }

        .emp-card-popup-dropdown-item:hover {
          background-color: #f8fafc;
        }

        .emp-card-popup-dropdown-item.no-result {
          color: #9ca3af;
          cursor: default;
          font-style: italic;
        }

        .emp-card-popup-dropdown-item.no-result:hover {
          background-color: transparent;
        }

        .emp-card-popup-button-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 20px;
        }

        .emp-card-popup-cancel,
        .emp-card-popup-submit {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          min-width: 120px;
        }

        .emp-card-popup-cancel {
          background-color: #f3f4f6;
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .emp-card-popup-cancel:hover {
          background-color: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        .emp-card-popup-submit {
          background-color: #10b981;
          color: white;
        }

        .emp-card-popup-submit:hover:not(:disabled) {
          background-color: #059669;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .emp-card-popup-submit:disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .emp-card-popup-content {
            flex-direction: column;
            min-height: auto;
          }

          .emp-card-popup-emp-info {
            flex: none;
            padding: 20px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }

          .popup-avatar {
            width: 80px;
            height: 80px;
            margin-bottom: 15px;
          }

          .emp-card-popup-emp-name {
            font-size: 18px;
          }

          .emp-card-popup-body {
            padding: 20px;
            gap: 20px;
          }

          .emp-card-popup-button-group {
            flex-direction: column;
          }

          .emp-card-popup-cancel,
          .emp-card-popup-submit {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};
import React from 'react'

export const EmpNavbar = () => {
  return (
    <div className="emp-navbar">
      <div className="left-buttons">
        <button className="active-btn">New User</button>
        <button>Employee</button>
        <button>Role</button>
      </div>
      <div className="right-buttons">
        <button><i className="fas fa-map-marker-alt" /></button>
        <button><i className="fas fa-sliders-h" /></button>
      </div>
       <style jsx>{`
       .emp-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  flex-wrap: wrap;
  gap: 10px;
}

.left-buttons button,
.right-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 9999px;
  background-color: #f3f3f3;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.left-buttons .active-btn {
  background-color: #d4d4d4;
}

        }
      `}</style>
    </div>
  )
}

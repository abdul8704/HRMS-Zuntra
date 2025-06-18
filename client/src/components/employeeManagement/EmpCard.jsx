import React from 'react'

export const EmpCard = () => {
  return (
    <div className="emp-navbar">
      <div className="left-buttons">
        <button className="active-btn">New User</button>
        <button>Employee</button>
        <button>Role</button>
      </div>
      <div className="right-buttons">
        <button title="Map"><i className="fas fa-map-marker-alt" /></button>
        <button title="Filter"><i className="fas fa-filter" /></button>
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

        .left-buttons,
        .right-buttons {
          display: flex;
          gap: 10px;
          align-items: center;
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .left-buttons .active-btn {
          background-color: #d4d4d4;
        }

        .right-buttons button i {
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

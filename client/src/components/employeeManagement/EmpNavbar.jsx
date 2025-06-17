import React from 'react'
import { FaMapMarkerAlt, FaFilter } from 'react-icons/fa'

export const EmpNavbar = () => {
  return (
    <div className="emp-navbar">
      <div className="left-buttons">
        <button className="active-btn">New User</button>
        <button className="inactive">Employee</button>
        <button className="inactive">Role</button>
      </div>
      <div className="right-buttons">
        <button className="Map"><FaMapMarkerAlt /></button>
        <button className="Filter"><FaFilter /></button>
      </div>

      <style jsx>{`
        .emp-navbar {
          width: 100%;
          height:20%;
          display: flex;
          justify-content: space-between; /* push left and right sections */
          align-items: center;
          background: #BBD3CC;
          padding: 16px 32px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex-wrap: wrap;
        }

        .left-buttons, .right-buttons {
          margin-bottom:10px;
          display: flex;
          gap: 200px; 
        }

        .left-buttons button,
        .right-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 9999px;
          background-color: #BBD3CC;
          font-size: 19px;
          font-weight: 500;
          cursor: pointer;
        }

        .left-buttons .active-btn {
          background-color: #d4d4d4;
        }

        .left-buttons .inactive:hover {
          background-color: white;
          opacity: 0.5;
        }

        .Map:hover, .Filter:hover {
          color: white;
        }
      `}</style>
    </div>
  )
}

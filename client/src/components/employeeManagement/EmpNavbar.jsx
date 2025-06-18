import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { HiAdjustmentsVertical } from 'react-icons/hi2'

export const EmpNavbar = () => {
  return (
    <div className="emp-navbar">
      <div className="nav-buttons">
        <button className="btn active">New User</button>
        <button className="btn inactive">Employee</button>
        <button className="btn inactive">Role</button>
        <button className="btn icon-btn"><FaMapMarkerAlt /></button>
        <button className="btn icon-btn"><HiAdjustmentsVertical size={20} /></button>
      </div>

      <style jsx>{`
        .emp-navbar {
          width: 100%;
          height: 70px;
          background: #BBD3CC;
          padding: 0 32px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -10px;
        }

        .nav-buttons {
          display: flex;
          width: 100%;
          max-width: 900px;
          justify-content: space-evenly;
          align-items: center;
          margin-top: -10px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          background-color: transparent;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .active {
          background-color: #d4d4d4 !important;
        }

        .inactive.btn:hover {
          background-color: #ffffff;
          opacity:0.5;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background-color: #A9C9BB;
          color: white;
        }

        @media (max-width: 768px) {
          .nav-buttons {
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
          }

          .btn {
            padding: 8px 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}

import React, { useState } from "react";

export default function TabNavigationCard() {
  const [active, setActive] = useState("attendance");

  return (
    <div className="nav-card">
      {/* Sliding background */}
      <div
        className="nav-slider"
        style={{ left: active === "attendance" ? "0%" : "50%" }}
      />

      {/* Tabs */}
      <button
        className={`nav-tab ${active === "attendance" ? "active" : ""}`}
        onClick={() => setActive("attendance")}
      >
        Attendance
      </button>

      <button
        className={`nav-tab ${active === "courses" ? "active" : ""}`}
        onClick={() => setActive("courses")}
      >
        Courses
      </button>

      {/* Custom SVG icon */}
      <div className="nav-icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 54 54"
        >
          <path
            fill="#000"
            fillOpacity=".5"
            d="M33.75 45.902a1.35 1.35 0 0 0 0-2.7H16.2a5.4 5.4 0 0 1-5.4-5.4v-21.6a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H16.2a8.1 8.1 0 0 0-8.1 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.348 1.348 0 0 1 0 1.911l-9.45 9.45a1.353 1.353 0 0 1-1.912-1.911l7.147-7.144h-23.74a1.35 1.35 0 0 1 0-2.7h23.74l-7.147-7.145a1.35 1.35 0 0 1 0-1.911Z"
          />
        </svg>
      </div>

      <style jsx>{`
        .nav-card {
          position: relative;
          display: flex;
          align-items: center;
          background: #c7deda;
          border-radius: 9999px;
          padding: 0.25rem 0.5rem 0.25rem 0.25rem;
          gap: 0.5rem;
          width: 100%;
          flex-wrap: wrap;
          max-width: auto;
          font-family: system-ui, sans-serif;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .nav-slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 44%;
          height: 100%;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          transition: left 0.4s ease;
          z-index: 0;
        }

        .nav-tab {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.45rem 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #425050;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          z-index: 1;
        }

        .nav-tab.active {
          color: #111;
        }

        .nav-tab:hover:not(.active) {
          background: rgba(0, 0, 0, 0.05);
        }

        .nav-icon {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.4); /* Same background as slider */
          border-radius: 9999px;
          box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

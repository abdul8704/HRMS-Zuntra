import React, { useState } from "react";
import zuntraLogo from "../../assets/zuntra.png";
import { Menu, X } from "lucide-react";

export const UpskillSideBar = () => {
  const [isOpen, setIsOpen] = useState(false); // default closed for mobile

  const modules = [
    {
      title: "Module 1 Name",
      color: "#2B9C9F",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name"],
    },
    {
      title: "Module 2",
      color: "#8C8C8C",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name"],
    },
    {
      title: "Module 3",
      color: "#B5A6A8",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
    {
      title: "Module 4",
      color: "#B5A6A8",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
    {
      title: "Module 5",
      color: "#B5A6A8",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
  ];

  return (
    <>
      {/* Toggle Button (only shows on small screens) */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <div className="logo-section">
          <img src={zuntraLogo} alt="Logo" className="logo" />
          <div className="progress-bar">
            <div className="filled" />
            <div className="empty" />
          </div>
        </div>

        <div className="module-list">
          {modules.map((module, idx) => (
            <div key={idx} className="module-section">
              <div className="module-header">
                <span className="vertical-bar" style={{ backgroundColor: module.color }} />
                <h4 className="module-title">{module.title}</h4>
              </div>
              <ul className="submodule-list">
                {module.submodules.map((sub, subIdx) => (
                  <li key={subIdx} className="submodule-item">
                    <span className="submodule-bar" style={{ backgroundColor: module.color }} />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .toggle-btn {
          position: fixed;
          top: 1rem;
          left: 1rem;
          background: white;
          border: none;
          z-index: 1001;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }

        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background-color: #cde8e6;
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
          transition: transform 0.3s ease-in-out;
          transform: translateX(-100%);
          z-index: 1000;
        }

        .sidebar-container.open {
          transform: translateX(0);
        }

        .logo-section {
          text-align: center;
          margin-bottom: 1rem;
        }

        .logo {
          width: 130px;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          display: flex;
          justify-content: center;
          gap: 0.3rem;
        }

        .filled, .empty {
          height: 5px;
          border-radius: 4px;
        }

        .filled {
          background-color: #2b9c9f;
          width: 60%;
        }

        .empty {
          background-color: #e8dcdc;
          width: 30%;
        }

        .module-section {
          margin-bottom: 1rem;
        }

        .module-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.3rem;
        }

        .vertical-bar {
          width: 4px;
          height: 20px;
          margin-right: 0.5rem;
          border-radius: 2px;
        }

        .module-title {
          font-size: 1rem;
          font-weight: bold;
          margin: 0;
        }

        .submodule-list {
          list-style: none;
          padding-left: 1rem;
          margin: 0.2rem 0;
        }

        .submodule-item {
          font-size: 0.92rem;
          margin: 0.25rem 0;
          display: flex;
          align-items: center;
        }

        .submodule-bar {
          width: 4px;
          height: 14px;
          margin-right: 0.5rem;
          border-radius: 1px;
        }

        @media (min-width: 769px) {
          .sidebar-container {
            transform: translateX(0) !important;
          }

          .toggle-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

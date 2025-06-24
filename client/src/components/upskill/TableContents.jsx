import React from "react";
import { FiExternalLink } from "react-icons/fi"; // Make sure react-icons is installed

export const TableOfContents = () => {
  return (
    <div className="wrapper">
      {/* Floating External Icon */}
      {/*<button className="external-icon-btn" title="Open externally">
        <FiExternalLink size={24} />
      </button>/*}

      {/* Table of Contents Card */}
      <div className="toc-container">
        <h3 className="toc-heading">Table of contents</h3>

        {/* Scrollable Modules */}
        <div className="toc-scroll">
          {Array.from({ length: 7 }, (_, index) => (
            <div className="module" key={index}>
              <div className={`module-title ${index === 0 ? "active" : "inactive"}`}>
                <span className={`bar ${index === 0 ? "active-bar" : "inactive-bar"}`}></span>
                <span>{`Module ${index + 1}`}</span>
              </div>
              <ul className="submodules">
                {[...Array(5)].map((_, subIndex) => (
                  <li key={subIndex}>
                    <span className={`dash ${index === 0 ? "active-dash" : "inactive-dash"}`}></span>
                    Sub Module {subIndex + 1} Name
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="button-wrapper">
          <button className="continue-btn">Continue Learning</button>
          <div className="progress-bar">
            <div className="progress-filled" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        .wrapper {
          position: relative;
          width: fit-content;
        }

        .external-icon-btn {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 54px;
          height: 54px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .external-icon-btn:hover {
          background-color: #f0f0f0;
        }

        .toc-container {
          background: #e5e5e5;
          padding: 16px;
          width: 350px;
          height: 96vh;
          border-radius: 8px;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .toc-heading {
          font-size: 18px;
          font-weight: bold;
          color: #111;
          margin-bottom: 12px;
        }

        .toc-scroll {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 12px;
          padding-right: 4px;
        }

        .toc-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .toc-scroll::-webkit-scrollbar-thumb {
          background-color: #999;
          border-radius: 4px;
        }

        .toc-scroll {
          scrollbar-width: thin;
          scrollbar-color: #999 transparent;
        }

        .module {
          margin-bottom: 16px;
        }

        .module-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .bar {
          width: 4px;
          height: 24px;
          border-radius: 2px;
        }

        .active-bar {
          background-color: #00cfd1;
        }

        .inactive-bar {
          background-color: #a3a3a3;
        }

        .submodules {
          list-style: none;
          padding-left: 16px;
          margin: 0;
        }

        .submodules li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #111;
          margin: 4px 0;
        }

        .dash {
          width: 4px;
          height: 12px;
          border-left: 2px dashed;
        }

        .active-dash {
          border-color: #00cfd1;
        }

        .inactive-dash {
          border-color: #a3a3a3;
        }

        .button-wrapper {
          padding-top: 8px;
        }

        .continue-btn {
          width: 100%;
          padding: 10px 16px;
          background-color: #d1fae5;
          color: #000;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .continue-btn:hover {
          background-color: #a7f3d0;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background-color: #d4d4d4;
          border-radius: 999px;
          margin-top: 10px;
        }

        .progress-filled {
          height: 100%;
          background-color: #00cfd1;
          border-radius: 999px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
};

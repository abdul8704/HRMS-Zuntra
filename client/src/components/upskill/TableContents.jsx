import React from "react";

export const TableOfContents = () => {
  return (
    <div className="toc-container">
      <h3 className="toc-heading">Table of contents</h3>

      {/* Scrollable Modules */}
      <div className="toc-scroll">
        <div className="module">
          <div className="module-title active">
            <span className="bar active-bar"></span>
            <span>Module 1 Name</span>
          </div>
          <ul className="submodules">
            <li><span className="dash active-dash"></span>Sub Module 1 Name</li>
            <li><span className="dash active-dash"></span>Sub Module 2 Name</li>
            <li><span className="dash active-dash"></span>Sub Module 3 Name</li>
            <li><span className="dash active-dash"></span>Sub Module 4 Name</li>
          </ul>
        </div>

        <div className="module">
          <div className="module-title inactive">
            <span className="bar inactive-bar"></span>
            <span>Module 2</span>
          </div>
          <ul className="submodules">
            <li><span className="dash active-dash"></span>Sub Module 1 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 2 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 3 Name</li>
          </ul>
        </div>

        <div className="module">
          <div className="module-title inactive">
            <span className="bar inactive-bar"></span>
            <span>Module 3</span>
          </div>
          <ul className="submodules">
            <li><span className="dash inactive-dash"></span>Sub Module 1 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 2 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 3 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 4 Name</li>
            <li><span className="dash inactive-dash"></span>Sub Module 5 Name</li>
          </ul>
        </div>
      </div>

      {/* Continue Button */}
      <div className="button-wrapper">
        <button className="continue-btn">Continue Learning</button>
        <div className="progress-bar">
          <div className="progress-filled" style={{ width: '75%' }}></div>
        </div>
      </div>

      <style jsx>{`
        .toc-container {
          background: #e5e5e5;
          padding: 16px;
          width: 270px;
          height: 550px;
          border-radius: 8px;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
        }

        .toc-heading {
          font-size: 18px;
          font-weight: bold;
          color: #111;
          margin-bottom: 12px;
        }

        .toc-scroll {
          flex: 1;
          overflow-y: scroll;
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



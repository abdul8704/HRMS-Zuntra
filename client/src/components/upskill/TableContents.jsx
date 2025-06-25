import React from "react";

export const TableOfContents = () => {
  const modules = [
    {
      title: "Module 1 Name",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name"]
    },
    {
      title: "Module 2",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name"]
    },
    {
      title: "Module 3",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"]
    },
    {
      title: "Module 4",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"]
    },
    {
      title: "Module 5",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"]
    },
  ];

  return (
    <div className="toc-wrapper">
      <div className="toc-box">
        <h3 className="toc-heading">Table of contents</h3>
        <div className="toc-scroll">
          {modules.map((module, moduleIndex) => (
            <div className="module" key={moduleIndex}>
              <div className="module-title">
                <span className="bar"></span>
                <span className="module-text">{module.title}</span>
              </div>
              <ul className="submodules">
                {module.submodules.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <span className="line">|</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button className="continue-btn">Continue Learning</button>

      <style>{`
        .toc-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height:100%;
          
        }

        .toc-box {
          background: #e5e5e5;
          padding: 16px;
          border-radius: 12px;
          font-family: sans-serif;
          height: auto;
          overflow-y: auto;
        }

        .toc-heading {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #111;
        }

        .module {
          margin-bottom: 20px;
        }

        .module-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 700;
          color: #111;
        }

        .bar {
          width: 4px;
          height: 24px;
          background-color: #00cfd1;
          border-radius: 2px;
        }

        .module-text {
          display: inline-block;
        }

        .submodules {
          list-style: none;
          padding-left: 20px;
          margin-top: 6px;
        }

        .submodules li {
          font-size: 14px;
          color: #111;
          margin: 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .line {
          color: #00cfd1;
          font-weight: bold;
        }

        .continue-btn {
          background: linear-gradient(to right, #bbd3cc  40%, #e5e5e5 30%);
          font-weight: bold;
          font-size: 18px;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          width: 100%;
          max-width: 100%;
          text-align: center;
          color: #000;
          cursor: pointer;
        }

       @media (max-width: 768px) {
  .toc-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .toc-box {
    height: auto;
    max-height: none;
  }

  .continue-btn {
    width: 100%;
  }
}

        }
      `}</style>
    </div>
  );
};

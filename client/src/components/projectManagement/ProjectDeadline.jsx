import React from 'react';

export const ProjectDeadline = () => {
  const projects = [
    { name: 'HRMS Website', team: 'OptiWatt' },
    { name: 'HRMS Website', team: 'Data Drifters' },
    { name: 'HRMS Website', team: 'HRMS Website' },
    { name: 'HRMS Website', team: 'HRMS Website' },
    { name: 'HRMS Website', team: 'HRMS Website' },
    { name: 'HRMS Website', team: 'HRMS Website' },
  ];

  return (
    <>
      <div className="project-deadline-container">
        <div className="project-deadline-header">
          <h2>Project Deadline</h2>
          <input type="date" defaultValue="2010-10-10" />
        </div>

        <div className="project-table-header">
          <span>Project Name</span>
          <span>Team</span>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <div key={index} className="project-row">
              <span>{project.name}</span>
              <span>{project.team}</span>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .project-deadline-container {
            background-color: #f2c3b9;
            border-radius: 15px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: Arial, sans-serif;
          }

          .project-deadline-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .project-deadline-header h2 {
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0;
          }

          .project-deadline-header input {
            border: none;
            border-radius: 10px;
            padding: 0.3rem 0.6rem;
            background-color: #fbded7;
            font-size: 0.9rem;
          }

          .project-table-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            font-weight: bold;
            background-color: #fbded7;
            border-radius: 10px;
            padding: 0.4rem 0.5rem;
            margin-bottom: 0.3rem;
          }

          .project-list {
            overflow-y: auto;
            flex-grow: 1;
            max-height: 150px;

            /* ✅ Firefox Scrollbar Color */
            scrollbar-color: #a0a0a0 transparent;
            scrollbar-width: thin;
          }

          /* ✅ Chrome/Edge/Brave Scrollbar */
          .project-list::-webkit-scrollbar {
            width: 8px;
          }

          .project-list::-webkit-scrollbar-thumb {
            background-color: #a0a0a0; /* Grey Scrollbar Thumb */
            border-radius: 6px;
          }

          .project-list::-webkit-scrollbar-track {
            background-color: transparent;
          }

          .project-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0.3rem 0.5rem;
            font-size: 0.9rem;
            color: #555;
          }

          .project-row span,
          .project-table-header span {
            display: block;
            text-align: left;
          }
        `}
      </style>
    </>
  );
};

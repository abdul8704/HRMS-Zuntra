import React from 'react';

export const ProjectDeadline = ({ projects, projectDate, setProjectDate }) => {
  const selectedDate = projectDate.toISOString().split('T')[0];

  return (
    <>
      <div className="project-deadline">
        <div className="header">
          <h2>Project Deadline</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              if (!isNaN(newDate)) setProjectDate(newDate);
            }}
          />
        </div>

        <div className="table-header">
          <span>Project Name</span>
          <span>Team</span>
        </div>

        <div className="project-list">
          {projects.length === 0 ? (
            <div className="no-projects">No projects for this date.</div>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="project-item">
                <span>{project.name}</span>
                <span>{project.team}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          .project-deadline {
            background-color: #F2C3B9;
            border-radius: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 1rem;
          }

          .header h2 {
            font-size: 1.2rem;
            font-weight: bold;
          }

          .header input {
            padding: 0.2rem 0.5rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #fce0d9;
            font-size: 0.9rem;
          }

          .table-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 0 1rem 0.3rem 1rem;
            font-weight: bold;
            font-size: 0.9rem;
          }

          .table-header span {
            background-color: #f8d4c8;
            padding: 0.4rem;
            border-radius: 10px;
            text-align: center;
          }

          .project-list {
            flex: 1;
            overflow-y: auto;
            margin: 0 1rem 1rem 1rem;
          }

          .project-item {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #444;
          }

          .project-item span {
            padding: 0.3rem 0.6rem;
          }

          .no-projects {
            text-align: center;
            padding: 1rem;
            font-style: italic;
            color: #666;
          }

          .project-list::-webkit-scrollbar {
            width: 6px;
          }

          .project-list::-webkit-scrollbar-thumb {
            background-color: grey;
            border-radius: 6px;
          }

          .project-list::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </>
  );
};

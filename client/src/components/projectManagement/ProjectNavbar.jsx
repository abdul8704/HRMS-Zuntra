import React from 'react';

export const ProjectNavbar = () => {
  return (
    <>
      <div className="project-navbar">
        <div className="project-title">List of Current Projects</div>
      </div>

      <style>{`
        .project-navbar {
          background-color: #BBD3CC;
          border-radius: 0.75rem;
          width: 100%;
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c2c2c;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  );
};

import React from 'react';

export const ProjectNavbar = () => {
  return (
    <>
      <div className="project-navbar">
        <div className="navbar-center">List of Current Projects</div>
        <div className="navbar-icons">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
            <path fill="#000" d="M13.92 23.445c-2.662 0-4.914-.922-6.758-2.766-1.843-1.845-2.765-4.097-2.766-6.758-.001-2.661.921-4.914 2.766-6.758 1.846-1.844 4.098-2.767 6.758-2.767s4.913.923 6.76 2.767c1.846 1.844 2.767 4.097 2.764 6.758a8.933 8.933 0 0 1-1.904 5.568l8.205 8.205c.269.269.403.61.403 1.026 0 .415-.134.757-.403 1.026-.269.268-.61.403-1.026.403-.415 0-.757-.135-1.025-.403l-8.206-8.206a8.931 8.931 0 0 1-5.568 1.905Zm0-2.93c1.832 0 3.389-.641 4.671-1.923 1.283-1.282 1.924-2.839 1.923-4.671-.001-1.833-.642-3.39-1.923-4.67-1.28-1.28-2.837-1.922-4.67-1.924-1.834-.002-3.391.64-4.67 1.924-1.28 1.285-1.922 2.841-1.925 4.67-.003 1.828.639 3.386 1.924 4.671 1.286 1.286 2.842 1.926 4.67 1.923Z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30">
            <path stroke="#000" strokeLinecap="round" strokeWidth="1.5" d="M4.063 14.785V1m21.444 27.57V23.4M4.063 28.57v-6.893m21.444-5.169V1M14.785 6.17V1m0 27.57V13.062M4.063 21.678c1.692 0 3.064-1.543 3.064-3.447 0-1.903-1.372-3.446-3.064-3.446C2.372 14.785 1 16.328 1 18.231c0 1.904 1.372 3.447 3.063 3.447Zm10.721-8.616c1.692 0 3.064-1.542 3.064-3.446 0-1.903-1.372-3.446-3.063-3.446-1.692 0-3.064 1.543-3.064 3.446 0 1.904 1.372 3.446 3.063 3.446ZM25.507 23.4c1.691 0 3.063-1.543 3.063-3.446 0-1.903-1.372-3.446-3.063-3.446-1.692 0-3.064 1.543-3.064 3.446 0 1.903 1.372 3.446 3.064 3.446Z"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .project-navbar {
          background-color: #BBD3CC;
          border-radius: 0.75rem;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: 'Segoe UI', sans-serif;
        }

        .navbar-center {
          font-size: 1rem;
          font-weight: 500;
        }

        .navbar-icons {
          position: absolute;
          right: 20px;
          display: flex;
          gap: 20px;
          cursor: pointer;
        }

        .navbar-icons svg {
          transition: background 0.2s ease-in-out;
          border-radius: 0.5rem;
          padding: 4px;
        }

        .navbar-icons svg:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </>
  );
};

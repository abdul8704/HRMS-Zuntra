import React, { useState } from 'react';

export const CourseNavbar = () => {
  const [active, setActive] = useState(0);

  const navItems = ['Courses', 'Create Course', 'Add Course'];

  return (
    <>
      <div className="course-navbar">
        <ul>
          {navItems.map((label, index) => (
            <li
              key={index}
              className={active === index ? 'active' : ''}
              onClick={() => setActive(index)}
            >
              <span>{label}</span>
            </li>
          ))}
          {/* Equalizer Icon */}
          <li className="eq-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </li>
        </ul>
      </div>

      <style>{`
        .course-navbar {
          background-color: #BBD3CC;
          border-radius: 1rem;
          width: 95%;
          margin: 20px auto;
          padding: 10px;
        }

        .course-navbar ul {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .course-navbar li {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 500;
          font-size: 18px;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          transition: background 0.2s ease-in-out;
          user-select: none;
        }

        .course-navbar li:hover {
          background-color: #e0e0e0;
        }

        .course-navbar li.active {
          background-color: #d0d0d0;
        }

        .course-navbar .eq-icon {
          margin-left: auto;
          padding: 1rem 0.5rem;
          cursor: pointer;
        }

        .eq-icon svg {
          width: 20px;
          height: 20px;
          stroke: #000000;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};





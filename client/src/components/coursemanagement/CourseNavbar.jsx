import React, { useState } from 'react';

export const CourseNavbar = () => {
  const [active, setActive] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Courses', 'Create Course', 'Add Course'];

  return (
    <>
      <div className="course-navbar">
        {/* Hamburger icon for mobile */}
        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>

        <ul className={`nav-list ${isMobileMenuOpen ? 'open' : ''}`}> 
          {navItems.map((label, index) => (
            <li
              key={index}
              className={active === index ? 'active' : ''}
              onClick={() => {
                setActive(index);
                setMobileMenuOpen(false); // Close menu on item click (for mobile)
              }}
            >
              <span>{label}</span>
            </li>
          ))}
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
          margin: 1rem auto;
          padding: 0rem;
          position: relative;
        }

        .mobile-menu-icon {
          display: none;
          font-size: 2.5rem;
          padding: 1rem;
          cursor: pointer;
        }

        .nav-list {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 10rem;
          margin: 0;
          padding: 0 1rem;
          flex-wrap: nowrap;
        }

        .nav-list li {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 500;
          font-size: 1.2rem;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          transition: background 0.2s ease-in-out;
          user-select: none;
        }

        .nav-list li:hover {
          background-color: #e0e0e0;
        }

        .nav-list li.active {
          background-color: #d0d0d0;
        }

        .nav-list .eq-icon {
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

        /* ===== Responsive Styles ===== */
        @media (max-width: 768px) {
          .mobile-menu-icon {
            display: block;
          }

          .nav-list {
            display: none;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            width: 100%;
            background-color: #BBD3CC;
            border-radius: 0 0 1rem 1rem;
            padding: 1rem;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 10;
          }

          .nav-list.open {
            display: flex;
          }

          .nav-list li {
            width: 100%;
            font-size: 1.1rem;
            justify-content: flex-start;
          }

          .nav-list .eq-icon {
            align-self: flex-end;
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
};
import React, { useState } from 'react';

const navItems = [
  {
    label: 'All Courses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" />
      </svg>
    ),
    path: 'all',
  },
  {
    label: 'Create Course',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
        <path fill="#000000" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z" />
      </svg>
    ),
    path: 'create'
  },
  {
    label: 'Add Course',
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
<path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
</svg>
    ),
    path: 'add',
  }
];

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
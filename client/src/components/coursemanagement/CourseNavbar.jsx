import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const navItems = [
  {
    label: 'All Courses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Z"/>
      </svg>
    ),
    path: 'all',
  },
  {
    label: 'Create Course',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40">
        <path fill="#000000" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z"/>
      </svg>
    ),
    path: 'create'
  },
  {
    label: 'Add Course',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
      </svg>
    ),
    path: 'add',
  }
];

export const CourseNavbar = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
  const [activeNavId, setActiveNavId] = useState(navId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navRefs = useRef([]);
  const sliderRef = useRef(null);

  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];

  const handleNavigation = (path) => {
    setActiveNavId(path);
    navigate(`/courses/${encodeURIComponent(path)}`);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.path === activeNavId);
    const tab = navRefs.current[activeIndex];
    if (tab && sliderRef.current) {
      sliderRef.current.style.width = `${tab.offsetWidth}px`;
      sliderRef.current.style.left = `${tab.offsetLeft}px`;
    }
  }, [activeNavId]);

  return (
    <>
      <div className="project-navbar">
        {/* Desktop Navigation with sliding highlight */}
        <ul className="desktop-nav">
          <div className="nav-slider" ref={sliderRef}></div>
          {navItems.map((item, index) => (
            <li
              key={item.path}
              ref={(el) => (navRefs.current[index] = el)}
              className={navId === item.path ? 'active' : ''}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="project-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Mobile Dropdown */}
        <div className="mobile-nav">
          <div className="dropdown-container">
            <button className="dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span className="project-icon">{activeItem.icon}</span>
              <span className="active-label">{activeItem.label}</span>
              <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {navItems
                  .filter(item => item.path !== activeNavId)
                  .map((item) => (
                    <button key={item.path} className="dropdown-item" onClick={() => handleNavigation(item.path)}>
                      <span className="project-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .project-navbar {
          background-color: #BBD3CC;
          border-radius: 0.75rem;
          width: 100%;
          position: relative;
        }

        .desktop-nav {
          position: relative;
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .nav-slider {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .desktop-nav li {
          flex: 1;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 500;
          padding: 1rem 0;
          user-select: none;
          transition: background 0.2s ease-in-out;
        }

        .desktop-nav li:not(.active):hover {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
        }

        .desktop-nav li.active {
          color: #111;
          border-radius: 0.75rem;
        }

        .project-icon {
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .mobile-nav {
          display: none;
        }

        .dropdown-container {
          position: relative;
        }

        .dropdown-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          border-radius: 0.75rem;
        }

        .dropdown-arrow {
          transition: transform 0.2s ease-in-out;
          margin-left: 0.5rem;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #BBD3CC;
          border-radius: 0.5rem;
          margin-top: 0.25rem;
          overflow: hidden;
          z-index: 10;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          text-align: left;
        }

        .dropdown-item:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-nav {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

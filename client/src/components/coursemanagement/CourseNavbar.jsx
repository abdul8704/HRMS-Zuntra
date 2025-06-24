import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40">
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
  const navigate = useNavigate();
  const { navId } = useParams();
  const [activeNavId, setActiveNavId] = useState(navId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];
  
  const handleNavigation = (path) => {
    setActiveNavId(path);
    navigate(`/courses/${encodeURIComponent(path)}`);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="project-navbar">
        {/* Desktop Navigation */}
        <ul className="desktop-nav">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={navId === item.path ? 'active' : ''}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="project-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Mobile/Tablet Dropdown */}
        <div className="mobile-nav">
          <div className="dropdown-container">
            <button 
              className="dropdown-trigger"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <span className="project-icon">{activeItem.icon}</span>
              <span className="active-label">{activeItem.label}</span>
              <svg 
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
              >
                <path 
                  d="M3 4.5L6 7.5L9 4.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {navItems
                  .filter(item => item.path !== activeNavId)
                  .map((item) => (
                    <button
                      key={item.path}
                      className="dropdown-item"
                      onClick={() => handleNavigation(item.path)}
                    >
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

        /* Desktop Navigation */
        .desktop-nav {
          list-style: none;
          display: flex;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .desktop-nav li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 500;
          padding: 1rem 0;
          border-radius: 0.5rem;
          transition: background 0.2s ease-in-out;
          user-select: none;
        }

        .desktop-nav li:hover {
          background-color: #d0d0d0;
        }
          
        .desktop-nav li.active {
          background-color: #e0e0e0;
        }

        /* Mobile Navigation */
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
          transition: background 0.2s ease-in-out;
        }

        .dropdown-trigger:hover {
          background-color: #d0d0d0;
        }

        .dropdown-trigger .active-label {
          flex: 1;
          text-align: left;
          margin-left: 0.5rem;
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
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 10;
          margin-top: 0.25rem;
          overflow: hidden;
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
          transition: background 0.2s ease-in-out;
          text-align: left;
        }

        .dropdown-item:hover {
          background-color: #d0d0d0;
        }

        .project-icon {
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-nav {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .project-navbar {
            border-radius: 0.5rem;
          }
          
          .dropdown-trigger {
            padding: 0.875rem;
          }
          
          .dropdown-item {
            padding: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .dropdown-trigger {
            padding: 0.75rem;
          }
          
          .dropdown-item {
            padding: 0.625rem;
          }
          
          .project-icon {
            margin-right: 0.375rem;
          }
        }
      `}</style>
    </>
  );
};
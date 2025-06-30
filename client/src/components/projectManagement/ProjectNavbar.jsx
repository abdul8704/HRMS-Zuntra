import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const navItems = [
  {
    label: 'Overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23">
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.267 11.586H1L11.2 1.332l10.2 10.254h-2.267m-15.866 0v7.975c0 .605.238 1.184.664 1.612a2.26 2.26 0 0 0 1.602.667h11.333a2.26 2.26 0 0 0 1.603-.667 2.285 2.285 0 0 0 .664-1.612v-7.975"/>
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.8 21.84v-6.837c0-.604.239-1.184.664-1.611a2.26 2.26 0 0 1 1.602-.667h2.267c.601 0 1.178.24 1.603.667.425.427.664 1.007.664 1.611v6.836"/>
      </svg>
    ),
    path: 'overview',
  },
  {
    label: 'On Going Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" fill="none" viewBox="0 0 18 24">
        <path fill="#000" fillOpacity=".5" fillRule="evenodd" d="m8.545 23.113-.012.002-.07.035-.02.004-.014-.004-.07-.036c-.011-.002-.02 0-.024.006l-.004.01-.017.426.005.02.01.012.103.074.015.004.012-.004.103-.073.012-.016.004-.017-.017-.425c-.002-.01-.008-.016-.016-.018Zm.263-.112-.014.002-.183.092-.01.01-.003.011.018.428.005.012.008.008.2.091c.012.003.022 0 .029-.008l.004-.014-.034-.61c-.004-.013-.01-.02-.02-.022Zm-.711.002a.02.02 0 0 0-.027.006l-.006.014-.034.61c0 .012.007.02.017.024l.015-.002.2-.092.01-.008.003-.011.018-.428-.003-.012-.01-.01-.183-.091Z" clipRule="evenodd"/>
        <path fill="#000" fillRule="evenodd" d="M0 3.07c0-.553.21-1.084.582-1.476A1.942 1.942 0 0 1 1.99.982h11.93c.527 0 1.033.22 1.406.612s.582.923.582 1.477v6.264H13.92V3.07H1.989v16.704H6.96v2.088H1.99c-.528 0-1.034-.22-1.407-.611A2.142 2.142 0 0 1 0 19.775V3.071Zm3.977 4.177c0-.277.105-.543.292-.739a.97.97 0 0 1 .703-.305h5.966c.263 0 .516.11.703.305.186.196.29.462.29.739 0 .277-.104.542-.29.738a.971.971 0 0 1-.703.306H4.972a.97.97 0 0 1-.703-.306 1.071 1.071 0 0 1-.292-.738Zm0 4.176c0-.277.105-.543.292-.738a.97.97 0 0 1 .703-.306h.994a.97.97 0 0 1 .703.306c.187.195.291.461.291.738 0 .277-.104.542-.29.738a.97.97 0 0 1-.704.306h-.994a.97.97 0 0 1-.703-.306 1.071 1.071 0 0 1-.292-.738Zm8.95 2.088c-.792 0-1.55.33-2.11.917a3.214 3.214 0 0 0-.874 2.215c0 .83.315 1.627.874 2.215.56.587 1.318.917 2.11.917.79 0 1.55-.33 2.109-.917a3.216 3.216 0 0 0 .873-2.215c0-.83-.314-1.627-.873-2.215a2.913 2.913 0 0 0-2.11-.917Zm-4.972 3.132c0-1.384.523-2.712 1.456-3.691a4.855 4.855 0 0 1 3.515-1.53c1.319 0 2.583.55 3.516 1.53a5.356 5.356 0 0 1 1.456 3.691 5.356 5.356 0 0 1-1.456 3.691 4.855 4.855 0 0 1-3.516 1.53 4.855 4.855 0 0 1-3.515-1.53 5.356 5.356 0 0 1-1.456-3.69Zm4.971-2.61c.264 0 .517.11.703.306.187.196.292.461.292.738v.522c.263 0 .516.11.703.306.186.196.29.461.29.738 0 .277-.104.543-.29.738a.971.971 0 0 1-.703.306h-.995a.971.971 0 0 1-.703-.306 1.071 1.071 0 0 1-.291-.738v-1.566c0-.277.105-.542.291-.738a.971.971 0 0 1 .703-.306Z" clipRule="evenodd"/>
      </svg>
    ),
    path: 'ongoing',
  },
  {
    label: 'Finished Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" fill="none" viewBox="0 0 23 21">
        <path fill="#000" fillOpacity=".5" d="m16.082 10.086 4.871-8.42 1.988 1.148-6.008 10.397-7.479-4.308-5.48 9.477h19.001v2.297H0V0h2.297v16.703l6.319-10.96 7.466 4.343Z" />
      </svg>
    ),
    path: 'finished',
  },
];

export const ProjectNavbar = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
  const [activeNavId, setActiveNavId] = useState(navId || navItems[0].path);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navRefs = useRef([]);
  const sliderRef = useRef(null);
  const tabContainerRef = useRef(null); // ⬅️ NEW

  const activeItem = navItems.find((item) => item.path === activeNavId) || navItems[0];

  const handleNavigation = (path) => {
    setActiveNavId(path);
    navigate(`/projects/${encodeURIComponent(path)}`);
    setIsDropdownOpen(false);
  };

  const updateSlider = () => {
    const index = navItems.findIndex((item) => item.path === activeNavId);
    const currentTab = navRefs.current[index];
    if (currentTab && sliderRef.current) {
      sliderRef.current.style.width = `${currentTab.offsetWidth}px`;
      sliderRef.current.style.left = `${currentTab.offsetLeft}px`;
    }
  };

  useEffect(() => {
    updateSlider();
  }, [activeNavId]);

  useEffect(() => {
    const handleResize = () => updateSlider();

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(handleResize);
    if (tabContainerRef.current) {
      observer.observe(tabContainerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tabContainerRef.current) {
        observer.unobserve(tabContainerRef.current);
      }
    };
  }, [activeNavId]);

  return (
    <>
      <div className="project-navbar">
        <ul className="desktop-nav" ref={tabContainerRef}>
          <div className="nav-slider" ref={sliderRef}></div>
          {navItems.map((item, index) => (
            <li
              key={item.path}
              ref={(el) => (navRefs.current[index] = el)}
              className={item.path === activeNavId ? 'active' : ''}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="project-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>

        <div className="mobile-nav">
          <button className="dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="project-icon">{activeItem.icon}</span>
            <span>{activeItem.label}</span>
            <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {navItems
                .filter((item) => item.path !== activeNavId)
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

      <style jsx>{`
        .project-navbar {
          background-color: #BBD3CC;
          border-radius: 0.75rem;
          width: 100%;
          position: relative;
        }

        .project-navbar li {
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

        .nav-slider {
          position: absolute;
          top: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .desktop-nav li:not(.active):hover {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
        }

        .project-icon {
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .desktop-nav {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          position: relative;
        }

        .desktop-nav li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
          cursor: pointer;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }

        .desktop-nav li.active {
          color: #111;
        }

        .mobile-nav {
          display: none;
        }

        .dropdown-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          padding: 1rem;
          cursor: pointer;
        }

        .dropdown-menu {
          background: #BBD3CC;
          border-radius: 0.5rem;
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
        }

        .dropdown-arrow {
          transition: transform 0.2s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
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

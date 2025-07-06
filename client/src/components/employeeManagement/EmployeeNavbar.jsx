import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const navItems = [
  {
    label: 'Employee', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
      </svg>
    ), path: 'all'
  },
  {
    label: 'Roles', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="m640-120-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-29 72-24 143t48 135H80Zm600-80q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
      </svg>
    ), path: 'roles'
  },
  {
    label: 'New Users', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" />
      </svg>
    ), path: 'newusers'
  },
  {
    label: 'Locations', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm0-120Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Z" />
      </svg>
    ), path: 'geofencing'
  }
];

export const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
  const [activeNavId, setActiveNavId] = useState(navId || navItems[0].path);
  const [hoveredNavId, setHoveredNavId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navRefs = useRef([]);
  const sliderRef = useRef(null);
  const tabContainerRef = useRef(null);

  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];

  const handleNavigation = (path) => {
    setActiveNavId(path);
    navigate(`/employee/${encodeURIComponent(path)}`);
    setIsDropdownOpen(false);
  };

  const updateSlider = (targetPath = activeNavId) => {
    const index = navItems.findIndex(item => item.path === targetPath);
    const tab = navRefs.current[index];
    if (tab && sliderRef.current) {
      sliderRef.current.style.width = `${tab.offsetWidth}px`;
      sliderRef.current.style.transform = `translateX(${tab.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    updateSlider();

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
    <div className="w-full relative bg-[#BBD3CC] rounded-xl">
      {/* Desktop Navigation */}
      <ul
        className="relative hidden md:flex list-none m-0 p-0 rounded-xl overflow-hidden"
        ref={tabContainerRef}
      >
        <div
          ref={sliderRef}
          className="absolute top-0 left-0 h-full bg-white/50 rounded-xl transition-all duration-500 ease-in-out z-[1]"
        />
        {navItems.map((item, index) => (
          <li
            key={item.path}
            ref={(el) => (navRefs.current[index] = el)}
            className={`flex-1 relative z-[2] flex items-center justify-center cursor-pointer font-medium py-4 select-none transition-colors duration-200 `}
            onClick={() => handleNavigation(item.path)}
            onMouseEnter={() => {
              setHoveredNavId(item.path);
              updateSlider(item.path);
            }}
            onMouseLeave={() => {
              setHoveredNavId(null);
              updateSlider(activeNavId);
            }}
          >
            <span className="mr-2 flex items-center shrink-0">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-4 bg-transparent border-none cursor-pointer font-medium rounded-xl"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="mr-2 flex items-center">{activeItem.icon}</span>
            <span className="flex-1 text-left">{activeItem.label}</span>
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                }`}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
            <div className="absolute top-full left-0 right-0 bg-[#BBD3CC] rounded-lg mt-1 z-10 overflow-hidden">
              {navItems
                .filter((item) => item.path !== activeNavId)
                .map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center px-4 py-3 text-left font-medium hover:bg-black/5"
                  >
                    <span className="mr-2 flex items-center">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

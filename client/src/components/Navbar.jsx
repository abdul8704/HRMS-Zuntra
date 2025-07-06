import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Employee Management Nav Items
const employeeManagementNavItems = [
  {
    label: 'Employee',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
      </svg>
    ),
    path: '/employee/all'
  },
  {
    label: 'Roles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="m640-120-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-29 72-24 143t48 135H80Zm600-80q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
      </svg>
    ),
    path: '/employee/roles'
  },
  {
    label: 'New Users',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" />
      </svg>
    ),
    path: '/employee/newusers'
  },
  {
    label: 'Locations',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm0-120Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Z" />
      </svg>
    ),
    path: '/employee/locations'
  }
];


const employeeDetailsNavItems = [
  {
    label: 'Attendance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 35">
        <path fill="#000" d="M16 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 20c8.84 0 16 2 9.5 2s-5 9.5-3 10.5S0 33 0 33v-5c0-4.42 7.16-8 16-8Z" />
        <path fill="#000" fill-rule="evenodd" d="M26.966 22.45a4.979 4.979 0 0 1 4.51 5.408c-.154 1.694-1.203 2.996-2.267 3.903-.53.447-1.101.845-1.705 1.187l-.249.139-.117.063-.22.113-.195.096-.241.113a1.035 1.035 0 0 1-1.022-.093l-.217-.154-.27-.202-.1-.079-.212-.17a11.388 11.388 0 0 1-1.576-1.569c-.883-1.083-1.68-2.553-1.527-4.246a4.98 4.98 0 0 1 5.409-4.51Zm1.398 3.45-2.55 2.126-.886-1.062a.553.553 0 1 0-.85.709l1.204 1.444a.607.607 0 0 0 .858.078l2.932-2.445a.554.554 0 0 0-.707-.85Z" clip-rule="evenodd" />
      </svg>

    ),
    path: '/attendance'
  },
  {
    label: 'Project',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="29" fill="none" viewBox="0 0 26 29">
        <path fill="currentColor" d="M13 8.598c.718 0 1.3-.57 1.3-1.273 0-.702-.582-1.272-1.3-1.272-.718 0-1.3.57-1.3 1.272 0 .703.582 1.273 1.3 1.273Zm-7.8 12.73h15.6v2.545H5.2v-2.545Zm5.2-6.58 3.63 3.556 5.111-5.009 1.659 1.669V9.873h-5.2l1.703 1.623-3.275 3.206-3.628-3.556-5.2 5.09 1.838 1.8 3.362-3.288Z" />
        <path fill="currentColor" d="M22.1 3.508h-4.287a6.378 6.378 0 0 0-.416-.54l-.013-.016a5.798 5.798 0 0 0-3.757-1.932 3.451 3.451 0 0 0-1.254 0 5.798 5.798 0 0 0-3.757 1.932l-.013.016a6.375 6.375 0 0 0-.416.54H3.9a3.947 3.947 0 0 0-2.757 1.12A3.782 3.782 0 0 0 0 7.327v17.818a3.782 3.782 0 0 0 1.143 2.698 3.947 3.947 0 0 0 2.757 1.12h18.2a3.947 3.947 0 0 0 2.757-1.12A3.782 3.782 0 0 0 26 25.145V7.327a3.782 3.782 0 0 0-1.143-2.7A3.947 3.947 0 0 0 22.1 3.509Zm1.3 21.637c0 .337-.137.661-.38.9a1.314 1.314 0 0 1-.92.372H3.9a1.32 1.32 0 0 1-.92-.372 1.26 1.26 0 0 1-.38-.9V7.327c0-.338.137-.662.38-.9.245-.239.575-.373.92-.373h5.915c.15-.72.548-1.366 1.128-1.83A3.293 3.293 0 0 1 13 3.504c.75 0 1.476.254 2.057.718.58.465.979 1.112 1.128 1.83H22.1c.345 0 .675.135.92.374.243.238.38.562.38.9v17.818Z" />
      </svg>

    ),
    path: '/project'
  },
  {
    label: 'Courses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
        <path fill="currentColor" d="M11.465.42a4.158 4.158 0 0 1 3.64 0l10.56 5.131c.184.09.34.23.449.406a1.132 1.132 0 0 1 .01 1.18c-.107.178-.26.322-.442.414l-10.508 5.347a4.16 4.16 0 0 1-3.778 0L2.452 8.347v4.986c0 .295-.114.578-.317.786a1.07 1.07 0 0 1-.766.325 1.07 1.07 0 0 1-.766-.325 1.126 1.126 0 0 1-.317-.786V6.611a1.13 1.13 0 0 1 .153-.626c.11-.189.272-.34.466-.434l10.56-5.13ZM4.62 11.931v3.625a1.136 1.136 0 0 0 .318.786l.005.007.05.047.13.124c.108.104.265.242.47.416.405.34.99.788 1.72 1.24 1.451.89 3.54 1.824 5.973 1.824s4.524-.933 5.973-1.824a14.55 14.55 0 0 0 2.193-1.656l.13-.124.034-.036.013-.013.003-.003.004-.002a1.115 1.115 0 0 0 .316-.786v-3.627l-5.815 2.96a6.281 6.281 0 0 1-2.851.686 6.28 6.28 0 0 1-2.851-.686L4.62 11.931Z" />
      </svg>
    ),
    path: '/courses'
  }
];

export const Navbar = ({
  type = 'employeeManagement',
  showFilter = false,
  isFilterActive,
  setIsFilterActive,
  handleClearFilters
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const navId = params.navId || '';
  const employeeId = params.empId || '';

  const navItems = type === 'employeeManagement' ? employeeManagementNavItems : employeeDetailsNavItems;

  const [activeNavId, setActiveNavId] = useState(
    type === 'employeeManagement'
      ? navId || navItems[0]?.path
      : `/${navId}` || navItems[0]?.path
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navRefs = useRef([]);
  const sliderRef = useRef(null);
  const tabContainerRef = useRef(null);

  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];

  const handleNavigation = (path) => {
    setActiveNavId(path);
    const finalPath =
      type === 'employeeManagement'
        ? path
        : `/employee/${employeeId}/details${path}`;

    navigate(finalPath);
    setIsDropdownOpen(false);
    setIsFilterActive?.(false);
    handleClearFilters?.();
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
    if (!navItems.length) return;
    updateSlider();

    const handleResize = () => updateSlider();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(handleResize);
    if (tabContainerRef.current) observer.observe(tabContainerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tabContainerRef.current) observer.unobserve(tabContainerRef.current);
    };
  }, [activeNavId, navItems]);

  if (!navItems.length) return null;

  return (
    <div className="w-full relative bg-[#BBD3CC] rounded-xl">
      {/* Desktop */}
      <ul className="relative hidden md:flex list-none p-0 rounded-xl overflow-hidden" ref={tabContainerRef}>
        <div
          ref={sliderRef}
          className="absolute top-0 left-0 h-full bg-white/50 rounded-xl transition-all duration-500 ease-in-out z-[1]"
        />
        {navItems.map((item, index) => (
          <li
            key={item.path}
            ref={(el) => (navRefs.current[index] = el)}
            className="flex-1 relative z-[2] flex items-center justify-center cursor-pointer font-medium py-4 select-none transition-colors duration-200"
            onClick={() => handleNavigation(item.path)}
            onMouseEnter={() => updateSlider(item.path)}
            onMouseLeave={() => updateSlider(activeNavId)}
          >
            <span className="mr-2 flex items-center">{item.icon}</span>
            {item.label}
          </li>
        ))}
        {showFilter && (
          <li
            className={`relative z-[2] flex items-center justify-center cursor-pointer font-medium px-4 py-4 select-none duration-200 ${isFilterActive ? 'bg-white/40' : ''}`}
            onClick={() => setIsFilterActive?.(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="#000" d="M20 16.606a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75Zm0-13.21a.75.75 0 0 1-.75.75H16.8a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75Zm0 6.6a.741.741 0 0 1-.75.75H7.55a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75Z" />
            </svg>
          </li>
        )}
      </ul>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-4 bg-transparent border-none cursor-pointer font-medium rounded-xl"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <span className="mr-2 flex items-center">{activeItem?.icon}</span>
            <span className="flex-1 text-left">{activeItem?.label}</span>
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#BBD3CC] rounded-lg mt-1 z-10 overflow-hidden">
              {navItems.filter(item => item.path !== activeNavId).map(item => (
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
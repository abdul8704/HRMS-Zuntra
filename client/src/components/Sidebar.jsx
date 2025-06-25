// HOW TO USE SIDEBAR
// <div className="website-container">
//   <Sidebar/>
//   <div className="website-module">
//     <--PUT YOUR CONTENT HERE--->
//   </div>
// </div>
import api from '../api/axios'
import React, { useState, useEffect } from 'react'
import zuntraSquareLogo from "../assets/zuntra_square_no_text.png"
import zuntraLogo from "../assets/zuntra.png"
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarStatus, setSidebar] = useState(0); //0 collapsed 1 hovered 2 expanded 3 pinned
  const [role, setRole] = useState("HR");
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const filteredItems = sidebarItems.filter(item => role === "HR" || item.role === "EMP");
  const activeIndex = filteredItems.findIndex(item => location.pathname.startsWith(item.path));
  setActive(activeIndex);
}, [location.pathname, role]);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarItems = [
    {
      role: "EMP",
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
          <path fill="currentColor" d="M14.951 8a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.383-.95V1.334c0-.377.128-.694.384-.949s.572-.383.95-.384h8c.377 0 .694.128.95.384s.383.572.382.95v5.333c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.949.383h-8ZM1.618 13.333a1.29 1.29 0 0 1-.95-.384A1.296 1.296 0 0 1 .284 12V1.333C.284.956.412.64.668.384s.573-.383.95-.384h8c.378 0 .694.128.95.384s.384.572.383.95V12c0 .378-.128.695-.384.95a1.285 1.285 0 0 1-.95.383h-8ZM14.95 24a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.383-.95V12c0-.378.128-.694.384-.95a1.3 1.3 0 0 1 .95-.383h8c.377 0 .694.128.95.384s.383.572.382.949v10.667c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.949.383h-8ZM1.618 24a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.384-.95v-5.333c0-.377.128-.694.384-.949s.573-.383.95-.384h8c.378 0 .694.128.95.384s.384.572.383.95v5.333c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.95.383h-8Z" />
        </svg>
      ),
    },
    {
      role: "EMP",
      label: "Project Management",
      path: "/projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="29" fill="none" viewBox="0 0 26 29">
          <path fill="currentColor" d="M13 8.598c.718 0 1.3-.57 1.3-1.273 0-.702-.582-1.272-1.3-1.272-.718 0-1.3.57-1.3 1.272 0 .703.582 1.273 1.3 1.273Zm-7.8 12.73h15.6v2.545H5.2v-2.545Zm5.2-6.58 3.63 3.556 5.111-5.009 1.659 1.669V9.873h-5.2l1.703 1.623-3.275 3.206-3.628-3.556-5.2 5.09 1.838 1.8 3.362-3.288Z" />
          <path fill="currentColor" d="M22.1 3.508h-4.287a6.378 6.378 0 0 0-.416-.54l-.013-.016a5.798 5.798 0 0 0-3.757-1.932 3.451 3.451 0 0 0-1.254 0 5.798 5.798 0 0 0-3.757 1.932l-.013.016a6.375 6.375 0 0 0-.416.54H3.9a3.947 3.947 0 0 0-2.757 1.12A3.782 3.782 0 0 0 0 7.327v17.818a3.782 3.782 0 0 0 1.143 2.698 3.947 3.947 0 0 0 2.757 1.12h18.2a3.947 3.947 0 0 0 2.757-1.12A3.782 3.782 0 0 0 26 25.145V7.327a3.782 3.782 0 0 0-1.143-2.7A3.947 3.947 0 0 0 22.1 3.509Zm1.3 21.637c0 .337-.137.661-.38.9a1.314 1.314 0 0 1-.92.372H3.9a1.32 1.32 0 0 1-.92-.372 1.26 1.26 0 0 1-.38-.9V7.327c0-.338.137-.662.38-.9.245-.239.575-.373.92-.373h5.915c.15-.72.548-1.366 1.128-1.83A3.293 3.293 0 0 1 13 3.504c.75 0 1.476.254 2.057.718.58.465.979 1.112 1.128 1.83H22.1c.345 0 .675.135.92.374.243.238.38.562.38.9v17.818Z" />
        </svg>
      ),
    },
    {
      role: "HR",
      label: "Employee Management",
      path: "/employee/all",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
          <path fill="currentColor" d="M10.297 11.857c2.853 0 5.165-2.447 5.165-5.466 0-3.018-2.312-5.465-5.165-5.465-2.852 0-5.164 2.447-5.164 5.465 0 3.02 2.312 5.466 5.164 5.466ZM8.81 23.542v2.538c0 .225.084.44.234.598.15.16.354.248.566.248H23.2a.777.777 0 0 0 .566-.248.872.872 0 0 0 .234-.598v-8.46a.872.872 0 0 0-.234-.599.777.777 0 0 0-.565-.248h-5.597V15.53a.872.872 0 0 0-.234-.599.777.777 0 0 0-.565-.248.778.778 0 0 0-.566.248.872.872 0 0 0-.234.599v1.243h-1.598v-3.029a24.207 24.207 0 0 0-4.11-.355 19.825 19.825 0 0 0-8.794 2.022A2.677 2.677 0 0 0 .4 16.447c-.266.45-.405.971-.4 1.502v5.593h8.81Zm13.591 1.692H10.41v-6.769h5.596v.356c0 .224.085.44.235.598.15.159.353.248.565.248a.78.78 0 0 0 .565-.248.872.872 0 0 0 .234-.598v-.356h4.797v6.769Z" />
        </svg>
      ),
    },
    {
      role: "HR",
      label: "Course Management",
      path: "/courses/all",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
          <path fill="currentColor" d="M11.465.42a4.158 4.158 0 0 1 3.64 0l10.56 5.131c.184.09.34.23.449.406a1.132 1.132 0 0 1 .01 1.18c-.107.178-.26.322-.442.414l-10.508 5.347a4.16 4.16 0 0 1-3.778 0L2.452 8.347v4.986c0 .295-.114.578-.317.786a1.07 1.07 0 0 1-.766.325 1.07 1.07 0 0 1-.766-.325 1.126 1.126 0 0 1-.317-.786V6.611a1.13 1.13 0 0 1 .153-.626c.11-.189.272-.34.466-.434l10.56-5.13ZM4.62 11.931v3.625a1.136 1.136 0 0 0 .318.786l.005.007.05.047.13.124c.108.104.265.242.47.416.405.34.99.788 1.72 1.24 1.451.89 3.54 1.824 5.973 1.824s4.524-.933 5.973-1.824a14.55 14.55 0 0 0 2.193-1.656l.13-.124.034-.036.013-.013.003-.003.004-.002a1.115 1.115 0 0 0 .316-.786v-3.627l-5.815 2.96a6.281 6.281 0 0 1-2.851.686 6.28 6.28 0 0 1-2.851-.686L4.62 11.931Z" />
        </svg>
      ),
    },
    {
      role: "EMP",
      label: "Attendance",
      path: "/attendance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28">
          <g clipPath="url(#a)">
            <path fill="currentColor" d="M23.066 3.889h-1.781v1.556h1.555v19.444H5.729V5.445h1.555V3.889H5.73a1.361 1.361 0 0 0-1.556 1.314V25.13a1.322 1.322 0 0 0 1.33 1.315h17.563a1.323 1.323 0 0 0 1.33-1.315V5.203a1.324 1.324 0 0 0-1.33-1.314Z" />
            <path fill="currentColor" d="M20.507 5.7a1.82 1.82 0 0 0-1.813-1.812h-1.4a3.111 3.111 0 0 0-6.027 0H9.874A1.82 1.82 0 0 0 8.062 5.7v2.855h12.445V5.7ZM18.95 7H9.618V5.7a.257.257 0 0 1 .256-.256h2.855v-.778a1.556 1.556 0 0 1 3.111 0v.778h2.855a.257.257 0 0 1 .256.256V7ZM8.84 10.889h10.89v1.555H8.84V10.89Zm0 3.111h10.89v1.556H8.84V14Z" />
            <path fill="currentColor" d="M8.84 17.111h10.89v1.556H8.84V17.11Z" />
            <path fill="currentColor" d="M8.84 20.223h10.89v1.555H8.84v-1.555Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M.284 0h28v28h-28z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      role: "EMP",
      label: "UpSkill",
      path: "/upskill/all",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="none" viewBox="0 0 30 24">
          <path fill="currentColor" d="M29.284 1.2v21.6c0 .318-.084.623-.234.848-.15.226-.353.352-.566.352h-22.4c-.212 0-.415-.126-.565-.352a1.553 1.553 0 0 1-.235-.848c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h4.8v-6c0-.318.085-.623.235-.848.15-.226.353-.352.565-.352h4.8v-6c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h4.8v-6c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h5.6c.213 0 .416.126.566.351.15.226.234.53.234.849Z" />
          <path fill="currentColor" d="M10.354 0h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.854.354l-1.646-1.647L.708 14.854 0 14.146 11.647 2.5 10 .854A.5.5 0 0 1 10.354 0Z" />
        </svg>
      ),
    },
    {
      role: "EMP",
      label: "Logout",
      path: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 54 54">
          <path fill="#000" d="M20.25 45.902a1.35 1.35 0 0 1 0-2.7H37.8a5.4 5.4 0 0 0 5.4-5.4v-21.6a5.4 5.4 0 0 0-5.4-5.4H20.25a1.35 1.35 0 0 1 0-2.7H37.8a8.1 8.1 0 0 1 8.1 8.1v21.6a8.1 8.1 0 0 1-8.1 8.1H20.25Zm-3.094-29.306a1.35 1.35 0 0 0-1.912 0l-9.45 9.45a1.349 1.349 0 0 0 0 1.911l9.45 9.45a1.353 1.353 0 0 0 1.912-1.911l-7.147-7.144h23.74a1.35 1.35 0 0 0 0-2.7H10.01l7.147-7.145a1.35 1.35 0 0 0 0-1.911Z" />
        </svg>
      ),
    },
  ]

  const handleMouseEnter = () => {
    if (!isMobile && sideBarStatus === 0) setSidebar(1);
  };

  const handleMouseLeave = () => {
    if (!isMobile && (sideBarStatus === 1 || sideBarStatus === 2)) setSidebar(0);
  };

  const handleArrowClick = () => {
    if (isMobile) {
      setSidebar(2);
    } else {
      setSidebar(2);
    }
  };

  const handlePinClick = () => {
    if (isMobile) {
      setSidebar(0);
    } else {
      sideBarStatus === 2 ? setSidebar(3) : setSidebar(0);
    }
  };

const handleItemClick = async (index) => {
  const selectedItem = sidebarItems.filter(item => role === "HR" || item.role === "EMP")[index];
  if(selectedItem.label === 'Logout'){
    const time = new Date()
    const pp = await api.post('/api/employee/logout', {
      logoutTime: time
    })
  }
  navigate(selectedItem.path);
  if (isMobile) {
    setSidebar(0);
  }
};

  return (
    <>
      <div
        className={`website-sidebar ${sideBarStatus === 0 ? 'website-sidebar-collapsed' : ''} ${sideBarStatus === 2 || sideBarStatus === 3 ? 'website-sidebar-expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="website-sidebar-logo">
          {sideBarStatus == 0 || sideBarStatus == 1 ?
            <img style={{ width: '3rem', height: '3rem' }} src={zuntraSquareLogo} alt="ZUNTRA" /> : <img style={{ width: '10rem', height: '3rem' }} src={zuntraLogo} alt="ZUNTRA" />
          }
        </div>

        {(sideBarStatus === 2) && (
          <div className="website-sidebar-top-right-icon" onClick={handlePinClick}>
            {isMobile ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 20 20">
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 19 4.63-4.631m.006-.005-2.78-2.78c-.954-.953.006-2.996 1.31-3.078 1.178-.075 3.905.352 4.812-.555l2.49-2.49c.617-.618.225-2 .185-2.762-.058-1.016 1.558-2.271 2.415-1.414l4.647 4.648c.86.858-.4 2.469-1.413 2.415-.762-.04-2.145-.432-2.763.185l-2.49 2.49c-.906.907-.48 3.633-.554 4.81-.082 1.306-2.125 2.266-3.08 1.31l-2.78-2.78Z" />
              </svg>
            )}
          </div>
        )}
        {(sideBarStatus === 3) && (
          <div className="website-sidebar-top-right-icon" onClick={handlePinClick}>
            {isMobile ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 34 34">
                <path fill="#000" d="M11.885 8.912c.15-.738.692-1.7 1.828-1.7h6.572c1.139-.001 1.68.962 1.829 1.7.08.4.078.813-.01 1.211-.085.387-.27.8-.608 1.104a8.967 8.967 0 0 1-.516.415l-.055.041a9.04 9.04 0 0 0-.551.449c-.374.338-.451.536-.453.622v3.522c0 .113.056.31.244.605a6.2 6.2 0 0 0 .759.919c.3.31.623.612.936.902l.034.033c.31.288.626.583.85.838.684.774.653 1.879.342 2.686-.311.806-1.046 1.664-2.154 1.664H17.75v5.805a.75.75 0 1 1-1.5 0v-5.805h-3.182c-1.108 0-1.844-.857-2.154-1.664-.311-.806-.341-1.912.34-2.686.226-.255.543-.55.852-.838l.034-.033c.312-.29.636-.592.936-.902.313-.324.577-.634.76-.919.187-.295.242-.493.242-.606v-3.521c0-.086-.078-.284-.453-.622a9.012 9.012 0 0 0-.552-.449l-.054-.041a8.967 8.967 0 0 1-.515-.415c-.34-.305-.524-.717-.61-1.103a2.953 2.953 0 0 1-.01-1.212Z" />
              </svg>
            )}
          </div>
        )}

        <div className="website-sidebar-pages-container">
          {sidebarItems
            .filter(item => role === "HR" || item.role === "EMP")
            .map((item, index) => (
              <div
                className={`website-sidebar-icon ${index === active ? "website-sidebar-icon-active" : ""}`}
                key={index}
                onClick={() => handleItemClick(index)}
                
              >
                <div className="website-icon-wrapper">{item.icon}</div>
                <div className={`website-label-wrapper ${(sideBarStatus === 2 || sideBarStatus === 3) ? 'show' : 'hide'}`}>
                  {item.label}
                </div>
              </div>
            ))}
        </div>

        {/* Arrow button - always visible on mobile, only on hover for desktop */}
        {(sideBarStatus === 1 || isMobile) && sideBarStatus !== 2 && sideBarStatus !== 3 && (
          <div
            className="website-sidebar-expand-arrow"
            onClick={handleArrowClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </div>
        )}
      </div>
      </>
  );
}

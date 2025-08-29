import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import zuntraSquareLogo from '../assets/zuntra_square_no_text.png';
import zuntraLogo from '../assets/zuntra.png';
import { Logout } from './Logout';

// Sidebar items 
const sidebarItems = [
  { role: "EMP", label: "Dashboard", path: "/dashboard", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24"> <path fill="currentColor" d="M14.951 8a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.383-.95V1.334c0-.377.128-.694.384-.949s.572-.383.95-.384h8c.377 0 .694.128.95.384s.383.572.382.95v5.333c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.949.383h-8ZM1.618 13.333a1.29 1.29 0 0 1-.95-.384A1.296 1.296 0 0 1 .284 12V1.333C.284.956.412.64.668.384s.573-.383.95-.384h8c.378 0 .694.128.95.384s.384.572.383.95V12c0 .378-.128.695-.384.95a1.285 1.285 0 0 1-.95.383h-8ZM14.95 24a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.383-.95V12c0-.378.128-.694.384-.95a1.3 1.3 0 0 1 .95-.383h8c.377 0 .694.128.95.384s.383.572.382.949v10.667c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.949.383h-8ZM1.618 24a1.29 1.29 0 0 1-.95-.384 1.296 1.296 0 0 1-.384-.95v-5.333c0-.377.128-.694.384-.949s.573-.383.95-.384h8c.378 0 .694.128.95.384s.384.572.383.95v5.333c0 .377-.128.694-.384.95a1.285 1.285 0 0 1-.95.383h-8Z" /> </svg> ), },
  { role: "EMP", label: "CEO Dash", path: "/ceo", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="none" viewBox="0 0 20 16"> <path fill="#000" d="M16.5 14h-13c-.275 0-.5.225-.5.5v1c0 .275.225.5.5.5h13c.275 0 .5-.225.5-.5v-1c0-.275-.225-.5-.5-.5Zm2-10A1.5 1.5 0 0 0 17 5.5c0 .222.05.428.137.619l-2.262 1.356a.999.999 0 0 1-1.381-.362l-2.547-4.457A1.494 1.494 0 0 0 10 0a1.5 1.5 0 0 0-1.5 1.5c0 .469.219.881.553 1.156L6.506 7.113a1 1 0 0 1-1.381.362l-2.26-1.356a1.5 1.5 0 0 0 .138-.619A1.5 1.5 0 1 0 1.5 7c.081 0 .163-.013.24-.025L4 13h12l2.26-6.025c.077.013.159.025.24.025a1.5 1.5 0 0 0 0-3Z" /> </svg> ), },
 { role: "EMP", label: "Project Management", path: "/projects/ongoing", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="26" height="29" fill="none" viewBox="0 0 26 29"> <path fill="currentColor" d="M13 8.598c.718 0 1.3-.57 1.3-1.273 0-.702-.582-1.272-1.3-1.272-.718 0-1.3.57-1.3 1.272 0 .703.582 1.273 1.3 1.273Zm-7.8 12.73h15.6v2.545H5.2v-2.545Zm5.2-6.58 3.63 3.556 5.111-5.009 1.659 1.669V9.873h-5.2l1.703 1.623-3.275 3.206-3.628-3.556-5.2 5.09 1.838 1.8 3.362-3.288Z" /> <path fill="currentColor" d="M22.1 3.508h-4.287a6.378 6.378 0 0 0-.416-.54l-.013-.016a5.798 5.798 0 0 0-3.757-1.932 3.451 3.451 0 0 0-1.254 0 5.798 5.798 0 0 0-3.757 1.932l-.013.016a6.375 6.375 0 0 0-.416.54H3.9a3.947 3.947 0 0 0-2.757 1.12A3.782 3.782 0 0 0 0 7.327v17.818a3.782 3.782 0 0 0 1.143 2.698 3.947 3.947 0 0 0 2.757 1.12h18.2a3.947 3.947 0 0 0 2.757-1.12A3.782 3.782 0 0 0 26 25.145V7.327a3.782 3.782 0 0 0-1.143-2.7A3.947 3.947 0 0 0 22.1 3.509Zm1.3 21.637c0 .337-.137.661-.38.9a1.314 1.314 0 0 1-.92.372H3.9a1.32 1.32 0 0 1-.92-.372 1.26 1.26 0 0 1-.38-.9V7.327c0-.338.137-.662.38-.9.245-.239.575-.373.92-.373h5.915c.15-.72.548-1.366 1.128-1.83A3.293 3.293 0 0 1 13 3.504c.75 0 1.476.254 2.057.718.58.465.979 1.112 1.128 1.83H22.1c.345 0 .675.135.92.374.243.238.38.562.38.9v17.818Z" /> </svg> ), },
 { role: "HR", label: "Employee Management", path: "/employee/all", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27"> <path fill="currentColor" d="M10.297 11.857c2.853 0 5.165-2.447 5.165-5.466 0-3.018-2.312-5.465-5.165-5.465-2.852 0-5.164 2.447-5.164 5.465 0 3.02 2.312 5.466 5.164 5.466ZM8.81 23.542v2.538c0 .225.084.44.234.598.15.160.354.248.566.248H23.2a.777.777 0 0 0 .566-.248.872.872 0 0 0 .234-.598v-8.46a.872.872 0 0 0-.234-.599.777.777 0 0 0-.565-.248h-5.597V15.53a.872.872 0 0 0-.234-.599.777.777 0 0 0-.565-.248.778.778 0 0 0-.566.248.872.872 0 0 0-.234.599v1.243h-1.598v-3.029a24.207 24.207 0 0 0-4.11-.355 19.825 19.825 0 0 0-8.794 2.022A2.677 2.677 0 0 0 .4 16.447c-.266.45-.405.971-.4 1.502v5.593h8.81Zm13.591 1.692H10.41v-6.769h5.596v.356c0 .224.085.44.235.598.15.159.353.248.565.248a.78.78 0 0 0 .565-.248.872.872 0 0 0 .234-.598v-.356h4.797v6.769Z" /> </svg> ), },
  { role: "HR", label: "Course Management", path: "/courses/all", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20"> <path fill="currentColor" d="M11.465.42a4.158 4.158 0 0 1 3.640 0l10.56 5.131c.184.90.340.230.449.406a1.132 1.132 0 0 1 .010 1.180c-.107.178-.260.322-.442.414l-10.508 5.347a4.16 4.16 0 0 1-3.778 0L2.452 8.347v4.986c0 .295-.114.578-.317.786a1.07 1.07 0 0 1-.766.325 1.07 1.07 0 0 1-.766-.325 1.126 1.126 0 0 1-.317-.786V6.611a1.13 1.13 0 0 1 .153-.626c.110-.189.272-.340.466-.434l10.56-5.130ZM4.62 11.931v3.625a1.136 1.136 0 0 0 .318.786l.005.007.050.047.130.124c.108.104.265.242.470.416.405.340.990.788 1.720 1.240 1.451.890 3.540 1.824 5.973 1.824s4.524-.933 5.973-1.824a14.55 14.55 0 0 0 2.193-1.656l.130-.124.034-.036.013-.013.003-.003.004-.002a1.115 1.115 0 0 0 .316-.786v-3.627l-5.815 2.960a6.281 6.281 0 0 1-2.851.686 6.28 6.28 0 0 1-2.851-.686L4.62 11.931Z" /> </svg> ), },
{ role: "EMP", label: "Attendance", path: "/attendance/me", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28"> <g clipPath="url(#a)"> <path fill="currentColor" d="M23.066 3.889h-1.781v1.556h1.555v19.444H5.729V5.445h1.555V3.889H5.73a1.361 1.361 0 0 0-1.556 1.314V25.13a1.322 1.322 0 0 0 1.33 1.315h17.563a1.323 1.323 0 0 0 1.33-1.315V5.203a1.324 1.324 0 0 0-1.33-1.314Z" /> <path fill="currentColor" d="M20.507 5.7a1.82 1.82 0 0 0-1.813-1.812h-1.4a3.111 3.111 0 0 0-6.027 0H9.874A1.82 1.82 0 0 0 8.062 5.7v2.855h12.445V5.7ZM18.95 7H9.618V5.7a.257.257 0 0 1 .256-.256h2.855v-.778a1.556 1.556 0 0 1 3.111 0v.778h2.855a.257.257 0 0 1 .256.256V7ZM8.84 10.889h10.89v1.555H8.84V10.89Zm0 3.111h10.89v1.556H8.84V14Z" /> <path fill="currentColor" d="M8.84 17.111h10.89v1.556H8.84V17.11Z" /> <path fill="currentColor" d="M8.84 20.223h10.89v1.555H8.84v-1.555Z" /> </g> <defs> <clipPath id="a"> <path fill="#fff" d="M.284 0h28v28h-28z" /> </clipPath> </defs> </svg> ), },
  { role: "EMP", label: "UpSkill", path: "/upskill/all", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="none" viewBox="0 0 30 24"> <path fill="currentColor" d="M29.284 1.2v21.6c0 .318-.084.623-.234.848-.15.226-.353.352-.566.352h-22.4c-.212 0-.415-.126-.565-.352a1.553 1.553 0 0 1-.235-.848c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h4.8v-6c0-.318.085-.623.235-.848.15-.226.353-.352.565-.352h4.8v-6c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h4.8v-6c0-.318.085-.623.235-.849.15-.225.353-.351.565-.351h5.6c.213 0 .416.126.566.351.15.226.234.53.234.849Z" /> <path fill="currentColor" d="M10.354 0h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.854.354l-1.646-1.647L.708 14.854 0 14.146 11.647 2.5 10 .854A.5.5 0 0 1 10.354 0Z" /> </svg> ), },
  { role: "EMP", label: "Documents", path: "/documents/all", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="none" viewBox="0 0 16 20"> <path fill="#000" fillRule="evenodd" d="M10.25.5A.25.25 0 0 0 10 .25H3A2.75 2.75 0 0 0 .25 3v14A2.75 2.75 0 0 0 3 19.75h10A2.75 2.75 0 0 0 15.75 17V7.147a.25.25 0 0 0-.25-.25H11a.75.75 0 0 1-.75-.75V.5Zm.75 9.75a.75.75 0 1 1 0 1.5H5a.75.75 0 1 1 0-1.5h6Zm0 4a.75.75 0 1 1 0 1.5H5a.75.75 0 1 1 0-1.5h6Z" clipRule="evenodd" /> <path fill="#000" d="M11.75.823c0-.184.193-.3.336-.186.121.098.229.212.323.342l3.013 4.197c.068.096-.006.22-.124.22H12a.25.25 0 0 1-.25-.25V.823Z" /> </svg> ), },
  // Add user profile item before logout
  { role: "EMP", label: "My Profile", path: "/profile", icon: ( <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"> {/* This will be replaced with actual profile image */} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"> <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle> </svg> </div> ), },
{ role: "EMP", label: "Logout", path: "", icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18"> <path fill="#000" d="M15.791 2h-6c-.55 0-1-.45-1-1s.45-1 1-1h6c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-6c-.55 0-1-.45-1-1s.45-1 1-1h6V2Z" /> <path fill="#000" d="m.141 8.65 2.79-2.79a.5.5 0 0 1 .86.35V8h7c.55 0 1 .45 1 1s-.45 1-1 1h-7v1.79c0 .45-.54.67-.85.35L.151 9.35c-.2-.19-.2-.51-.01-.7Z" /> </svg> ), },
];


export const Sidebar = ({ role = "HR", userProfileImage = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState(role);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sidebarState, setSidebarState] = useState(0); // 0: collapsed, 1: hover, 2: expanded, 3: pinned
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Only show items matching role
  const visibleItems =
    userRole === "newUser"
      ? []
      : sidebarItems.filter(item => userRole === "HR" || item.role === "EMP")
          .map(item => {
            // Replace profile icon with actual profile image if available
            if (item.label === "My Profile" && userProfileImage) {
              return {
                ...item,
                
                icon: (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                    <div 
  className="flex items-center justify-center cursor-pointer my-4"
  onClick={() => navigate("/profile")}
></div>
                    <img 
                      src={userProfileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              };
            }
            return item;
          });

  const getActiveIndex = () => {
    if (currentPath.startsWith("/employee")) return visibleItems.findIndex(i => i.label === "Employee Management");
    if (currentPath.startsWith("/projects")) return visibleItems.findIndex(i => i.label === "Project Management");
    if (currentPath.startsWith("/courses")) return visibleItems.findIndex(i => i.label === "Course Management");
    if (currentPath.startsWith("/dashboard")) return visibleItems.findIndex(i => i.label === "Dashboard");
    if (currentPath.startsWith("/attendance")) return visibleItems.findIndex(i => i.label === "Attendance");
    if (currentPath.startsWith("/upskill")) return visibleItems.findIndex(i => i.label === "UpSkill");
    if (currentPath.startsWith("/documents")) return visibleItems.findIndex(i => i.label === "Documents");
    if (currentPath.startsWith("/profile")) return visibleItems.findIndex(i => i.label === "My Profile");
    return visibleItems.findIndex(i => i.path === "/");
  };

  const activeIndex = getActiveIndex();

  const getPositionStyle = (index) => ({
    top: `${index * 64}px`,
  });

  const handleItemClick = (item) => {
    if (item.label === "Logout") {
      setOpen(true);
    } else {
      navigate(item.path);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  

  // ========== MOBILE SIDEBAR ==========
  if (isMobile) {
    return (
      <>
        <Logout isOpen={open} onClose={() => setOpen(false)} />

        {/* Mobile menu button */}
        <button
          className={`fixed top-[4rem] -left-3 z-[9999] w-12 h-12 bg-[#bcd4cd] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="极狐 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[9998] bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen bg-[#bcd4cd] text-black transition-all duration-300 ease-in-out z-[9999] ${mobileMenuOpen ? 'w-screen' : 'w-0'
            } overflow-hidden`}
        >
          <div className="flex极狐 flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <img src={zuntraLogo} alt="Logo" className="h-8" />
              <button
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className={`w-full px-6 py-4 cursor-pointer transition-all duration-200 flex items-center space-x-4 ${index === activeIndex ? 'bg-white/30' : 'hover:bg-white/20'
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ========== DESKTOP SIDEBAR ==========
  return (
    <>
      <Logout isOpen={open} onClose={() => setOpen(false)} />
      <div
        className={`relative bg-[#bcd4cd] h-screen flex flex-col items-start pt-4 text-black transition-all duration-200 ease-in-out
        ${sidebarState === 2 || sidebarState === 3 ? 'w-[21rem]' : 'w-[4.5rem]'}`}
        onMouseEnter={() => { if (sidebarState === 0) setSidebarState(1); }}
        onMouseLeave={() => { if (sidebarState !== 3) setSidebarState(0); }}
      >
        {(sidebarState === 2 || sidebarState === 3) && (
          <div
            className="absolute top-2 right-2 cursor-pointer rounded-full hover:scale-110 transition-all duration-200 z-50"
            onClick={() => setSidebarState(prev => (prev === 2 ? 3 : 0))}
          >
            {/* Pin/Unpin Icon */}
            {sidebarState === 2 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 19 4.63-4.631m.006-.005-2.78-2.78c-.954-.953.006-2.996 1.31-3.078 1.178-.075 3.905.352 4.812-.555l2.极狐-2.49c.617-.618.225-2 .185-2.762-.058-1.016 1.558-2.271 2.415-1.414l4.647 4.648c.86.858-.4 2.469-1.413 2.415-.762-.04-2.145-.432-2.763.185l-2.49 2.49c-.906.907-.48 3.633-.554 4.81-.082 1.306-2.125 2.266-3.08 1.31l-2.78-2.78Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/s极狐" width="14" height="24" fill="none" viewBox="0 0 14 24">
                <path fill="#000" d="M1.885 1.912c.15-.738.692-1.7 1.828-1.7h6.572c1.139-.001 1.68.962 1.829 1.7.08.4.077.813-.01 1.211-.085.387-.27.8-.608 1.104a8.992 8.992 0 0 1-.516.415l-.055.041a8.77 8.77 0 0 0-.551.449c-.374.338-.451.536-.453.622v3.522c0 .113.056.极狐.244.605a6.2 6.2 0 0 0 .759.919c.3.31.623.612.936.902l.034.033c.310.288.626.583.85.838.684.774.653 1.879.342 2.686-.311.806-1.046 1.664-2.154 1.664H7.75v5.805a.75.75 0 1 1-1.5 0v-5.805H3.068c-1.108 0-1.844-.857-2.154-1.664-.311-.806-.342-1.912.34-2.686.226-.255.542-.55.852-.838l.034-.033c.312-.29.636-.592.936-.902.313-.324.577-.634.76-.919.187-.295.242-.493.242-.606V5.754c0-.086-.078-.284-.453-.622a9 9 0 0 0-.551-.449l-.055-.041a8.999 8.999 0 0 1-.515-.415c-.34-.305-.524-.717-.61-1.103a2.953 2.953 0 0 1-.01-1.212Z" />
              </svg>
            )}
          </div>
        )}

        {/* Logo */}
        <div className="w-full h-10 mb-10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out"
            style={{
              opacity: sidebarState === 2 || sidebarState === 3 ? 0 : 1,
              transform: sidebarState === 2 || sidebarState === 3 ? 'scale(0.8)' : 'scale(1)',
              transitionDelay: sidebarState === 2 || sidebarState === 3 ? '0ms' : '100ms'
            }}
          >
            <img src={zuntraSquareLogo} alt="Logo" className="w-10 h-10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
            style={{
              opacity: sidebarState === 2 || sidebarState === 3 ? 1 : 0,
              transform: sidebarState === 2 || sidebarState === 3 ? 'scale(1)' : 'scale(0.9)',
              transitionDelay: sidebarState === 2 || sidebarState === 3 ? '200ms' : '0ms'
            }}
          >
            <img src={zuntraLogo}极狐 alt="Logo" className="w-auto h-10" />
          </div>
        </div>

        {sidebarState === 1 && (
          <div
            className="absolute top-[10vh] left-full transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#BBD3CC] border-4 border-white rounded-full flex items-center justify-center cursor-pointer z-[1000极狐 transition-all duration-300 ease-out"
            style={{
              animation: 'fadeIn 0.4s ease-out forwards',
              left: 'calc(100% - 20px)'
            }}
            onClick={() => setSidebarState(2)}
          >
            <span className="text-black font-bold text-lg transition-transform duration-200 hover:scale-110">&gt;</span>
          </div>
        )}

        {/* Sidebar Items */}
        <div className="relative flex-1 w-full overflow-hidden">
          <div
            className="absolute left-0 w-full h-[4.0rem] bg-white/50 transition-all duration-500 ease-in-out z-0"
            style={getPositionStyle(hoveredIndex !== null ? hoveredIndex : activeIndex)}
          />
          <div className="flex flex-col w-full z-10 relative">
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className={`w-full h-[4.0rem] cursor-pointer transition-opacity duration-200 
                  ${index === activeIndex ? 'opacity-100' : 'opacity-50'} 
                  flex items-center`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleItemClick(item)}
              >
                <div className="w-[4.5rem] h-full flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span
                  className="text-lg font-medium whitespace-nowrap ml-2 transition-all duration-500 ease-in-out"
                  style={{
                    opacity: sidebarState === 2 || sidebarState === 3 ? 1 : 0,
                    transform: sidebarState === 2 || sidebarState === 3 ? 'translateX(0)' : 'translateX(16px)',
                    transitionDelay: sidebarState === 2 ? '250ms' : '0ms'
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom style for fade animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateX(-10px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </>
  );
};
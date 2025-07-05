import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const navItems = [ /* your navItems remain unchanged */ ];

export const UpskillNavbar = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
  const [activeNavId, setActiveNavId] = useState(navId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navRefs = useRef([]);
  const sliderRef = useRef(null);
  const tabContainerRef = useRef(null);

  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];

  const handleNavigation = (path) => {
    setActiveNavId(path);
    navigate(`/upskill/${encodeURIComponent(path)}`);
    setIsDropdownOpen(false);
  };

  const updateSlider = () => {
    const activeIndex = navItems.findIndex(item => item.path === activeNavId);
    const tab = navRefs.current[activeIndex];
    if (tab && sliderRef.current) {
      sliderRef.current.style.width = `${tab.offsetWidth}px`;
      sliderRef.current.style.transform = `translateX(${tab.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    updateSlider();

    const update = () => updateSlider();
    window.addEventListener('resize', update);

    const observer = new ResizeObserver(update);
    if (tabContainerRef.current) {
      observer.observe(tabContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (tabContainerRef.current) {
        observer.unobserve(tabContainerRef.current);
      }
    };
  }, [activeNavId]);

  return (
    <div className="bg-[#BBD3CC] rounded-xl w-full relative">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex relative list-none m-0 p-0 rounded-xl overflow-hidden" ref={tabContainerRef}>
        <div
          ref={sliderRef}
          className="absolute top-0 left-0 h-full bg-white/40 rounded-xl transition-all duration-300 z-[1]"
        />
        {navItems.map((item, index) => (
          <li
            key={item.path}
            ref={(el) => (navRefs.current[index] = el)}
            className={`flex-1 relative z-[2] flex items-center justify-center cursor-pointer font-medium py-4 transition-colors duration-200 select-none
              ${activeNavId === item.path ? 'text-gray-900' : 'hover:bg-black/5 rounded-xl'}`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="mr-2 flex items-center shrink-0">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="md:hidden block relative">
        <button
          className="w-full flex items-center justify-between p-4 font-medium rounded-xl bg-transparent"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <span className="shrink-0">{activeItem.icon}</span>
            <span>{activeItem.label}</span>
          </span>
          <svg
            className={`ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-[#BBD3CC] rounded-lg z-10 shadow-md">
            {navItems.filter(item => item.path !== activeNavId).map((item) => (
              <button
                key={item.path}
                className="w-full flex items-center p-3 font-medium hover:bg-black/5 rounded-none text-left"
                onClick={() => handleNavigation(item.path)}
              >
                <span className="mr-2 shrink-0">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

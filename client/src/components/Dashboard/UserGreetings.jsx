import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolTip } from './ToolTip';

export const UserGreetings = ({ name, profileImageURL }) => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [quote, setQuote] = useState('');

  const motivationalQuotes = [
    "Hope you make the most of your time today!",
    "Wishing you a day where every minute counts!",
    "May your productivity flow effortlessly today!",
    "Hope you stay focused and purpose-driven today!",
    "Wishing you the discipline to turn goals into achievements!",
    "Start strong and stick to your plan today!",
    "Wishing you the kind of success that comes from deep focus!",
    "Hope you invest your time wisely and feel proud at the end of the day!",
    "Don't just count the hours — make them amazing!",
    "May your day be full of plans that work and work that matters!"
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[random]);
  }, []);

  const handleMouseEnter = () => {
    const el = textRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center font-sans p-4 relative overflow-hidden animate-fade-in">
      <div className="flex items-center">
        {/* Text area - 80% */}
        <div className="w-[80%] overflow-hidden">
          <h2
            ref={textRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-[1.4rem] text-gray-800 truncate whitespace-nowrap overflow-hidden cursor-default transition-all duration-300 ease-in-out"
          >
            Greetings, {name}! 👋
          </h2>

          <div className="relative w-full overflow-hidden h-[1.5rem] mt-1">
            <div className="absolute whitespace-nowrap animate-marquee text-base text-gray-500">
              {quote}
            </div>
          </div>
        </div>

        {/* Profile image - 20% */}
        <div className="w-[20%] flex justify-end">
          <img
            src={profileImageURL}
            alt="Profile"
            onClick={handleClick}
            className="w-[3.75rem] h-[3.75rem] rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      {showTooltip && (
        <ToolTip
          text={`Greetings, ${name}! 👋`}
          anchorRef={textRef}
          position="bottom"
          offset={8}
        />
      )}

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 10s linear infinite;
          }

          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

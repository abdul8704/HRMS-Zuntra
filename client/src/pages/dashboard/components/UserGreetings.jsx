import React, { useRef, useState, useEffect } from 'react';
import { ToolTip } from '../../../components/ToolTip'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export const UserGreetings = ({ name, profileImageURL, marqueeText }) => {
  const {user, loading} = useAuth();
  if(!loading) console.log(user);
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Check overflow once on mount and when name changes
  useEffect(() => {
    const el = nameRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [name]);

  return (
    <div className="w-full h-full flex items-center rounded-2xl overflow-hidden">
      {/* Left Side: Greeting and Marquee */}
      <div className="flex-1 h-full flex flex-col justify-center overflow-hidden">
        {/* Greeting with Conditional Tooltip */}
        <div
          className="relative max-w-full"
          onMouseEnter={() => isOverflowing && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p
            ref={nameRef}
            className="text-[2.5vh] font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
          >
            Greetings, {name}
          </p>
          {isOverflowing && showTooltip && (
            <ToolTip text={`${name}`} anchorRef={nameRef} />
          )}
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden mt-[0.5vh]">
          <div className="animate-marquee whitespace-nowrap text-[2.3vh] text-gray-600 w-max">
            {marqueeText}
          </div>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="ml-4 shrink-0 cursor-pointer" onClick={()=> navigate(`/employee/${user.userid}/details/attendance`)}>
        <img
          src={profileImageURL}
          alt="Profile"
          className="w-[3rem] h-[3rem] rounded-full object-cover"
        />
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

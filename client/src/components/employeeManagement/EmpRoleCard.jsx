import React, { useRef, useState, useEffect } from "react";
import { ToolTip } from "../dashboard/ToolTip";

export const EmpRoleCard = ({ role, bgColor, ibgcolor, onEdit }) => {
  const handleEditClick = () => {
    onEdit({ role, color: bgColor });
  };

  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowTooltip(true);
    }
  }, [role]);

  return (
    <>
    <div
      className="flex items-center rounded-lg p-4 w-[20vw] h-[10vh] shadow-md font-sans mx-auto"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between gap-5 w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.5rem"
          height="2.5rem"
          fill={ibgcolor}
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z" />
        </svg>

        <div className="relative max-w-[8rem]">
          <p
            ref={textRef}
            className="text-base font-bold text-gray-800 truncate"
          >
            {role}
          </p>
        </div>

        {/* Edit Button */}
        <span className="cursor-pointer" onClick={handleEditClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            fill="none"
            viewBox="0 0 25 25"
            >
            <path
              fill="#000"
              fillOpacity=".5"
              d="m15.359 8.333 1.305 1.306L4.055 22.222H2.777v-1.278L15.36 8.334Zm5-8.333a1.39 1.39 0 0 0-.973.403l-2.541 2.541 5.207 5.209 2.542-2.542c.541-.542.541-1.444 0-1.958l-3.25-3.25A1.364 1.364 0 0 0 20.358 0Zm-5 4.43L0 19.793V25h5.208L20.567 9.639 15.359 4.43Z"
              />
          </svg>
        </span>
      </div>
    </div>
      {showTooltip && (
        <ToolTip text={role} anchorRef={textRef} position="top" offset={6} />
      )}
    </>
  );
};

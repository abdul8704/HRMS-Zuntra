import React from "react";

export const EmpProfile = ({
  name,
  role,
  avatar,
  tl = false,
  color = "rgba(255,255,255,0.2)",
}) => {

  return (
    <div
      className="flex items-center rounded-full pl-1 pr-3 py-1 w-full h-12 relative"
      style={{ backgroundColor: color }}
    >
      {tl && (
        <svg
          className="absolute top-[0.2rem] right-[0.6rem] w-[0.75rem] h-[0.75rem] text-[#d4af37]"
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#d4af37"
        >
          <path d="M200-160v-80h560v80H200Zm0-140-51-321..." />
        </svg>
      )}

      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full mr-3 object-cover shrink-0"
        style={{ objectPosition: "center" }}
      />

      <div className="flex flex-col justify-center overflow-hidden">
        <div className="font-bold text-sm truncate leading-tight text-black">
          {name}
        </div>
        <div className="text-xs text-gray-600 truncate leading-tight">
          {role}
        </div>
      </div>
    </div>
  );
};

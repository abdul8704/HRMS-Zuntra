export const EmpProfile = ({
  name,
  role,
  avatar,
  tl = false,
  color = "rgba(255,255,255,0.2)",
}) => {
  const firstName = name.split(" ")[0];

  return (
    <div
      className="flex items-center rounded-full px-3 py-1 max-w-[13.75rem] h-10 relative"
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
          <path d="M200-160v-80h560v80H200Zm0-140-51-321q-2 0-4.5.5t-4.5.5q-25 0-42.5-17.5T80-680q0-25 17.5-42.5T140-740q25 0 42.5 17.5T200-680q0 7-1.5 13t-3.5 11l125 56 125-171q-11-8-18-21t-7-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820q0 15-7 28t-18 21l125 171 125-56q-2-5-3.5-11t-1.5-13q0-25 17.5-42.5T820-740q25 0 42.5 17.5T880-680q0 25-17.5 42.5T820-620q-2 0-4.5-.5t-4.5-.5l-51 321H200Zm68-80h424l26-167-105 46-133-183-133 183-105-46 26 167Zm212 0Z" />
        </svg>
      )}
      <img
        src={avatar}
        alt={firstName}
        className="w-8 h-8 rounded-full mr-2 object-cover shrink-0"
      />
      <div className="flex flex-col justify-center flex-1 overflow-hidden">
        <div className="font-semibold text-sm truncate leading-[1.2]">
          {firstName}
        </div>
        <div className="text-[11px] text-[#5b5b5b] mt-[0.125rem] truncate leading-[1.2]">
          {role}
        </div>
      </div>
    </div>
  );
};

export const EmpProfile = ({
  name,
  role,
  avatar,
  color = "#d3dce7",
}) => {
  const firstName = name.split(" ")[0];

  return (
    <div
      className="flex items-center rounded-full px-4 py-2 w-full h-14" 
      style={{ backgroundColor: color }}
    >
      <img
        src={avatar}
        alt={firstName}
        className="w-10 h-10 rounded-full mr-3 object-cover shrink-0" 
      />
      <div className="flex flex-col justify-cen
      ter overflow-hidden">
        <div className="font-bold text-sm truncate leading-tight text-black">
          {firstName}
        </div>
        <div className="text-xs text-gray-600 truncate leading-tight">
          {role}
        </div>
      </div>
    </div>
  );
};

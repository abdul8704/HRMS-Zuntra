export const EmpProfile = ({
  name,
  role,
  avatar,
  color = "#d3dce7",
}) => {
  const firstName = name.split(" ")[0];

  return (
    <div
      className="flex items-center rounded-full py-1 h-11 w-40"

      style={{ backgroundColor: color }}
    >
      <img
        src={avatar}
        alt={firstName}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        style={{ marginRight: 4 }} // small spacing if needed
      />
      <div className="flex flex-col justify-center overflow-hidden">
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

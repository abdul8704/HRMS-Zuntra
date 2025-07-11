import React from "react";

export const NotificationCard = () => {
  const reminders = [
    "Today is payroll day, must have to giveddddddddddddddddddddddddddddddd22332dddddd dddd dddddd dd dd pay to employee’s 1",
    "Today is payroll day, must have to give pay to employee’s 2",
    "Today is payroll day, must have to give pay to employee’s 3",
    "Today is payroll day, must have to give pay to employee’s 4",
  ];

  return (
    <div className="w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)]">
      {/* Header */}
      <div className="flex items-center justify-between font-semibold text-[1.1rem] mb-2">
        <span className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">Notification</span>

        {/* Custom Plus Icon */}
        <button className="cursor-pointer p-1 hover:scale-110 transition-transform duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              fill="#1E1E1E"
              d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 1.846A10.14 10.14 0 0 1 22.154 12 10.14 10.14 0 0 1 12 22.154 10.14 10.14 0 0 1 1.846 12 10.14 10.14 0 0 1 12 1.846Zm-.923 4.616v4.615H6.462v1.846h4.615v4.615h1.846v-4.615h4.615v-1.846h-4.615V6.462h-1.846Z"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto pl-3">
        <ul className="list-disc pl-5 m-0">
          {reminders.map((item, index) => (
            <li
              key={index}
              className="mb-2 text-gray-700 text-[clamp(0.7rem,1.1vw,0.9rem)] break-words"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

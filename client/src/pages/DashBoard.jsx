import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { jwtDecode } from 'jwt-decode';

export const DashBoard = () => {
  const token = localStorage.getItem('accessToken');
  const userDetails = jwtDecode(token); // Make sure token contains name & profileImageURL
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [reminderDate, setReminderDate] = useState('');

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
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const toggleReminderForm = () => {
    setReminderText('');
    setReminderDate('');
    setShowReminderForm(prev => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-9 md:grid-rows-9 lg:grid-cols-9 lg:grid-rows-9 gap-[1rem] h-screen p-[1rem]">

          {/* 1. UserGreetings (inlined)  bg-[#9e9b9b] */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 md:row-span-1 rounded-2xl px-[0.4rem] flex items-center animate-fade-in overflow-hidden h-full w-full">
            {/* Left (70%): Welcome Message + Quote */}
            <div className="w-[85%] flex flex-col justify-center h-full overflow-hidden">
              <p className="text-[#000] font-bold text-[1em] text-center">Greetings {userDetails.username}!</p>
              <marquee className="text-[#000] opacity-[0.5] font-semibold text-[1rem]" behavior="scroll" direction="left">
                {quote}
              </marquee>
            </div>

            {/* Right (30%): Profile Picture */}
            <div className="w-[15%] flex justify-end items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                <img
                  src={userDetails.profilePicture || '/default-profile.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>


          {/* 2. TimeCard In */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-1 rounded-2xl bg-[#c0e8bc] flex items-center justify-center">
            <span className="text-gray-800">Time In</span>
          </div>

          {/* 3. TimeCard Out */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-1 md:row-start-3 md:row-span-1 rounded-2xl bg-[#c3e4ee] flex items-center justify-center">
            <span className="text-gray-800">Time Out</span>
          </div>

          {/* 4. TimeCard Work */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 md:row-span-1 rounded-2xl bg-[#e1bec5] flex items-center justify-center">
            <span className="text-gray-800">Work Time</span>
          </div>

          {/* 5. TimeCard Break */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 md:row-start-3 md:row-span-1 rounded-2xl bg-[#deceb9] flex items-center justify-center">
            <span className="text-gray-800">Break Time</span>
          </div>

          {/* 6. Project Deadline */}
          <div className="col-span-2 md:col-span-5 lg:col-span-5 md:col-start-5 md:row-start-1 md:row-span-3 rounded-2xl bg-[#f2c3b9] flex items-center justify-center">
            <span className="text-gray-800">Project Deadlines</span>
          </div>

          {/* 7. Reminders */}
          <div className="col-span-2 md:col-span-5 lg:col-span-5 md:col-start-1 md:row-start-4 md:row-span-3 rounded-2xl bg-[#bfbff7] flex items-center justify-center">
            <span className="text-gray-800">Reminders</span>
          </div>

          {/* 8. Notifications */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 md:col-start-6 md:row-start-4 md:row-span-3 rounded-2xl bg-[#f6e0bf] flex items-center justify-center">
            <span className="text-gray-800">Notifications</span>
          </div>

          {/* 9. Work Break Stats */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 md:col-start-1 md:row-start-7 md:row-span-3 rounded-2xl bg-[#ddb3dd] flex items-center justify-center">
            <span className="text-gray-800">Work Break Stats</span>
          </div>

          {/* 10. Employees on Leave */}
          <div className="col-span-2 md:col-span-6 lg:col-span-6 md:col-start-4 md:row-start-7 md:row-span-3 rounded-2xl bg-[#adc0da] flex items-center justify-center">
            <span className="text-gray-800">Employees on Leave</span>
          </div>

        </div>
      </div>
    </div>
  );
};

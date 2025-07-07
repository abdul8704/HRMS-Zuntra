import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { jwtDecode } from 'jwt-decode';
import { UserGreetings } from '../components/dashboard/UserGreetings';
import { ProjectDeadline } from '../components/projectManagement/ProjectDeadline';
import { ReminderCard } from '../components/dashboard/ReminderCard';
import { NotificationCard } from '../components/dashboard/NotificationCard';
import { TimeCard } from '../components/dashboard/TimeCard';
import WorkBreakComposition from '../components/dashboard/WorkBreakComposititon';

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
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-9 md:grid-rows-9 lg:grid-cols-9 lg:grid-rows-9 gap-[1rem] h-screen p-[1rem]">

          {/* 1. UserGreetings */}
          <div className="h-[10vh] md:h-full col-span-2 md:col-span-4 md:row-span-1 rounded-2xl flex items-center overflow-hidden px-[0.3rem] animate-slide-in-left overflow-hidden">
            <UserGreetings name={userDetails.username} profileImageURL={userDetails.profilePicture} marqueeText={quote} />
          </div>

          {/* 2. TimeCard In */}
          <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:row-span-1 rounded-2xl bg-[#c0e8bc] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <TimeCard state={"in"} time={"09:20"} showLabel={true} color={true} />
          </div>

          {/* 3. TimeCard Out */}
          <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-1 md:row-start-3 md:row-span-1 rounded-2xl bg-[#c3e4ee] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <TimeCard state={"out"} time={"09:20"} showLabel={true} color={true} />
          </div>

          {/* 4. TimeCard Work */}
          <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-3 md:row-span-1 rounded-2xl bg-[#e1bec5] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <TimeCard state={"work"} time={"09:20"} showLabel={true} color={true} />
          </div>

          {/* 5. TimeCard Break */}
          <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-3 md:row-start-3 md:row-span-1 rounded-2xl bg-[#deceb9] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <TimeCard state={"break"} time={"09:20"} showLabel={true} color={true} />
          </div>

          {/* 6. Project Deadline */}
          <div className="h-[30vh] md:h-full col-span-2 md:col-span-5 md:col-start-5 md:row-start-1 md:row-span-3 rounded-2xl bg-[#f2c3b9] flex items-center justify-center animate-slide-in-right overflow-hidden">
            <ProjectDeadline />
          </div>

          {/* 7. Reminders */}
          <div className="h-[30vh] md:h-full col-span-2 md:col-span-5 md:col-start-1 md:row-start-4 md:row-span-3 rounded-2xl bg-[#bfbff7] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <ReminderCard />
          </div>

          {/* 8. Notifications */}
          <div className="h-[30vh] md:h-full col-span-2 md:col-span-4 md:col-start-6 md:row-start-4 md:row-span-3 rounded-2xl bg-[#f6e0bf] flex items-center justify-center animate-slide-in-right overflow-hidden">
            <NotificationCard />
          </div>

          {/* 9. Work Break Stats */}
          <div className="h-[30vh] md:h-full col-span-2 md:col-span-3 md:col-start-1 md:row-start-7 md:row-span-3 rounded-2xl bg-[#ddb3dd] flex items-center justify-center animate-slide-in-left overflow-hidden">
            <WorkBreakComposition />
          </div>

          {/* 10. Employees on Leave */}
          <div className="h-[30vh] md:h-full col-span-2 md:col-span-6 md:col-start-4 md:row-start-7 md:row-span-3 rounded-2xl bg-[#adc0da] flex items-center justify-center animate-slide-in-right overflow-hidden">
            <span className="text-gray-800">Employees on Leave</span>
          </div>
        </div>
      </div>

      {/* Enhanced Animation Styles */}
      <style>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-fill-mode: both;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-fill-mode: both;
        }

        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-in-left,
          .animate-slide-in-right {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .grid > div {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};
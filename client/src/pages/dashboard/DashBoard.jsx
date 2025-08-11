import React, { useState, useEffect } from 'react';
import { Sidebar } from "../../components/Sidebar";

import { UserGreetings } from "./components/UserGreetings";
import { TimeCard } from "./components/TimeCard";
import { ReminderCard } from "./components/ReminderCard";
import { NotificationCard } from "./components/NotificationCard";
import { WorkBreakComposition } from "./components/WorkBreakComposititon";
import { EmployeesOnLeave } from "./components/EmployeesOnLeave";
import { RemainderPopup } from "./components/RemainderPopup";
import { NotificationPopup } from './components/NotificationPopup';
import { ProjectDeadline } from "../project/components/ProjectDeadline";
import { PlusButton } from '../../components/PlusButton';
import { useAuth } from "../../context/AuthContext";
import api, { BASE_URL } from '../../api/axios';
import { getDateNDaysAgo } from '../../utils/dateUtils';
import { NewUser } from './NewUser';

export const DashBoard = () => {
  const { user, authDataLoading } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [workBreakData, setWorkBreakData] = useState({
    "this-week": [],
    "this-month": [],
  });

  const [calendarData, setCalendarData] = useState([])
  const [loginTime, setLoginTime] = useState('N/A');
  const [logoutTime, setLogoutTime] = useState('N/A');
  const [workTime, setWorkTime] = useState('N/A');
  const [breakTime, setBreakTime] = useState('N/A');

  const isNewUser = !user?.allowedAccess;

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
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  useEffect(() => {
    if (!user?.userid) return;

    const today = new Date().toISOString()
    console.log('user is ', user)
    try {
      const getTimeCards = async () => {
        const response = await api.get('api/employee/attendace/time-cards', {
          params: {
            userid: String(user.userid),
            date: new Date().toISOString()
          }
        })

        if(response.data.success){
          setLoginTime(response.data.timeCards.login)
          setLogoutTime(response.data.timeCards.logout)
          setWorkTime(response.data.timeCards.work)
          setBreakTime(response.data.timeCards.break)
        }
      }
      getTimeCards();
    } catch (error) {
      console.log(error)
    }

    const fetchWorkBreakData = async () => {
      setIsLoading(true);
      setApiMessage(null);
      try {
        const res = await api.get("/api/employee/attendance/work-break", {
          params: {
            todayDate: today,
            userid: user?.userid,
          }
        });
        console.log("Work Break Data:", res.data);
        setWorkBreakData(res.data.workBreakData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkBreakData();
  }, [authDataLoading]);

  const toggleReminderForm = () => {
    setReminderText('');
    setReminderDate('');
    setShowReminderForm(prev => !prev);
  };

  const isPlusButtonClicked = () => {
    setShowNotification(prev => !prev);
  };

  return (
    authDataLoading ? (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading dashboard...</p>
      </div>
    ) : isNewUser ? (
      <NewUser />
    ) : (
      <div className="flex h-screen">
        <Sidebar role="HR" />
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-9 md:grid-rows-9 gap-[1rem] h-screen p-[1rem]">
            {showNotification && <NotificationPopup setShowPopup={setShowNotification} />}

            <div className="h-[10vh] md:h-full col-span-2 md:col-span-4 md:row-span-1 rounded-2xl flex items-center overflow-hidden px-[0.3rem] animate-slide-in-left">
              <UserGreetings
                name={user?.username}
                profileImageURL={`${BASE_URL}/uploads/profilePictures/${user.userid}.png`}
                marqueeText={quote}
              />
            </div>

            <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:row-span-1 rounded-2xl bg-[#c0e8bc] flex items-center justify-center animate-slide-in-left">
              <TimeCard state="in" time={loginTime} showLabel={true} color={true} />
            </div>

            <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-1 md:row-start-3 rounded-2xl bg-[#c3e4ee] flex items-center justify-center animate-slide-in-left">
              <TimeCard state="out" time={logoutTime} showLabel={true} color={true} />
            </div>

            <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-3 md:row-span-1 rounded-2xl bg-[#e1bec5] flex items-center justify-center animate-slide-in-left">
              <TimeCard state="work" time={workTime} showLabel={true} color={true} />
            </div>

            <div className="h-[10vh] md:h-full col-span-1 md:col-span-2 md:col-start-3 md:row-start-3 rounded-2xl bg-[#deceb9] flex items-center justify-center animate-slide-in-left">
              <TimeCard state="break" time={breakTime} showLabel={true} color={true} />
            </div>

            <div className="h-[30vh] md:h-full col-span-2 md:col-span-5 md:col-start-5 md:row-start-1 md:row-span-3 rounded-2xl bg-[#f2c3b9] flex items-center justify-center animate-slide-in-right">
              <ProjectDeadline />
            </div>

            <div className="h-[30vh] md:h-full col-span-2 md:col-span-5 md:col-start-1 md:row-start-4 md:row-span-3 rounded-2xl bg-[#bfbff7] flex items-center justify-center animate-slide-in-left">
              <ReminderCard />
            </div>

            <div className="h-[30vh] md:h-full col-span-2 md:col-span-4 md:col-start-6 md:row-start-4 md:row-span-3 rounded-2xl bg-[#f6e0bf] flex items-center justify-center animate-slide-in-right">
              <NotificationCard onPlusClick={isPlusButtonClicked} />
            </div>

            <div className="h-[30vh] md:h-full col-span-2 md:col-span-3 md:col-start-1 md:row-start-7 md:row-span-3 rounded-2xl bg-[#ddb3dd] flex items-center justify-center animate-slide-in-left">
              <WorkBreakComposition data={workBreakData} />
            </div>

            <div className="h-[30vh] md:h-full col-span-2 md:col-span-6 md:col-start-4 md:row-start-7 md:row-span-3 rounded-2xl bg-[#adc0da] flex items-center justify-center animate-slide-in-right">
              <EmployeesOnLeave />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-30px) scale(0.95); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(30px) scale(0.95); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 0.6s ease forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-slide-in-left, .animate-slide-in-right {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
        `}</style>
      </div>
    )
  );
};

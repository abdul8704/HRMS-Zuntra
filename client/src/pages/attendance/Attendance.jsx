import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { TimeCard } from '../dashboard/components/TimeCard';
import { WorkBreakComposition } from '../dashboard/components/WorkBreakComposititon';
import { AttendanceCalendar } from './components/AttendanceCalendar';
import { AttendanceCard } from './components/AttendanceCard';
import { LeaveForm } from './components/LeaveForm';
import { ScheduleForm } from './components/ScheduleForm';
import { LeaveFormHistory } from './components/LeaveFormHistory';
import { DayInfoCard } from './components/DayInfoCard';
import { getFirstOfMonth, getEndOfDay } from "../../utils/dateUtils";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../utils/Loading";
import api from "../../api/axios";

export const Attendance = ({ showScheduleForm = false }) => {
    const { navId } = useParams();
    const { user, authDataLoading } = useAuth();
    const userid = user?.userid;

    // Calendar date range
    const [startDate, setStartDate] = useState(getFirstOfMonth(new Date()));  // set empty string here if any error. TODO: 
    const [endDate, setEndDate] = useState(getEndOfDay(new Date()));
    
    // Selected date state for DayInfoCard
    const [selectedDate, setSelectedDate] = useState(null);

    const [loginTime, setLoginTime] = useState('N/A');
    const [logoutTime, setLogoutTime] = useState('N/A');
    const [workTime, setWorkTime] = useState('N/A');
    const [breakTime, setBreakTime] = useState('N/A');
    const [workBreakData, setWorkBreakData] = useState({
        last7Days: [],
        last30Days: [],
    });

    const handleMonthYearChange = (year, month) => {
        const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
        const end = new Date(Date.UTC(year, month, 0, 23, 59, 59)).toISOString();
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        if (!userid) return;
        const today = new Date().toISOString();

        const getTimeCards = async () => {
            try {
                const response = await api.get('api/employee/attendace/time-cards', {
                    params: { userid: String(userid), date: today }
                });
                if (response.data.success) {
                    setLoginTime(response.data.timeCards.login);
                    setLogoutTime(response.data.timeCards.logout);
                    setWorkTime(response.data.timeCards.work);
                    setBreakTime(response.data.timeCards.break);
                }
            } catch (err) {
                console.error("Error fetching time cards:", err);
            }
        };

        const getWorkBreakData = async () => {
            try {
                const res = await api.get("/api/employee/attendance/work-break", {
                    params: { todayDate: today, userid }
                });
                setWorkBreakData(res.data.workBreakData);
            } catch (err) {
                console.error("Error fetching work/break data:", err);
            }
        };

        getTimeCards();
        getWorkBreakData();
    }, [userid]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log("Date clicked:", date);
    };

    const simulateDateClick = () => {
        const today = new Date();
        handleDateSelect(today);
    };

    useEffect(() => {
        if (navId === 'schedule') {
            simulateDateClick();
        }
    }, [navId]);

    return (
        (authDataLoading) ? 
            <Loading/>
        :
        <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col gap-4 flex-1 p-4 overflow-y-auto">
                <Navbar type="attendance" role="hr" />

                {/* 'me' tab */}
                {navId === 'me' && (
                    <>
                        {/* Desktop View */}
                        <div className="hidden md:grid flex-1 bg-white grid-cols-8 grid-rows-8 gap-[1rem] overflow-hidden">
                            <div className="row-start-1 col-start-1 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="in" time={loginTime} showLabel={false} color={true} />
                            </div>
                            <div className="row-start-2 col-start-1 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="out" time={logoutTime} showLabel={false} color={true} />
                            </div>
                            <div className="row-start-1 col-start-3 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="work" time={workTime} showLabel={false} color={true} />
                            </div>
                            <div className="row-start-2 col-start-3 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="break" time={breakTime} showLabel={false} color={true} />
                            </div>
                            <div className="row-start-1 col-start-5 col-span-4 row-span-3 rounded-lg overflow-hidden">
                                <WorkBreakComposition data={workBreakData} />
                            </div>
                            <div className="row-start-3 col-start-1 col-span-4 row-span-6 rounded-lg overflow-auto">
                                <AttendanceCalendar
                                    userid={userid}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onMonthYearChange={handleMonthYearChange}
                                />
                            </div>
                            <div className="row-start-4 col-start-5 col-span-4 row-span-5 rounded-lg overflow-auto">
                                <AttendanceCard data={{userid, startDate, endDate}} />
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="flex flex-col md:hidden gap-4 w-full px-2 pb-8">
                            <TimeCard state="in" time={loginTime} showLabel={false} color={true} />
                            <TimeCard state="out" time={logoutTime} showLabel={false} color={true} />
                            <TimeCard state="work" time={workTime} showLabel={false} color={true} />
                            <TimeCard state="break" time={breakTime} showLabel={false} color={true} />

                            <div className="w-full overflow-x-auto">
                                <div className="min-w-[500px] h-[250px]">
                                    <WorkBreakComposition data={workBreakData} />
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="w-full aspect-[4/3] md:min-w-[700px]">
                                    <AttendanceCalendar
                                        userid={userid}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onMonthYearChange={handleMonthYearChange}
                                    />
                                </div>
                            </div>

                            <div className="w-full overflow-auto">
                                <AttendanceCard userid={userid} />
                            </div>
                        </div>
                    </>
                )}

                {/* other tabs unchanged */}
                {navId === 'apply' && (
                    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden gap-[1rem]">
                        <LeaveFormHistory />
                        <LeaveForm />
                    </div>
                )}

                {navId === 'inbox' && (
                    <div className="flex-1 overflow-auto">
                        <LeaveFormHistory />
                    </div>
                )}

                {navId === 'schedule' && (
    <div className="flex flex-col gap-4 lg:flex-row w-full h-full overflow-hidden">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 h-full">
            <div className="w-full flex-1 min-h-0">
                <AttendanceCalendar disableFutureDates={false} onDateSelect={handleDateSelect} />
            </div>
        </div>
        <div
            className={`flex flex-col gap-4 w-full lg:w-1/2 h-full`}
        >
            <div
                className={`w-full ${showScheduleForm ? 'flex-1 min-h-0' : 'h-full'}`}
            >
                <DayInfoCard selectedDate={selectedDate} />
            </div>
            {showScheduleForm && (
                <div className="w-full flex-1 min-h-0">
                    <ScheduleForm />
                </div>
            )}
        </div>
    </div>
)}

            </div>
        </div>
    );
};

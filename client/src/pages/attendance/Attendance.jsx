import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { TimeCard } from '../dashboard/components/TimeCard';
import { WorkBreakComposition } from '../dashboard/components/WorkBreakComposititon';
import { Leaverecord } from "./components/Leaverecord";
import { AttendanceCalendar } from './components/AttendanceCalendar';
import { AttendanceCard } from './components/AttendanceCard';
import { LeaveForm } from './components/LeaveForm';
import { ScheduleForm } from './components/ScheduleForm';
import { SampleCard } from './components/SampleCard';
import { LeaveFormHistory } from './components/LeaveFormHistory';
import { useAuth } from "../../context/AuthContext";

export const Attendance = () => {
    const { navId } = useParams();
    const { user } = useAuth();
    const userid = user?.userid;

    // Calendar date range
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Receive updated month/year from AttendanceCalendar
    const handleMonthYearChange = (year, month) => {
        const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
        const end = new Date(Date.UTC(year, month, 0, 23, 59, 59)).toISOString();
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col gap-4 flex-1 p-4 overflow-y-auto">
                <Navbar type="attendance" role="hr" />

                {/* ----- 'me' tab ----- */}
                {navId === 'me' && (
                    <>
                        {/* Desktop View */}
                        <div className="hidden md:grid flex-1 bg-white grid-cols-8 grid-rows-8 gap-[1rem] overflow-hidden">
                            <div className="row-start-1 col-start-1 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="in" time="09:20" showLabel={false} color={true} />
                            </div>
                            <div className="row-start-2 col-start-1 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="out" time="09:20" showLabel={false} color={true} />
                            </div>
                            <div className="row-start-1 col-start-3 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="work" time="09:20" showLabel={false} color={true} />
                            </div>
                            <div className="row-start-2 col-start-3 col-span-2 row-span-1 rounded-lg">
                                <TimeCard state="break" time="09:20" showLabel={false} color={true} />
                            </div>
                            <div className="row-start-1 col-start-5 col-span-4 row-span-3 rounded-lg overflow-hidden">
                                <WorkBreakComposition />
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
                                <AttendanceCard userid={userid} />
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="flex flex-col md:hidden gap-4 w-full px-2 pb-8">
                            <TimeCard state="in" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="out" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="work" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="break" time="09:20" showLabel={false} color={true} />

                            <div className="w-full overflow-x-auto">
                                <div className="min-w-[500px] h-[250px]">
                                    <WorkBreakComposition />
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

                {/* 'apply' tab */}
                {navId === 'apply' && (
                    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden gap-[1rem]">
                        <LeaveFormHistory />
                        <LeaveForm />
                    </div>
                )}

                {/* 'inbox' tab */}
                {navId === 'inbox' && (
                    <div className="flex-1 overflow-auto">
                        <LeaveFormHistory />
                    </div>
                )}

                {/* 'schedule' tab */}
                {navId === 'schedule' && (
                    <div className="flex flex-col gap-4 lg:flex-row w-full h-full overflow-auto">
                        <div className="flex flex-col gap-4 w-full lg:w-1/2">
                            <div className="w-full h-[400px] lg:h-[500px]">
                                <AttendanceCalendar disableFutureDates={false} />
                            </div>
                            <div className="w-full overflow-auto">
                                <Leaverecord />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
                            <div className="w-full overflow-auto">
                                <SampleCard />
                            </div>
                            <div className="w-full overflow-auto">
                                <ScheduleForm />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

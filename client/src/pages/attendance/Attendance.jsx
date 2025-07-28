import React from 'react';
import { useParams } from 'react-router-dom';

import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { TimeCard } from '../dashboard/components/TimeCard';
import { WorkBreakComposition } from '../dashboard/components/WorkBreakComposititon';

import { AttendanceCalendar } from './components/AttendanceCalendar';
import { AttendanceCard } from './components/AttendanceCard';
import { LeaveForm } from './components/LeaveForm';
import { ScheduleForm } from './components/ScheduleForm';
import { SampleCard } from './components/samplecard';
import LeaveFormHistory from './components/LeaveFormHistory';

export const Attendance = () => {
    const { navId } = useParams();

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col gap-4 flex-1 p-4 overflow-y-auto">
                <Navbar type="attendance" role="hr" />

                {/* ----- 'me' tab ----- */}
                {navId === 'me' && (
                    <>
                        {/* Desktop/Laptop View (md and up) */}
                        <div className="hidden md:grid flex-1 bg-[#FFFFFF] grid-cols-8 grid-rows-8 gap-[1rem] overflow-hidden">
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
                            <div className="row-start-1 col-start-5 col-span-4 row-span-3 rounded-lg">
                                <WorkBreakComposition />
                            </div>
                            <div className="row-start-3 col-start-1 col-span-4 row-span-6 rounded-lg">
                                <AttendanceCalendar />
                            </div>
                            <div className="row-start-4 col-start-5 col-span-4 row-span-5 rounded-lg">
                                <AttendanceCard />
                            </div>
                        </div>

                        {/* Mobile View (below md) */}
                        <div className="grid md:hidden gap-4">
                            <TimeCard state="in" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="out" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="work" time="09:20" showLabel={false} color={true} />
                            <TimeCard state="break" time="09:20" showLabel={false} color={true} />
                            <WorkBreakComposition />
                            <AttendanceCalendar />
                            <AttendanceCard />
                        </div>
                    </>
                )}

                {/* ----- 'apply' tab ----- */}
                {navId === 'apply' && (
                    <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-auto">
                        <div className="w-full lg:w-1/2">
                            <AttendanceCard />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-4">
                            <div className="flex-1 overflow-hidden">
                                <LeaveFormHistory />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <LeaveForm />
                            </div>
                        </div>
                    </div>
                )}

                {/* ----- 'schedule' tab ----- */}
                {navId === 'schedule' && (
                    <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-auto">
                        <div className="w-full lg:w-1/2">
                            <AttendanceCalendar />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-4">
                            <div className="w-full">
                                <SampleCard />
                            </div>
                            <div className="w-full">
                                <ScheduleForm />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

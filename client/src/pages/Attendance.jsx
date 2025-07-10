import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { TimeCard } from '../components/dashboard/TimeCard'
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar'
import { WorkBreakComposition } from '../components/dashboard/WorkBreakComposititon'
import { AttendanceCard } from '../components/attendance/AttendanceCard'
export const Attendance = () => {
    return (
        <>
            <div className="flex w-screen h-screen">
                <Sidebar />
                <div className="flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen">
                    <Navbar type="attendance" role="hr" />
                    <div className="flex-1 bg-[#FFFFFF] grid grid-cols-8 grid-rows-8 gap-[1rem] overflow-hidden">
                        {/* Time Card IN */}
                        <div className="row-start-1 col-start-1 col-span-2 row-span-1 rounded-lg">
                            <TimeCard state="in" time="09:20" showLabel={false} color={true} />
                        </div>
                        {/* Time Card Out */}
                        <div className="row-start-2 col-start-1 col-span-2 row-span-1 rounded-lg">
                            <TimeCard state="out" time="09:20" showLabel={false} color={true} />
                        </div>
                        {/* Time Card Work */}
                        <div className="row-start-1 col-start-3 col-span-2 row-span-1 rounded-lg">
                            <TimeCard state="work" time="09:20" showLabel={false} color={true} />
                        </div>
                        {/* Time Card Break */}
                        <div className="row-start-2 col-start-3 col-span-2 row-span-1 rounded-lg">
                            <TimeCard state="break" time="09:20" showLabel={false} color={true} />
                        </div>
                        {/* chart */}
                        <div className="row-start-1 col-start-5 col-span-4 row-span-3 rounded-lg">
                            <WorkBreakComposition />
                        </div>
                        {/* calendar */}
                        <div className="row-start-3 col-start-1 col-span-4 row-span-6 rounded-lg">
                            <AttendanceCalendar />
                        </div>
                        {/* attendance log */}
                        <div className="row-start-4 col-start-5 col-span-4 row-span-5 rounded-lg">
                            <AttendanceCard />
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

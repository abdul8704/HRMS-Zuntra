import React from "react";
import ProfileSidebar from "../components/employeeManagement/EmpSideBar";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendanceCard from "../components/attendance/AttendanceCard";
import InTime from "../components/attendance/InTime";
import OutTime from "../components/attendance/OutTime";
import WorkTime from "../components/attendance/WorkTime";
import ProgressCard from "../components/attendance/ProgressCard";
import TabNavigationCard from "../components/attendance/TabNavigationCard";

export const HrEmployeeDetail = () => {
    return (
        <div>
            <ProfileSidebar />
            <div className="attendance-container">
                <TabNavigationCard />
                <AttendanceCalendar />
                <AttendanceCard />
                <InTime />
                <OutTime />
                <WorkTime />
                <ProgressCard />
            </div>
        </div>

        
    );
};

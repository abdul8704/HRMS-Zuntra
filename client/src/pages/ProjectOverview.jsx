import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import HRManagement from '../components/HRmanagement';
import PercentageStatus from '../components/PercentageStatus';
import ReviewMeeting from '../components/ReviewMeeting';
import ProgressStatus from '../components/ProgressStatus';
import TeamDetails from '../components/TeamDetails';


export const ProjectOverview = () => {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <div className="flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen">
                <Navbar type="employeeManagement" />

                <div className="flex-1 bg-[#FFFFFF] grid grid-cols-8 grid-rows-8 gap-[1rem] overflow-hidden">
                    {/* 1. HR Management */}
                    <div className="col-span-5 row-span-3">
                        <HRManagement />
                    </div>

                    {/* 2. Percentage */}
                    <div className="row-start-1 row-end-3 col-start-6 col-end-10">
                        <PercentageStatus />
                    </div>



                    {/* 3. Project Deadline */}
                    <div className="row-start-3 row-end-4 col-start-6 col-end-10 bg-[#F6E0BF] rounded-xl flex p-4 gap-[1rem] items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 40 40">
                                <path
                                    fill="#000"
                                    fillRule="evenodd"
                                    d="M21.55 5.396V0h-3.531v5.396h1.765c-4.448 0-8.713 1.8-11.859 5.004-3.145 3.204-4.912 7.55-4.912 12.082 0 4.531 1.767 8.877 4.912 12.081 3.145 3.205 7.411 5.005 11.859 5.005s8.713-1.8 11.858-5.005c3.146-3.204 4.912-7.55 4.912-12.081 0-4.532-1.766-8.878-4.912-12.082-3.145-3.204-7.41-5.004-11.858-5.004h1.765ZM2.495 11.164 10.44 3.07 7.944.527 0 8.62l2.496 2.544ZM29.128 3.07l7.944 8.094 2.496-2.544L31.624.527 29.128 3.07Zm-11.11 9.52v10.79h7.945v-3.597h-4.414V12.59h-3.53Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-start">
                            <div className="text-sm font-medium">Project Deadline: 20-10-2010</div>
                            <div className="text-xs text-gray-700">10 Days Left to meet the deadline</div>
                        </div>
                    </div>

                    {/* 4. Review Meeting */}
                    <div className="row-start-4 row-end-7 col-start-6 col-end-10">
                        <ReviewMeeting />
                    </div>


                    {/* 5. Progress */}
                    <div className="row-start-7 row-end-9 col-start-6 col-end-10">

                        <ProgressStatus />
                    </div>

                    {/* 6. Team Details */}
                    <div className="row-start-4 row-end-9 col-start-1 col-end-6">
                        <TeamDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

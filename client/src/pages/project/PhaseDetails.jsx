import React from 'react';

// Layout Components
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

// HR Dashboard Components
import HRManagement from '../../components/HRmanagement';
import PercentageStatus from '../../components/PercentageStatus';
import { ReviewMeeting } from '../../components/ReviewMeeting';
import ProgressStatus from '../../components/ProgressStatus';
import TeamDetails from '../../components/TeamDetails';
import { useParams } from 'react-router-dom';
import { Progress } from './Progress'
import { ToDo } from './ToDo'
import { Review } from './Review'
import { Completed } from './Completed';

export const PhaseDetails = () => {
    const {projectId, phasenavId} = useParams();
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <div className="flex gap-4 flex-col flex-1 p-4 h-screen overflow-hidden">
                <Navbar type={"phaseDetails"} />
                
                <div className="flex-1 bg-[#FFFFFF] overflow-auto">

                    {phasenavId === "overview" && (
                        <>

                            {/* Mobile Layout - Single Column */}
                            <div className="block lg:hidden space-y-4">
                                {/* HR Management */}
                                <div className="w-full">
                                    <HRManagement />
                                </div>
                                
                                {/* Percentage Status */}
                                <div className="w-full">
                                    <PercentageStatus />
                                </div>
                                
                                {/* Project Deadline */}
                                <div className="w-full bg-[#F6E0BF] rounded-xl flex p-4 gap-4 items-center">
                                    <div className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 40 40">
                                            <path
                                                fill="#000"
                                                fillRule="evenodd"
                                                d="M21.55 5.396V0h-3.531v5.396h1.765c-4.448 0-8.713 1.8-11.859 5.004-3.145 3.204-4.912 7.55-4.912 12.082 0 4.531 1.767 8.877 4.912 12.081 3.145 3.205 7.411 5.005 11.859 5.005s8.713-1.8 11.858-5.005c3.146-3.204 4.912-7.55 4.912-12.081 0-4.532-1.766-8.878-4.912-12.082-3.145-3.204-7.41-5.004-11.858-5.004h1.765ZM2.495 11.164 10.44 3.07 7.944.527 0 8.62l2.496 2.544ZM29.128 3.07l7.944 8.094 2.496-2.544L31.624.527 29.128 3.07Zm-11.11 9.52v10.79h7.945v-3.597h-4.414V12.59h-3.53Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center items-start min-w-0">
                                        <div className="text-sm font-medium truncate w-full">Project Deadline: 20-10-2010</div>
                                        <div className="text-xs text-gray-700 truncate w-full">10 Days Left to meet the deadline</div>
                                    </div>
                                </div>
                                
                                
                                {/* Progress Status */}
                                <div className="w-full">
                                    <ProgressStatus />
                                </div>
                                
                                {/* Team Details */}
                                <div className="w-full">
                                    <TeamDetails />
                                </div>
                            </div>
                            
                            {/* Tablet Layout - 2 Column Grid */}
                            <div className="hidden lg:block xl:hidden">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        {/* HR Management */}
                                        <div className="h-80">
                                            <HRManagement />
                                        </div>
                                        
                                        {/* Project Deadline */}
                                        <div className="bg-[#F6E0BF] rounded-xl flex p-4 gap-4 items-center">
                                            <div className="flex-shrink-0">
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
                                        
                                        {/* Team Details */}
                                        <div className="flex-1">
                                            <TeamDetails />
                                        </div>
                                    </div>
                                    
                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        {/* Percentage Status */}
                                        <div className="h-48">
                                            <PercentageStatus />
                                        </div>
                                        
                                        {/* Review Meeting */}
                                        <div className="h-80 rounded-lg overflow-hidden">
                                            <ReviewMeeting />
                                        </div>
                                        
                                        {/* Progress Status */}
                                        <div className="flex-1">
                                            <ProgressStatus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Desktop Layout - Original Grid (Improved) */}
                            <div className="hidden xl:block h-full">
                                <div className="grid grid-cols-8 grid-rows-8 gap-4 h-full">
                                    {/* HR Management */}
                                    <div className="col-span-5 row-span-3">
                                        <HRManagement />
                                    </div>
                                    
                                    {/* Percentage Status */}
                                    <div className="row-start-1 row-end-3 col-start-6 col-end-9">
                                        <PercentageStatus />
                                    </div>
                                    
                                    {/* Project Deadline */}
                                    <div className="row-start-3 row-end-4 col-start-6 col-end-9 bg-[#F6E0BF] rounded-xl flex p-4 gap-4 items-center">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 40 40">
                                                <path
                                                    fill="#000"
                                                    fillRule="evenodd"
                                                    d="M21.55 5.396V0h-3.531v5.396h1.765c-4.448 0-8.713 1.8-11.859 5.004-3.145 3.204-4.912 7.55-4.912 12.082 0 4.531 1.767 8.877 4.912 12.081 3.145 3.205 7.411 5.005 11.859 5.005s8.713-1.8 11.858-5.005c3.146-3.204 4.912-7.55 4.912-12.081 0-4.532-1.766-8.878-4.912-12.082-3.145-3.204-7.41-5.004-11.858-5.004h1.765ZM2.495 11.164 10.44 3.07 7.944.527 0 8.62l2.496 2.544ZM29.128 3.07l7.944 8.094 2.496-2.544L31.624.527 29.128 3.07Zm-11.11 9.52v10.79h7.945v-3.597h-4.414V12.59h-3.53Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center items-start min-w-0">
                                            <div className="text-sm font-medium">Project Deadline: 20-10-2010</div>
                                            <div className="text-xs text-gray-700">10 Days Left to meet the deadline</div>
                                        </div>
                                    </div>
                                    
                                    {/* Review Meeting */}
                                    <div className="row-start-4 row-end-7 col-start-6 col-end-9 rounded-lg overflow-hidden">
                                        <ReviewMeeting />
                                    </div>
                                    
                                    {/* Progress Status */}
                                    <div className="row-start-7 row-end-9 col-start-6 col-end-9">
                                        <ProgressStatus />
                                    </div>
                                    
                                    {/* Team Details */}
                                    <div className="row-start-4 row-end-9 col-start-1 col-end-6">
                                        <TeamDetails />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {phasenavId === "progress" && (
                        <Progress />
                    )}
                    {phasenavId === "todo" && (
                        <ToDo />
                    )}
                    {phasenavId === "review" && (
                        <Review />
                    )}
                    {phasenavId === "completed" && (
                        <Completed />
                    )}
                </div>
            </div>
        </div>
    );
};
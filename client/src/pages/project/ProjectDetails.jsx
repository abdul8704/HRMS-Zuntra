import React from "react";

// Layout Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";

// HR Dashboard Components
import HRManagement from "../../components/HRmanagement";
import PercentageStatus from "../../components/PercentageStatus";
import { ReviewMeeting } from "../../components/ReviewMeeting";
import ProgressStatus from "../../components/ProgressStatus";
import TeamDetails from "../../components/TeamDetails";
import { useParams } from "react-router-dom";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProjectDetails = () => {
  const { projectId, navId } = useParams();
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex gap-4 flex-col flex-1 p-4 h-screen overflow-hidden">
        <Navbar type={"projectDetails"} />

        <div className="flex-1 bg-[#FFFFFF] overflow-y-auto">
          {navId === "overview" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-8 xl:grid-rows-8 h-full">
              {/* HR Management */}
              <div className=" xl:col-start-1 xl:col-end-6 xl:row-start-1 xl:row-end-9  ">
                <HRManagement />
              </div>

              {/* Percentage Status */}
              <div className="xl:col-start-6 xl:col-end-9 xl:row-start-1 xl:row-end-3">
                <div className="bg-green-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Budget Status
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">
                            Estimated Budget
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            $250,000
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Budget Spent</p>
                          <p className="text-lg font-semibold text-red-600">
                            $175,000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-20 h-20">
                        <CircularProgressbarWithChildren
                          value={70}
                          styles={buildStyles({
                            pathColor: "#ef4444",
                            trailColor: "#f3f4f6",
                            pathTransitionDuration: 0.5,
                          })}
                        >
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">
                              70%
                            </div>
                            <div className="text-xs text-gray-600">Used</div>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Deadline */}
              <div
                className=" bg-[#F6E0BF] rounded-xl flex p-4 gap-4 items-center 
                    xl:col-start-6 xl:col-end-9 xl:row-start-3 xl:row-end-4"
              >
                <div className="flex-shrink-0">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    viewBox="0 0 40 40"
                  >
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M21.55 5.396V0h-3.531v5.396h1.765c-4.448 0-8.713 1.8-11.859 5.004-3.145 3.204-4.912 7.55-4.912 12.082 0 4.531 1.767 8.877 4.912 12.081 3.145 3.205 7.411 5.005 11.859 5.005s8.713-1.8 11.858-5.005c3.146-3.204 4.912-7.55 4.912-12.081 0-4.532-1.766-8.878-4.912-12.082-3.145-3.204-7.41-5.004-11.858-5.004h1.765ZM2.495 11.164 10.44 3.07 7.944.527 0 8.62l2.496 2.544ZM29.128 3.07l7.944 8.094 2.496-2.544L31.624.527 29.128 3.07Zm-11.11 9.52v10.79h7.945v-3.597h-4.414V12.59h-3.53Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start min-w-0">
                  <div className="text-sm font-medium truncate w-full">
                    Project Deadline: 20-10-2010
                  </div>
                  <div className="text-xs text-gray-700 truncate w-full">
                    10 Days Left to meet the deadline
                  </div>
                </div>
              </div>

              {/* Progress Status */}
              <div className="xl:row-start-4 xl:row-end-9 xl:col-start-6 xl:col-end-9">
                <ProgressStatus />
              </div>
            </div>
          )}

          {navId === "upcoming" && <div>Upcoming Phase Card</div>}
          {navId === "completed" && <div>Completed Phase Card</div>}
        </div>
      </div>
    </div>
  );
};

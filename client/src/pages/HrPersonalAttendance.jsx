import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { useParams } from 'react-router-dom';
import { LeaveForm } from '../components/attendance/LeaveForm';

export const HrPersonalAttendance = () => {

  return (
    <>
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow flex justify-center items-center">
          <LeaveForm />
        </div>
      </div>
    </>
  );
};

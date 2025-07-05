import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { LeaveForm } from '../components/attendance/LeaveForm';

export const HrPersonalAttendance = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="website-container flex min-h-screen relative">
      <Sidebar />

      <div className="website-module flex-grow flex justify-center items-center relative">
        {/* Floating Plus Button */}
        <button
  className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-md transition-all duration-300 flex items-center justify-center z-50"
  style={{
    backgroundColor: '#BBD3CC',   // Custom background
    color: 'rgba(0, 0, 0, 0.5)',  // Black with 50% opacity
    fontSize: '2.2rem',
    fontWeight: 'bold',
  }}
  onClick={() => setShowPopup(true)}
>
  +
</button>


        {/* Popup Overlay */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
              {/* LeaveForm Component */}
              <LeaveForm
  name="Anu"
  religion="Hindu"
  role="HR Manager"
/>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

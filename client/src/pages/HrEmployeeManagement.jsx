import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { EmpNavbar } from '../components/employeeManagement/EmpNavbar';
import { EmpCard } from '../components/employeeManagement/EmpCard';
import { EmployeeCard } from '../components/employeeManagement/EmployeeCard';
import { EmpRoleCard } from '../components/employeeManagement/EmpRoleCard';
import { AddRolePopup } from '../components/employeeManagement/AddRolePopup';
import { useParams } from 'react-router-dom';
import { GeoFencing } from '../components/employeeManagement/GeoFencing';
import { EmpAssignmentPopUp } from '../components/employeeManagement/EmpAssignmentPopUp';
import { AddLocationForm } from '../components/employeeManagement/AddLocationForm'

export const HrEmployeeManagement = () => {
  const { navId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);

  const bgClasses = ['#FBEDEA', '#D7B5EB', '#D2EFEA', '#ECECFD'];

  const employees = [
    { name: "John Joseph aesctra srs terab aevy 4WTVtac  gestv 4wteeSVtr vging yt frytygincd frfdvbboyfr8d rdv56uurvibr rvub5oifdg ", email: "john@zuntra.com", phone: "+91 1234567890", date: "10-06-2025", image: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Nisha Mehra", email: "nisha@zuntra.com", phone: "+91 9123456780", date: "12-06-2025", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Ishita T", email: "ishita.t@zuntra.com", phone: "+91 9080706050", date: "10-06-2025", image: "https://randomuser.me/api/portraits/women/21.jpg" },
    { name: "Ravi Kumar", email: "ravi.kumar@zuntra.com", phone: "+91 8899776655", date: "13-06-2025", image: "https://randomuser.me/api/portraits/men/30.jpg" },
    { name: "Sneha Reddy", email: "sneha.r@zuntra.com", phone: "+91 7776665554", date: "14-06-2025", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Karan J", email: "karan.j@zuntra.com", phone: "+91 9871234560", date: "06-06-2025", image: "https://randomuser.me/api/portraits/men/54.jpg" },
    { name: "Ananya D", email: "ananya.d@zuntra.com", phone: "+91 9988123456", date: "07-06-2025", image: "https://randomuser.me/api/portraits/women/90.jpg" },
    { name: "Siddharth P", email: "sid.p@zuntra.com", phone: "+91 9612347850", date: "15-06-2025", image: "https://randomuser.me/api/portraits/men/39.jpg" },
    { name: "Meera V", email: "meera.v@zuntra.com", phone: "+91 9765432100", date: "16-06-2025", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Rajeev S", email: "rajeev.s@zuntra.com", phone: "+91 8123456789", date: "17-06-2025", image: "https://randomuser.me/api/portraits/men/47.jpg" },
    { name: "Harsha K", email: "harsha.k@zuntra.com", phone: "+91 9345678901", date: "18-06-2025", image: "https://randomuser.me/api/portraits/women/50.jpg" },
    { name: "Avinash T", email: "avinash.t@zuntra.com", phone: "+91 7890654321", date: "19-06-2025", image: "https://randomuser.me/api/portraits/men/15.jpg" },
  ];

  const getGridBgColors = (itemsLength, columns, colors) => {
    const gridColors = [];
    for (let i = 0; i < itemsLength; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const color = colors[(col + row) % colors.length];
      gridColors.push(color);
    }
    return gridColors;
  };

  const columns = 3;
  const bgColorList = getGridBgColors(employees.length, columns, bgClasses);

  const locations = [
    {
      branchName: "Chennai",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15407206.952485017!2d71.69291105639869!3d19.476030190244764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f719a5b4053%3A0x8f063ff3a60953f4!2sYaa%20Mohideen%20Restaurant!5e0!3m2!1sen!2sin!4v1750843407815!5m2!1sen!2sin"
    },
    {
      branchName: "Bangalore",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15407206.952485017!2d71.69291105639869!3d19.476030190244764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f719a5b4053%3A0x8f063ff3a60953f4!2sYaa%20Mohideen%20Restaurant!5e0!3m2!1sen!2sin!4v1750843407815!5m2!1sen!2sin"
    },
    {
      branchName: "Hyderabad",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15407206.952485017!2d71.69291105639869!3d19.476030190244764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f719a5b4053%3A0x8f063ff3a60953f4!2sYaa%20Mohideen%20Restaurant!5e0!3m2!1sen!2sin!4v1750843407815!5m2!1sen!2sin"
    },
    {
      branchName: "Coimbatore",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15407206.952485017!2d71.69291105639869!3d19.476030190244764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f719a5b4053%3A0x8f063ff3a60953f4!2sYaa%20Mohideen%20Restaurant!5e0!3m2!1sen!2sin!4v1750843407815!5m2!1sen!2sin"
    },
    {
      branchName: "Trichy",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15407206.952485017!2d71.69291105639869!3d19.476030190244764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f719a5b4053%3A0x8f063ff3a60953f4!2sYaa%20Mohideen%20Restaurant!5e0!3m2!1sen!2sin!4v1750843407815!5m2!1sen!2sin"
    }
  ];


  const roleData = [
    { role: "HR Manager", memberCount: 1, bgColor: "#ffe0dc", ibgcolor: "#f44336" },
    { role: "Executive Manager", memberCount: 2, bgColor: "#d6e9f8", ibgcolor: "#3f51b5" },
    { role: "UI/UX Designer", memberCount: 2, bgColor: "#ffe0dc", ibgcolor: "#f44336" },
    { role: "App Developer", memberCount: 2, bgColor: "#ccfbf1", ibgcolor: "#00acc1" },
    { role: "Web Developer", memberCount: 2, bgColor: "#fbcfe8", ibgcolor: "#e91e63" },
    { role: "Data Scientist", memberCount: 1, bgColor: "#f3e8ff", ibgcolor: "#9c27b0" },
    { role: "DevOps Engineer", memberCount: 2, bgColor: "#c084fc", ibgcolor: "#6200ea" },
    { role: "Marketing", memberCount: 3, bgColor: "#ede9fe", ibgcolor: "#8e24aa" },
    { role: "Content Writer", memberCount: 2, bgColor: "#d9f99d", ibgcolor: "#558b2f" },
  ];

  const handleApprove = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignPopup(true);
  };

  const handleSaveAssignment = (data) => {
    console.log("Saved assignment:", data);
    setShowAssignPopup(false);
    setSelectedEmployee(null);
  };

  const handleClosePopup = () => {
    setShowAssignPopup(false);
    setSelectedEmployee(null);
  };


  return (
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <EmpNavbar />

        {navId === "all" && (
  <div className="employee-card-wrapper">
    {employees.map((emp, index) => (
      <EmployeeCard
  key={index}
  name={emp.name}
  email={emp.email}
  phone={emp.phone}
  image={emp.image}
  role="UI/UX Designer"
  inTime="09:02"
  outTime="16:55"
  workTime="09:02"
  breakTime="16:55"
  bgColor={bgColorList[index]} // 👈 use dynamic background
/>

    ))}
  </div>
)}
 
          <div className="emp-cards-container">
            <EmployeeCard />
          </div>
        )}

        {navId === "roles" && (
          <div className="emp-cards-container">
            {roleData.map((role, idx) => (
              <EmpRoleCard
                key={idx}
                role={role.role}
                memberCount={role.memberCount}
                bgColor={role.bgColor}
                ibgcolor={role.ibgcolor}
              />
            ))}
            <div className="plus-button" onClick={() => setShowPopup(true)}>
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span>
            </div>
          </div>
        )}

        {showPopup && <AddRolePopup onClose={() => setShowPopup(false)} />}

        {navId === "geofencing" && (
          <div className="geo-cards-container">
            {locations.map((loc, index) => (
              <GeoFencing key={index} embedUrl={loc.embedUrl} branchName={loc.branchName} />
            ))}
            <button className="plus-button" onClick={() => setShowLocationForm(true)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></button>
          </div>
        )}

        {showLocationForm && (
          <AddLocationForm
            isOpen={showLocationForm}
            onClose={() => setShowLocationForm(false)}
            onSubmit={(formData) => {
              console.log('Submitted:', formData);
              // Handle submitted data here
            }}
          />
        )}

        {navId === "newusers" && (
          <div className="emp-cards-container">
            {employees.map((emp, index) => (
              <EmpCard
                key={index}
                name={emp.name}
                email={emp.email}
                phone={emp.phone}
                date={emp.date}
                image={emp.image}
                color={bgColorList[index]}
                onApprove={() => handleApprove(emp)}
              />
            ))}
          </div>
        )}
      </div>

      {showPopup && <AddRolePopup onClose={() => setShowPopup(false)} />}

      {showAssignPopup && selectedEmployee && (
        <div className="popup-overlay">
          <EmpAssignmentPopUp
            employee={selectedEmployee}
            isOpen={true}
            onClose={handleClosePopup}
            onSave={handleSaveAssignment}
          />
        </div>
      )}

      <style>{`
        .emp-cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 100%;
          align-items: stretch;
          margin-top: 1.5rem;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .geo-cards-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 100%;
          align-items: stretch;
          margin-top: 1.5rem;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .emp-cards-container > * {
          flex: 1 1 100%;
          max-width: 100%;
        }

        @media (min-width: 48rem) {
          .emp-cards-container > * {
            flex: 1 1 calc(50% - 1rem);
            max-width: calc(50% - 1rem);
          }
        }

        @media (min-width: 64rem) {
          .emp-cards-container > * {
            flex: 1 1 calc(33.333% - 1rem);
            max-width: calc(33.333% - 1rem);
          }
        }

        .plus-button {
          position: fixed;
          bottom: 2rem;
          right: 5rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: #BBD3CC;
          color: #6c6c6c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s ease;
          z-index: 1000;
        }

        .plus-button:hover {
          transform: scale(1.1);
          background-color: #cbd5e1;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }
      `}</style>
    </div>
  );
};

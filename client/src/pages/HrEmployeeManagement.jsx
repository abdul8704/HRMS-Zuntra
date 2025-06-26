import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { EmpNavbar } from '../components/employeeManagement/EmpNavbar';
import { EmpCard } from '../components/employeeManagement/EmpCard';
import { EmployeeCard } from '../components/employeeManagement/EmployeeCard';
import { EmpRoleCard } from '../components/employeeManagement/EmpRoleCard';
import { AddRolePopup } from '../components/employeeManagement/AddRolePopup';
import { EditRolePopup } from '../components/employeeManagement/EditRolePopup';
import { useParams } from 'react-router-dom';
import { GeoFencing } from '../components/employeeManagement/GeoFencing';
import { EmpAssignmentPopUp } from '../components/employeeManagement/EmpAssignmentPopUp';
import { AddLocationForm } from '../components/employeeManagement/AddLocationForm';

export const HrEmployeeManagement = () => {
  const { navId } = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);

  const handleEditRole = (roleData) => {
    setEditRoleData(roleData);
  };

  const handleSaveEditedRole = (newData) => {
    console.log("Updated Role:", newData);
    setEditRoleData(null);
  };

  const handleCloseEdit = () => {
    setEditRoleData(null);
  };

  const bgClasses = ['#FBEDEA', '#D7B5EB', '#D2EFEA', '#ECECFD'];

  const employees = [
    { name: "John Joseph", email: "john@zuntra.com", phone: "+91 1234567890", date: "10-06-2025", image: "https://randomuser.me/api/portraits/men/75.jpg" },
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
     { name: "John Joseph", email: "john@zuntra.com", phone: "+91 1234567890", date: "10-06-2025", image: "https://randomuser.me/api/portraits/men/75.jpg" },
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
      branchName: "Perungudi",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2300795125925!2d80.24268317484109!3d12.957124087356895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d2313e5fa83%3A0x86751fde2142c085!2sZuntra%20Digital%20Private%20Limited!5e0!3m2!1sen!2sin!4v1750855923184!5m2!1sen!2sin"
    },
    {
      branchName: "Selaiyur",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.7668226528!2d79.99512631640623!3d12.922244400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6ed2136c9f%3A0x195a3558e9f5f39b!2sZUDIO%20-%20Selaiyur%2C%20Chennai!5e0!3m2!1sen!2sin!4v1750856070265!5m2!1sen!2sin"
    },
    {
      branchName: "Kodambakkam",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124374.89066981588!2d80.08488851640625!3d13.053783100000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52676cb6734ecb%3A0x29afa95d29fddde!2sZUDIO%20-%20Kodambakkam%2C%20Chennai!5e0!3m2!1sen!2sin!4v1750856107276!5m2!1sen!2sin"
    },
    {
      branchName: "Adyar",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124403.6466499826!2d80.11916441640622!3d12.996525300000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700208c639b%3A0xe27864459a616099!2sZUDIO!5e0!3m2!1sen!2sin!4v1750856305753!5m2!1sen!2sin"
    },
    {
      branchName: "Avadi",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124344.53302174553!2d79.96295661640626!3d13.113963500000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526369c5679e39%3A0xf15ed76fbd823a9c!2sZUDIO%20-%20Avadi%2C%20Chennai!5e0!3m2!1sen!2sin!4v1750856241763!5m2!1sen!2sin"
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
                bgColor={bgColorList[index]}
              />
            ))}
          </div>
        )}

        {navId === "roles" && (
  <div className="role-scroll-wrapper">
    <div className="emp-cards-container">
      {roleData.map((role, idx) => (
        <EmpRoleCard
          key={idx}
          role={role.role}
          memberCount={role.memberCount}
          bgColor={role.bgColor}
          ibgcolor={role.ibgcolor}
          onEdit={() =>
            handleEditRole({
              role: role.role,
              members: role.memberCount,
              color: role.bgColor,
            })
          }
        />
      ))}
      <div className="plus-button" onClick={() => setShowPopup(true)}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </span>
      </div>
    </div>
  </div>
)}

        {navId === "geofencing" && (
          <div className="geo-cards-container">
            {locations.map((loc, index) => (
              <GeoFencing key={index} embedUrl={loc.embedUrl} branchName={loc.branchName} />
            ))}
            <button className="plus-button" onClick={() => setShowLocationForm(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
          </div>
        )}

        {navId === "newusers" && (
  <div className="newusers-scroll-wrapper">
    <div className="newusers-container">
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

      {editRoleData && (
        <div className="popup-overlay">
          <EditRolePopup
            role={editRoleData.role}
            members={editRoleData.members}
            color={editRoleData.color}
            onClose={handleCloseEdit}
            onSave={handleSaveEditedRole}
          />
        </div>
      )}

      <style>{`
        .newusers-wrapper {
  height: calc(100vh - 7rem); /* Adjust based on navbar height */
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
}

.newusers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.newusers-container > * {
  flex: 0 0 calc(33.33% - 1rem);
  max-width: calc(33.33% - 1rem);
}

@media (max-width: 1024px) {
  .emp-cards-container > * {
    flex: 1 1 calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .emp-cards-container > * {
    flex: 1 1 100%;
  }
}



        .geo-cards-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .employee-card-wrapper {
  height: calc(100vh - 7rem); /* adjust based on navbar height */
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.employee-card-wrapper > * {
  flex: 0 0 calc(50% - 1rem);
  max-width: calc(50% - 1rem);
}

@media (max-width: 768px) {
  .employee-card-wrapper > * {
    flex: 1 1 100%;
    max-width: 100%;
  }
}


@media (max-width: 1024px) {
  .employee-card-wrapper > * {
    flex: 1 1 calc(50% - 1rem);
  }
}
  
body {
  overflow: hidden;
}


.role-scroll-wrapper {
  flex: 1;
  height: calc(100vh - 7rem); /* adjust based on your navbar height */
  overflow-y: auto;
  padding: 1rem;
}

body {
  overflow: hidden; /* disable full-page scroll */
}

.role-scroll-wrapper {
  scroll-behavior: smooth;
}



        @media (min-width: 768px) {
          .emp-cards-container > * {
            flex: 1 1 calc(50% - 1rem);
          }
        }

        @media (min-width: 1024px) {
          .emp-cards-container > * {
            flex: 1 1 calc(33.33% - 1rem);
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
          background-color: #A6C4BA;
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

import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { EmpNavbar } from '../components/employeeManagement/EmpNavbar';
import { EmpCard } from '../components/employeeManagement/EmpCard';

export const HrEmployeeManagement = () => {
  const bgClasses = ['#F2C3B9', '#7B08BD', '#6AC8BA','#BFBFF7'];

  const employees = [
    { name: "John Joseph Mathew George Daniel A", email: "johnmathewgeorgedaniel@zuntra.com", phone: "+91 1234567890", date: "10-06-2025", image: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Nisha Mehra", email: "nisha@zuntra.com", phone: "+91 9123456780", date: "12-06-2025", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Arun Raj", email: "arun.raj@zuntra.com", phone: "+91 9988000000", date: "09-06-2025", image: "https://randomuser.me/api/portraits/men/62.jpg" },
    { name: "Deepa S", email: "deepa.s@zuntra.com", phone: "+91 7896541230", date: "11-06-2025", image: "https://randomuser.me/api/portraits/women/75.jpg" },
    { name: "Pranav K", email: "pranav.k@zuntra.com", phone: "+91 9876543210", date: "08-06-2025", image: "https://randomuser.me/api/portraits/men/48.jpg" },
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

  return (
    <div className="website-container flex">
      <Sidebar />
      <div className="website-module flex-1">
        <EmpNavbar />

        {/* Cards Section */}
        <div className="cards-wrapper">
          <div className="project-cards-container">
  {employees.map((emp, index) => (
    <EmpCard
      key={index}
      name={emp.name}
      email={emp.email}
      phone={emp.phone}
      date={emp.date}
      image={emp.image}
      color={bgColorList[index]}
    /> 
  ))} 
</div>

        </div>

        <style jsx>{`
  .cards-wrapper {
    padding: 1rem;
    overflow-x: hidden;
  }

  .project-cards-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr); /* Mobile default */
  }

  @media (min-width: 48rem) {
    .project-cards-container {
      grid-template-columns: repeat(2, 1fr); /* Tablet */
    }
  }

  @media (min-width: 64rem) {
    .project-cards-container {
      grid-template-columns: repeat(3, 1fr); /* 1024px+ */
    }
  }
`}</style>

      </div>
    </div>
  );
};
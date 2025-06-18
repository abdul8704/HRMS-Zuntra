import React from "react";

export const EmpCard = () => {
  const employees = [
    { name: "Jai Atithya A", email: "jaiatithyaa@zuntra.com", phone: "+91 1234567890", date: "10-06-2025", image: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Nisha Mehra", email: "nisha.m@zuntra.com", phone: "+91 9123456780", date: "12-06-2025", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Arun Raj", email: "arun.raj@zuntra.com", phone: "+91 9988776655", date: "09-06-2025", image: "https://randomuser.me/api/portraits/men/62.jpg" },
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

  const bgOrder = [
    ['bg1', 'bg2', 'bg3'],
    ['bg2', 'bg3', 'bg1'],
    ['bg3', 'bg1', 'bg2'],
  ];

  return (
    <div className="main-content">
      <div className="empcard-grid">
        {employees.map((emp, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          const bgClass = bgOrder[row % bgOrder.length][col];

          return (
            <div key={index} className={`emp-card ${bgClass}`}>
              <div className="emp-info">
                <img src={emp.image} alt="profile" />
                <div>
                  <h3>{emp.name}</h3>
                  <p>{emp.email}</p>
                  <p>{emp.phone}</p>
                  <p className="small">{emp.date}</p>
                </div>
              </div>
              <div className="emp-actions">
                <button className="approve">✓</button>
                <button className="reject">✕</button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .main-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 32px 24px;
          min-height: 100vh;
          box-sizing: border-box;
          background-color: #f8fafc;
        }

        .empcard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          width: 100%;
          max-width: 1280px;
          padding: 24px;
        }

        .emp-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .emp-card:hover {
          transform: scale(1.01);
        }

        .emp-info {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .emp-info img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }

        .emp-info h3 {
          margin: 0;
          font-weight: 600;
        }

        .emp-info p {
          margin: 2px 0;
          font-size: 14px;
        }

        .emp-info .small {
          font-size: 12px;
          color: gray;
        }

        .emp-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .emp-actions button {
          border: none;
          border-radius: 9999px;
          width: 32px;
          height: 32px;
          font-size: 16px;
          color: white;
          cursor: pointer;
        }

        .emp-actions .approve {
          background-color: green;
        }

        .emp-actions .reject {
          background-color: red;
        }

        .bg1 {
          background-color: #fee2e2;
        }

        .bg2 {
          background-color: #e9d5ff;
        }

        .bg3 {
          background-color: #ccfbf1;
        }

        @media (max-width: 768px) {
          .empcard-grid {
            grid-template-columns: 1fr;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

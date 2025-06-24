import React, { useState } from "react";
import { EmpAssignmentPopUp } from "./EmpAssignmentPopUp";

export const EmpCard = ({ name, email, phone, date, image, color }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: "", top: 0, left: 0 });

  const handleApproveClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleSaveAssignment = (assignmentData) => {
    console.log("Assignment Saved:", assignmentData);
    setIsPopupOpen(false);
  };

  const showTooltip = (e, text) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      show: true,
      text,
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX,
    });
  };

  const hideTooltip = () => setTooltip({ show: false, text: "", top: 0, left: 0 });

  const employee = { name, email, phone, date, image };

  return (
    <>
      <div className="emp-card" style={{ backgroundColor: color }}>
        <div className="emp-left">
          <img src={image} alt="Profile" />
        </div>

        <div className="emp-right">
          <h2
            className="emp-name"
            onClick={(e) => showTooltip(e, name)}
            onMouseEnter={(e) => showTooltip(e, name)}
            onMouseLeave={hideTooltip}
          >
            {name}
          </h2>

          <div
            className="emp-email"
            onClick={(e) => showTooltip(e, email)}
            onMouseEnter={(e) => showTooltip(e, email)}
            onMouseLeave={hideTooltip}
          >
            <svg
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              className="emp-icon"
            >
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="emp-email-text">{email}</span>
          </div>

          <p
            className="emp-phone"
            onClick={(e) => showTooltip(e, phone)}
            onMouseEnter={(e) => showTooltip(e, phone)}
            onMouseLeave={hideTooltip}
          >
            📞 {phone}
          </p>

          <p className="emp-date">{date}</p>
        </div>

        <div className="emp-actions">
          <button className="emp-approve" onClick={handleApproveClick}>✓</button>
          <button className="emp-reject">✕</button>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="emp-tooltip"
          style={{
            top: tooltip.top + "px",
            left: tooltip.left + "px",
            position: "absolute"
          }}
        >
          {tooltip.text}
        </div>
      )}

      <style>{`
        .emp-card {
          display: flex;
          position: relative;
          border-radius: 1rem;
          width: 30%;
          height: 8rem;
          box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .emp-left {
          width: 8rem;
          height: 100%;
          flex-shrink: 0;
          overflow: hidden;
        }

        .emp-left img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 1rem;
          border-bottom-left-radius: 1rem;
        }

        .emp-right {
          flex: 1;
          padding: 0.8rem 3.2rem 0.8rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .emp-name {
          font-size: 1.1rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          cursor: pointer;
        }

        .emp-email {
          display: flex;
          align-items: center;
          margin: 0.2rem 0;
          font-size: 0.85rem;
          cursor: pointer;
          overflow: hidden;
        }

        .emp-icon {
          flex-shrink: 0;
          margin-right: 0.4rem;
        }

        .emp-email-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .emp-phone,
        .emp-date {
          margin: 0.2rem 0;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .emp-date {
          background-color: #fff;
          opacity: 0.4;
          padding: 0.2rem 0.6rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          width: fit-content;
        }

        .emp-actions {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .emp-approve,
        .emp-reject {
          border: none;
          width: 2rem;
          height: 2rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
        }

        .emp-approve {
          background-color: #8CDD84;
        }

        .emp-reject {
          background-color: #E67C91;
        }

        .emp-tooltip {
          background: #333;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.4rem;
          font-size: 0.85rem;
          white-space: nowrap;
          z-index: 1000;
        }

        @media (max-width: 48rem) {
          .emp-card {
            flex-direction: row;
            height: auto;
          }

          .emp-left {
            width: 7rem;
          }

          .emp-right {
            padding-right: 4rem;
          }

          .emp-actions {
            top: 0.6rem;
            right: 0.6rem;
          }
        }

        @media (max-width: 40.625rem) {
          .emp-actions {
            top: 0.4rem;
            right: 0.4rem;
          }
        }
      `}</style>

      <EmpAssignmentPopUp
        employee={employee}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSave={handleSaveAssignment}
      />
    </>
  );
};

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
      <div className={`emp-card ${bgColor}`}>
        <div className="emp-card-emp-info">
          <img src={image} alt="profile" />
          <div className="emp-card-emp-text">
            <h3>{name}</h3>

            <div className="emp-card-emp-line centered-email">
              <span className="emp-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="0.875rem" fill="none" viewBox="0 0 18 14">
                  <path fill="#000" d="M1.891 13.838a1.67 1.67 0 0 1-1.193-.472A1.518 1.518 0 0 1 .2 12.228v-9.66c0-.444.165-.823.497-1.138.331-.315.73-.472 1.193-.473h13.526c.465 0 .863.158 1.194.473.331.316.497.695.496 1.137v9.66c0 .444-.165.823-.496 1.139-.33.315-.729.473-1.194.472H1.89Zm6.763-5.635 6.763-4.026v-1.61L8.654 6.592 1.891 2.567v1.61l6.763 4.026Z" />
                </svg>
              </span>
              <a href={`mailto:${email}`} className="emp-card-email-link">{email}</a>
            </div>
      <div className="emp-card" style={{ backgroundColor: color }}>
        <div className="emp-left">
          <img src={image} alt="Profile" />
        </div>

            <div className="emp-card-emp-line centered-email">
              <span className="emp-card-icon">
                <svg width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.004 1.004 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.93 17.93 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1.004 1.004 0 0 1-.24 1.05l-2.2 2.16Z" />
                </svg>
              </span>
              <span className="emp-card-emp-link">{phone}</span>
            </div>

            <p className="emp-card-small">{date}</p>
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

        <div className="emp-card-emp-actions">
          <button className="emp-card-approve" onClick={handleApproveClick}>✓</button>
          <button className="emp-card-reject">✕</button>
      </div>

      {tooltip.show && (
        <div
          className="emp-tooltip"
          style={{ top: `${tooltip.top}px`, left: `${tooltip.left}px` }}
        >
          {tooltip.text}
        </div>
      )}

        <style jsx>{`
          .emp-card {
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            border-radius: 0.75rem;
            box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
            transition: transform 0.2s;
            box-sizing: border-box;
            margin-bottom: 1rem;
            overflow: hidden; /* ensures no child overflow */
          }

          @media (min-width: 40rem) {
            .emp-card {
              width: calc(50% - 1rem);
              max-width: calc(50% - 1rem);
            }
          }

          @media (min-width: 64rem) {
            .emp-card {
              width: calc(33.333% - 1rem);
              max-width: calc(33.333% - 1rem);
            }
          }

          .emp-card:hover {
            transform: scale(1.01);
          }

          .emp-card-emp-info {
            display: flex;
            flex: 1;
            align-items: stretch;
          }

          .emp-card-emp-info img {
            width: 6rem;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 0.75rem;
            border-bottom-left-radius: 0.75rem;
            flex-shrink: 0;
            display: block;
          }

          .emp-card-emp-text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1rem;
            width: 100%;
            overflow-wrap: break-word;
          }

          .emp-card-emp-text h3 {
            margin: 0;
            font-weight: 700;
            font-size: 1.125rem;
            word-break: break-word;
            text-align: left;
          }

          .emp-card-small {
            font-size: 0.75rem;
            color: black;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 2rem;
            padding: 0.3rem 0.6rem;
            width: fit-content;
            white-space: nowrap;
            text-align: left;
          }

          .emp-card-emp-line {
            display: flex;
            font-size: 0.75rem;
            margin: 0.125rem 0;
            flex-wrap: nowrap;
            min-width: 0;
            text-align: left;
          }

          .centered-email {
            align-items: center;
          }
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

          .emp-card-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.125rem;
            height: 1.125rem;
            margin-right: 0.375rem;
          }

          .emp-card-email-link {
            color: inherit;
            text-decoration: none;
            word-break: break-word;
            overflow-wrap: anywhere;
            flex: 1;
            display: block;
            text-align: left;
            font-size: 0.75rem;
          }

          .emp-card-email-link:hover,
          .emp-card-emp-link:hover {
            text-decoration: underline;
          }

          .emp-card-emp-link {
            display: block;
            color: inherit;
            word-break: break-word;
            overflow-wrap: anywhere;
            text-align: left;
            font-size: 0.75rem;
          }

          .emp-card-emp-actions {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.625rem;
            margin-top: -0.75rem;
          }

          .emp-card-emp-actions button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 0.75rem;
            width: 2.5rem;
            height: 2.25rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: black;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
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

          .emp-card-approve {
            background-color: #C1E8BD;
          }

          .emp-card-reject {
            background-color: #E1BEC5;
        .emp-approve {
          background-color: #8CDD84;
        }

        .emp-reject {
          background-color: #E67C91;
        }

        .emp-tooltip {
          position: absolute;
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

          .bg1 { background-color: #fee2e2; }
          .bg2 { background-color: #e9d5ff; }
          .bg3 { background-color: #ccfbf1; }
        `}</style>
      </div>

      <EmpAssignmentPopUp
        employee={employee}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSave={handleSaveAssignment}
      />
    </>
  );
};
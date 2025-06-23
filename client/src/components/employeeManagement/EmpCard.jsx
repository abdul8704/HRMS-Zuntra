import React, { useState } from "react";
import { EmpAssignmentPopUp } from "./EmpAssignmentPopUp";

export const EmpCard = ({ name, email, phone, date, image, bgColor }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApproveClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleSaveAssignment = (assignmentData) => {
    console.log("Assignment Saved:", assignmentData);
    setIsPopupOpen(false);
  };

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

            <div className="emp-card-emp-line centered-email">
              <span className="emp-card-icon">
                <svg width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.004 1.004 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.93 17.93 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1.004 1.004 0 0 1-.24 1.05l-2.2 2.16Z" />
                </svg>
              </span>
              <span className="emp-card-emp-link">{phone}</span>
            </div>

            <p className="emp-card-small">{date}</p>
          </div>
        </div>

        <div className="emp-card-emp-actions">
          <button className="emp-card-approve" onClick={handleApproveClick}>✓</button>
          <button className="emp-card-reject">✕</button>
        </div>

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

/* Default: Desktop (3 per row) */
.emp-card {
  width: calc(33.333% - 1rem);
  max-width: calc(33.333% - 1rem);
}

/* Tablets (2 per row): below 1024px (64rem) */
@media (max-width: 63.9375rem) {
  .emp-card {
    width: calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }
}

/* Mobile (1 per row): below 640px (40rem) */
@media (max-width: 39.9375rem) {
  .emp-card {
    width: 100%;
    max-width: 100%;
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

          .emp-card-approve {
            background-color: #C1E8BD;
          }

          .emp-card-reject {
            background-color: #E1BEC5;
          }

          .emp-card-approve:hover {
            background-color: green;
            color: white;
          }

          .emp-card-reject:hover {
            background-color: red;
            color: white;
          }

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

import React, { useState } from "react";
import { AddRolePopup } from "./AddRolePopup";
import { EditRolePopup } from "./EditRolePopup";

export const EmpRoleCard = ({ role, memberCount, bgColor, ibgcolor }) => {
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  const [roleData, setRoleData] = useState({
    role,
    members: memberCount,
    color: bgColor,
  });

  const handleEditClick = () => setEditPopupOpen(true);
  const handleCloseEdit = () => setEditPopupOpen(false);
  const handlePlusClick = () => setAddPopupOpen(true);
  const handleCloseAdd = () => setAddPopupOpen(false);

  const handleEditSave = (newData) => {
    setRoleData(newData);
  };

  return (
    <>
      <div className="role-card" style={{ backgroundColor: roleData.color }}>
        <div className="role-card-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            fill={ibgcolor}
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z" />
          </svg>
        </div>

        <div className="role-card-info">
          <span className="edit-icon" onClick={handleEditClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              fill="none"
              viewBox="0 0 25 25"
            >
              <path
                fill="#000"
                fillOpacity=".5"
                d="m15.359 8.333 1.305 1.306L4.055 22.222H2.777v-1.278L15.36 8.334Zm5-8.333a1.39 1.39 0 0 0-.973.403l-2.541 2.541 5.207 5.209 2.542-2.542c.541-.542.541-1.444 0-1.958l-3.25-3.25A1.364 1.364 0 0 0 20.358 0Zm-5 4.43L0 19.793V25h5.208L20.567 9.639 15.359 4.43Z"
              />
            </svg>
          </span>
          <p className="role-title">{roleData.role}</p>
          <p className="member-text">No. of members: {roleData.members}</p>
        </div>
      </div>

      {isAddPopupOpen && <AddRolePopup onClose={handleCloseAdd} />}
      {isEditPopupOpen && (
        <EditRolePopup
          role={roleData.role}
          members={roleData.members}
          color={roleData.color}
          onClose={handleCloseEdit}
          onSave={handleEditSave}
        />
      )}

      <style>{`
        .role-card {
          display: flex;
          align-items: center;
          border-radius: 0.5rem;
          padding: 1rem;
          width: 100%;
          max-width: 20rem;
          height: 7rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          margin: auto;
        }

        .role-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 100%;
        }

        .role-card-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          margin-left: 1rem;
          position: relative;
        }

        .edit-icon {
          position: absolute;
          top: -0.75rem;
          right: 0;
          cursor: pointer;
        }

        .role-title {
          margin: 0;
          font-size: 1rem;
          font-weight: bold;
          color: #333;
        }

        .member-text {
          margin: 0;
          font-size: 0.875rem;
          color: black;
        }
      `}</style>
    </>
  );
};

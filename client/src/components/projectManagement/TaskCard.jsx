import React from 'react';

export const TaskCard = ({
  TaskTitle = "Dummy Task Title",
  Taskdescription = "This is a placeholder task description...",
  userImage = "https://via.placeholder.com/40",
  userName = "John Doe",
  userRole = "Embedded & IoT Developer",
  footerBadge = "3 Month left"
}) => {
  return (
    <div className="task-container">
      <div className="task-header">
        <h1>{TaskTitle}</h1>
        <div className="icons-wrapper">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
              <path fill="#000" fillOpacity=".5" d="m15.359 8.333 1.305 1.306L4.055 22.222H2.777v-1.278L15.36 8.334Zm5-8.333a1.39 1.39 0 0 0-.973.403l-2.541 2.541 5.207 5.209 2.542-2.542c.541-.542.541-1.444 0-1.958l-3.25-3.25A1.364 1.364 0 0 0 20.358 0Zm-5 4.43L0 19.793V25h5.208L20.567 9.639 15.359 4.43Z" />
            </svg>
          </div>
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="none" viewBox="0 0 20 26">
              <g opacity=".5">
                <path fill="#000" d="M4.286 8.572h11.428v14.286H4.286V8.572Z" opacity=".3" />
                <path fill="#000" d="M15 1.429 13.571 0H6.43L5 1.429H0v2.857h20V1.429h-5ZM1.429 22.857a2.866 2.866 0 0 0 2.857 2.857h11.428a2.866 2.866 0 0 0 2.857-2.857V5.714H1.43v17.143ZM4.286 8.571h11.428v14.286H4.286V8.571Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="task-description">
        <p>{Taskdescription}</p>
      </div>

      
      <div className="footer">
        <div className="footer-container">
          <div className="user-info">
            <img src={userImage} alt="User" className="avatar" />
            <div className="text-info">
            <div className="name">{userName}</div>
            <div className="role">{userRole}</div>
          </div>
        </div>
      <div className="badge">{footerBadge}</div>
    </div>
</div>


      <style jsx>{`
        .task-container {
          display: flex;
          flex: 0 0 calc(30% - 32px);
          flex-direction: column;
          background-color: #C1E8BD;
          padding: 16px;
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          margin: 16px;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: left;
          margin-bottom: 12px;
          font-weight: bold;
          font-size: 22px;
        }

        .icons-wrapper {
          color: rgb(34, 33, 33);
          display: flex;
          gap: 4px;
        }

        .icon-container {
          cursor: pointer;
          padding: 4px;
        }

        .icon-container:hover {
          background-color: rgb(193, 188, 188);
          border-radius: 4px;
        }

        .task-description {
          margin: 0;
          color: #666;
          font-size: 14px;
          text-align: left;
        }

        .task-description p {
          text-align: left;
          margin: 0;
        }

        
        .footer {
          margin-top: 12px;
          padding-top: 12px;
          display: flex;
          justify-content: center;
          border-top: 1px solid #e3e3e3;
        }

        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #D5F2D0;
          border-radius: 12px;
          padding: 8px 16px;
          width: 100%;
          max-width: 360px;
        }


        .user-info {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        .text-info {
          display: flex;
          flex-direction: column;
        }

        .name {
          font-weight: 600;
          color: #222;
          font-size: 13px;
        }

        .role {
          font-size: 11px;
          color: #555;
          font-weight: 400;
          margin-top: -2px;
        }

        .badge {
          background-color: #C1E8BD;
          padding: 6px 12px;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 13px;
          color: #1A4731;
        }

        h1 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

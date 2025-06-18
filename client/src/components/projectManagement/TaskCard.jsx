import React from 'react'

export const TaskCard = ({
  TaskTitle = "Dummy Task Title",
  Taskdescription = "This is a placeholder task description for testing.",
  footer1 = "Assigned: John Doe",
  footer2 = "Due: 2025-07-01"
}) => {
  return (
    <div className="task-container">
      <div className="task-header">
        <h1>{TaskTitle}</h1>
        <div className="icons-wrapper">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
          </div>
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className= "task-description">
        <p>{Taskdescription}</p>
      </div>
      
      <div className="footer">
        const footer1 = "footer-1";
        <div>{footer1}</div>
        const footer2 = "footer-2";
        <div>{footer2}</div>
      </div>
             
      <style jsx>{`
        .task-container {
          display: flex;
          width: 30%;
          flex-direction: column;
          background-color: #C1E8BD;
          padding: 16px;
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          margin: 16px;
          text-align: left;
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
          background-color:rgb(193, 188, 188);
          border-radius: 4px;
        }
                 
        .footer {
          display: flex;
          justify-content: space-between;
          flex direction: row;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e3e3e3;
        }
                 
        h1 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
                 
        .task-description {
          margin: 0;
          color: #666;
          font-size: 14px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};  
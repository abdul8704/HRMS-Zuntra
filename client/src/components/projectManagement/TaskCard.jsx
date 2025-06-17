import React from 'react'

export const TaskCard = () => {
  return (
    <div className="task-container">
      <div className="task-header">
        <h2>Course Title</h2>
        <div className="icons-wrapper">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
          </div>
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </div>
        </div>
      </div>
      <p>This is the place to add task description.It gives a brief idea about the task the employee has to perform within the assigned time. This helps to manage all your tasks</p>
      <div className="footer">
        <div>footer-1</div>
        <div>footer-2</div>
      </div>
             
      <style jsx>{`
        .task-container {
          display: flex;
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
          align-items: center;
          margin-bottom: 12px;
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
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e3e3e3;
        }
                 
        h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
                 
        p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};
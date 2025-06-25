import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import zuntraLogo from "../assets/zuntra.png";

export const NewUser = () => {
  const hasAccess = false;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="newuser-root">
        {/* ABSOLUTE LOGO - NOT BLURRED */}
        <div className="newuser-fixed-logo">
          <img className="newuser-logo-img" src={zuntraLogo} alt="ZUNTRA" />
        </div>

        <div className="newuser-container">
          {/* BLURRED SIDEBAR */}
          <div className={`newuser-sidebar ${!hasAccess ? 'newuser-blurred' : ''}`}>
            {/* Grey placeholder rows */}
            <div className="newuser-sidebar-row" />
            <div className="newuser-sidebar-row" />
            <div className="newuser-sidebar-row" />
            <div className="newuser-sidebar-row" />
            <div className="newuser-sidebar-row" />
          </div>

          {/* Main content (also blurred if !hasAccess) */}
          <div className={`newuser-wrapper ${!hasAccess ? 'newuser-blurred' : ''}`}>
            <div className="newuser-module">
              <div className='newuser-grid'>
                <div className='newuser-greetings'>User Greetings</div>
                <div className='newuser-intime'>In time</div>
                <div className='newuser-outtime'>Out Time</div>
                <div className='newuser-worktime'>Work Time</div>
                <div className='newuser-breaktime'>Break Time</div>
                <div className='newuser-remainder'>Remainder</div>
                <div className='newuser-workbreak'>Work Break Composition</div>
                <div className='newuser-deadline'>Project Deadline</div>
                <div className='newuser-notification'>Notification</div>
                <div className='newuser-leave'>Employee on Leave</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay if no access */}
        {!hasAccess && (
          <div className="newuser-overlay">
            <h1>You’re in! Well… almost.</h1>
            <h2>Please wait until HR grants access. HR is still deciding whether to open the door or pretend they’re not home.</h2>
          </div>
        )}
      </div>

      <style>{`
        .newuser-root {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .newuser-fixed-logo {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 1001;
        }

        .newuser-logo-img {
          width: 10rem;
          height: auto;
          object-fit: contain;
        }

        .newuser-container {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
        }

        .newuser-sidebar {
          width: 16rem;
          background-color: #aabfb9;
          padding: 6rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .newuser-sidebar-row {
          height: 3rem;
          background-color: #d3d3d3;
          border-radius: 0.5rem;
        }

        .newuser-blurred {
          filter: blur(0.3rem);
          pointer-events: none;
          user-select: none;
        }

        .newuser-wrapper {
          flex-grow: 1;
          padding: 2rem;
        }

        .newuser-module {
          width: 100%;
          height: 100%;
        }

        .newuser-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          text-align: center;
          background: transparent;
          padding: 2rem 3rem;
          border-radius: 1rem;
        }

        .newuser-overlay h1 {
          font-size: 2.4rem;
          font-weight: 700;
          color: rgb(17, 16, 17);
          margin-bottom: 1rem;
        }

        .newuser-overlay h2 {
          font-size: 1.4rem;
          font-weight: 500;
          color: #616161;
          line-height: 1.6;
        }

        .newuser-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(9, 1fr);
          gap: 1rem;
          width: 100%;
          height: 100%;
        }

        .newuser-greetings, .newuser-intime, .newuser-outtime, .newuser-worktime,
        .newuser-breaktime, .newuser-remainder, .newuser-workbreak,
        .newuser-deadline, .newuser-notification, .newuser-leave {
          padding: 1rem;
          border-radius: 20px;
          background-color: #fff;
        }

        .newuser-greetings { grid-column: 1/5; grid-row: 1/2; }
        .newuser-intime { grid-column: 1/3; grid-row: 2/3; background-color: #C1E8BD; }
        .newuser-outtime { grid-column: 1/3; grid-row: 3/4; background-color: #E1BEC5; }
        .newuser-worktime { grid-column: 3/5; grid-row: 2/3; background-color: #C3E4EE; }
        .newuser-breaktime { grid-column: 3/5; grid-row: 3/4; background-color: #DECEB9; }
        .newuser-remainder { grid-column: 1/5; grid-row: 4/7; background-color: #BFBFF7; }
        .newuser-workbreak { grid-column: 1/4; grid-row: 7/10; background-color: #DDB3DD; }
        .newuser-deadline { grid-column: 5/9; grid-row: 1/5; background-color: #F2C3B9; }
        .newuser-notification { grid-column: 5/9; grid-row: 5/7; background-color: #F6E0BF; }
        .newuser-leave { grid-column: 4/9; grid-row: 7/10; background-color: #ADC0DA; }

        @media (max-width: 768px) {
          .newuser-container {
            flex-direction: column;
          }

          .newuser-sidebar {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            width: 100%;
            padding: 6rem 1rem 1rem;
          }

          .newuser-wrapper {
            padding: 1rem;
          }

          .newuser-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }

          .newuser-fixed-logo {
            top: 0.5rem;
            left: 0.5rem;
          }

          .newuser-logo-img {
            width: 8rem;
          }
        }
      `}</style>
    </>
  );
};

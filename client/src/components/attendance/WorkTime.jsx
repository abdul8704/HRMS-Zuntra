import React from 'react';

export default function WorkTime({ time = "09:02", label = "Today's work time" }) {
  return (
    <div className="work-card" role="group" aria-label={label}>
      <div className="work-card__icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 39 37">
          <path fill="#000" d="M15.584 0h7.792a3.92 3.92 0 0 1 2.755 1.13 3.842 3.842 0 0 1 1.141 2.73v3.86h7.792a3.92 3.92 0 0 1 2.755 1.13 3.842 3.842 0 0 1 1.141 2.73v21.23c0 1.024-.41 2.005-1.141 2.73a3.915 3.915 0 0 1-2.755 1.13H3.896a3.914 3.914 0 0 1-2.755-1.13A3.842 3.842 0 0 1 0 32.81V11.58c0-2.142 1.734-3.86 3.896-3.86h7.792V3.86c0-2.142 1.734-3.86 3.896-3.86Zm7.792 7.72V3.86h-7.792v3.86h7.792Z"/>
        </svg>
      </div>

      <div className="work-card__text">
        <span className="work-card__time">{time}</span>
        <span className="work-card__label">{label}</span>
      </div>

      <style jsx>{`
        .work-card {
          background: #C3E4EE;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.8rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          width: 115px;
          height: 45px;
          font-family: system-ui, Arial, sans-serif;
          margin: 1rem;
        }

        .work-card__icon {
          flex-shrink: 0;
        }

        .work-card__text {
          line-height: 1;
          display: flex;
          flex-direction: column;
        }

        .work-card__time {
          font-size: 1.9rem;
          font-weight: 600;
          opacity: 0.5;
        }

        .work-card__label {
          font-size: 0.6rem;
          color: #4a5f50;
          opacity: 0.85;
          margin-top: 0.1rem;
        }

        @media (prefers-color-scheme: dark) {
          .work-card {
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
    </div>
  );
}
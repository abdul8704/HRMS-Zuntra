import React from 'react';

/**
 * A reusable card that shows the user's clock‑in time.
 * Props:
 *   • time  – string, the main time to display (default "09:02")
 *   • label – string, subtitle below the time (default "Today's in time")
 */
export const OutTime = ({ time = "09:02", label = "Today's out time" }) => {
  return (
    <div className="out-card" role="group" aria-label={label}>
      <div className="out-card__icon" aria-hidden="true">
        {/* Custom SVG Arrow Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 39 37">
          <path fill="#000" d="M32.086 4.584a2.291 2.291 0 0 1 0-4.584h4.583a2.291 2.291 0 0 1 2.291 2.292v32.086a2.292 2.292 0 0 1-2.291 2.292h-4.583a2.291 2.291 0 0 1 0-4.584h2.291V4.584h-2.291ZM.419 17.006 6.88 7.838a2.291 2.291 0 1 1 3.736 2.659l-3.942 5.546h18.538a2.291 2.291 0 0 1 0 4.584H6.88l4.125 5.5a2.293 2.293 0 0 1-2.858 3.425 2.29 2.29 0 0 1-.808-.674L.465 19.71a2.292 2.292 0 0 1-.046-2.704Z"/>
        </svg>
      </div>

      <div className="out-card__text">
        <span className="out-card__time">{time}</span>
        <span className="out-card__label">{label}</span>
      </div>

      <style jsx>{`
        .out-card {
  background: #E1BEC5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  width: 125px;
  height: 45px;
  font-family: system-ui, Arial, sans-serif;
  margin: 1rem;
}

.out-card__icon {
  flex-shrink: 0;
}

.arrow-icon {
  width: 5px;
  height: 5px;
}

.out-card__text {
  line-height: 1;
  display: flex;
  flex-direction: column;
}

.out-card__time {
  font-size: 1.9rem;
  font-weight: 600;
  opacity: 0.5;
  /* color: #4a5f50; */
}

.out-card__label {
  font-size: 0.6rem;
  color: #4a5f50;
  opacity: 0.85;
  margin-top: 0.1rem;
}

@media (prefers-color-scheme: dark) {
  .out-card {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  }
}

      `}</style>
    </div>
  );
}
import React, { useEffect, useState } from "react";

export default function AttendanceCard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /**
   * Helper to determine the type of message for color‑coding.
   */
  function getMessageType(message) {
    const lower = message.toLowerCase();
    if (lower.includes("present")) return "present";
    if (lower.includes("leave")) return "leave";
    if (lower.includes("holiday")) return "holiday";
    return "";
  }

  /**
   * Simulated API call for the selected range.
   */
  async function handleCalendarRange() {
    try {
      const response = await fetch(`/api/attendance?from=${fromDate}&to=${toDate}`);
      const data = await response.json();
      setAttendanceData(data.records);
      setSummary(data.summary);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    }
    setShowPopup(false);
  }

  /**
   * Initial mock fetch.
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        records: [
          { date: "01/01/2025", message: "Holiday - New Year" },
          { date: "02/01/2025", message: "Present at 9:05 AM" },
          { date: "03/01/2025", message: "Leave - Sick" },
          { date: "04/01/2025", message: "Present at 9:10 AM" },
        ],
        summary: {
          workingDays: 20,
          present: 20,
          leave: 0,
          holidays: 10,
        },
      };
      setAttendanceData(data.records);
      setSummary(data.summary);
    };
    fetchData();
  }, []);

  return (
    <div className="attendance-card">
      {/* Floating calendar filter button */}
      <button className="attendance-icon-btn" onClick={() => setShowPopup(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 40 40"
        >
          <path
            stroke="#555"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5.172 20V1m29.206 38v-7.125M5.172 39v-9.5m29.206-7.125V1M19.775 8.125V1m0 38V17.625M5.172 29.5c2.305 0 4.173-2.127 4.173-4.75S7.477 20 5.172 20C2.868 20 1 22.127 1 24.75s1.868 4.75 4.172 4.75Zm14.602-11.874c2.305 0 4.173-2.127 4.173-4.75s-1.868-4.75-4.172-4.75c-2.305 0-4.173 2.127-4.173 4.75s1.868 4.75 4.172 4.75Zm14.604 14.252c2.304 0 4.172-2.127 4.172-4.75s-1.868-4.75-4.172-4.75c-2.304 0-4.172 2.127-4.172 4.75s1.868 4.75 4.172 4.75Z"
          />
        </svg>
      </button>

      <h2 className="attendance-title">Attendance</h2>

      {attendanceData.map((entry, idx) => (
        <div className="attendance-card-entry" key={idx}>
          <span className={`attendance-line ${getMessageType(entry.message)}`}>
            {entry.date}: {entry.message}
          </span>
        </div>
      ))}

      {summary && (
        <p className="attendance-summary">
          {summary.workingDays} working day{summary.workingDays !== 1 ? "s" : ""}, {summary.present} present, {summary.leave} leave, {summary.holidays} holiday{summary.holidays !== 1 ? "s" : ""}
        </p>
      )}

      {showPopup && (
        <div className="attendance-overlay" onClick={() => setShowPopup(false)}>
          <div className="attendance-popup" onClick={(e) => e.stopPropagation()}>
            <button className="attendance-close" onClick={() => setShowPopup(false)}>
              ✕
            </button>

            <div className="attendance-range">
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <span>to</span>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <button className="attendance-update" onClick={handleCalendarRange}>
              Update
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .attendance-card {
          position: relative;
          max-width: 620px;
          margin: 2rem auto;
          padding: 2rem 1.75rem;
          border-radius: 16px;
          background: linear-gradient(145deg, #fffaf0, #fff2d9);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        /* Floating button */
        .attendance-icon-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 50%;
          padding: 6px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .attendance-icon-btn:hover {
          background: #f7f7f7;
        }

        .attendance-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
          font-weight: 700;
          color: #333;
        }

        /* Individual record card */
        .attendance-card-entry {
          background: #ffffff;
          border-radius: 12px;
          padding: 0.8rem 1.2rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
        }

        /* Message colours */
        .attendance-line {
          font-size: 1rem;
          font-weight: 500;
          color: #444;
        }
        .attendance-line.present {
          color: #2e7d32;
        }
        .attendance-line.leave {
          color: #d32f2f;
          background: none;
          border: none;
        }
        .attendance-line.holiday {
          color: #1565c0;
        }

        /* Summary */
        .attendance-summary {
          margin-top: 1.5rem;
          padding: 1rem 1.2rem;
          background: #ffefcf;
          border-radius: 12px;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          color: #333;
          box-shadow: inset 0 0 0 1px #ffe6b9;
        }

        /* Popup overlay */
        .attendance-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: grid;
          place-items: center;
          z-index: 1000;
        }

        /* Popup card */
        .attendance-popup {
          position: relative;
          width: 90%;
          max-width: 500px;
          background: #fff4dc;
          border-radius: 16px;
          padding: 2rem 1.5rem;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }

        /* Close button */
        .attendance-close {
          position: absolute;
          top: 10px;
          right: 14px;
          background: transparent;
          border: none;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          color: #444;
        }

        /* Date range */
        .attendance-range {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .attendance-range input[type="date"] {
          appearance: none;
          background: #fffdf8;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0.7rem 1rem;
          font-size: 0.96rem;
          color: #444;
          width: 160px;
          transition: border 0.3s, box-shadow 0.3s;
          box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.05), inset -2px -2px 6px rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }
        .attendance-range input[type="date"]:hover {
          border-color: #ffc369;
        }
        .attendance-range input[type="date"]:focus {
          outline: none;
          border-color: #ffae42;
          box-shadow: 0 0 0 3px rgba(255, 193, 105, 0.3);
        }
        .attendance-range span {
          font-weight: 600;
          color: #666;
          font-size: 0.95rem;
        }

        /* Update button */
        .attendance-update {
          display: block;
          margin: 0 auto;
          padding: 0.6rem 1.6rem;
          border: none;
          border-radius: 10px;
          background: #ff9800;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.25s ease;
        }
        .attendance-update:hover {
          background: #fb8c00;
        }

        /* Popup fade */
        @keyframes fadeIn {
          from {
            transform: scale(0.97);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

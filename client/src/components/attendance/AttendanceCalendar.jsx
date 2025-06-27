import React, { useState, useEffect } from "react";

export default function AttendanceCalendar({
  initialYear = new Date().getFullYear(),
  initialMonth = new Date().getMonth(),
}) {
  const getLocalISODate = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  };

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showYearList, setShowYearList] = useState(false);
  const [todayISO, setTodayISO] = useState(getLocalISODate());

  const monthISO = `${year}-${String(month + 1).padStart(2, "0")}`;
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchMonth = async (y, m) => {
    try {
      setLoading(true);
      setError(null);

      const mockApiResponse = {
        success: true,
        attendanceData: {
          success: true,
          detailedData: [
            { date: "2025-06-04", status: "absent" },
            { date: "2025-06-10", status: "absent" },
            { date: "2025-06-12", status: "absent" },
            { date: "2025-06-19T18:30:00Z", status: "present" },
            { date: "2025-06-20T18:30:00Z", status: "present" },
            { date: "2025-06-22T18:30:00Z", status: "present" },
          ],
        },
      };
      await new Promise((r) => setTimeout(r, 400));
      const data = mockApiResponse;
      if (!data.success || !data.attendanceData?.success) {
        throw new Error("Invalid server response");
      }

      const map = {};
      data.attendanceData.detailedData.forEach(({ date, status }) => {
        if (date && status) map[date.slice(0, 10)] = status.toLowerCase();
      });
      setAttendance(map);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonth(year, month);
  }, [monthISO]);

  useEffect(() => {
    const timer = setInterval(() => {
      const localDate = getLocalISODate();
      if (localDate !== todayISO) {
        setTodayISO(localDate);
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        if (now.getFullYear() !== year || now.getMonth() !== month) {
          setYear(now.getFullYear());
          setMonth(now.getMonth());
          fetchMonth(now.getFullYear(), now.getMonth());
        }
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [todayISO, year, month]);

  const blanks = [...Array(firstDay.getDay())].map((_, i) => (
    <div key={`blank-${i}`} className="cell empty" />
  ));

  const dateCells = [...Array(daysInMonth)].map((_, i) => {
    const day = i + 1;
    const iso = `${monthISO}-${String(day).padStart(2, "0")}`;
    const dow = new Date(year, month, day).getDay();
    const status = attendance[iso];
    const isSunday = dow === 0;
    const isToday = iso === todayISO;
    const dayClass = status || (isSunday ? "sunday" : "");
    return (
      <div
        key={iso}
        className={`cell date ${dayClass} ${isToday ? "today" : ""}`}
      >
        {day}
      </div>
    );
  });

  return (
    <div className="calendar-card">
      <div className="header">
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <h2 className="title">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
          }).toUpperCase()}{" "}
          {year}
        </h2>
        <div className="spacer" />
      </div>

      <div className={`sidebar-wrapper ${menuOpen ? "open" : ""}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <button onClick={() => setYear((y) => y - 1)}>‹</button>
            <span style={{ cursor: "pointer" }} onClick={() => setShowYearList(!showYearList)}>
              {year}
            </span>
            <button onClick={() => setYear((y) => y + 1)}>›</button>
          </div>

          {showYearList && (
            <ul className="year-list">
              {Array.from({ length: 21 }, (_, i) => year - 10 + i).map((y) => (
                <li
                  key={y}
                  className={y === year ? "active" : ""}
                  onClick={() => {
                    setYear(y);
                    setShowYearList(false);
                  }}
                >
                  {y}
                </li>
              ))}
            </ul>
          )}

          <ul className="month-list">
            {Array.from({ length: 12 }).map((_, i) => (
              <li
                key={i}
                className={i === month ? "active" : ""}
                onClick={() => {
                  setMonth(i);
                  setMenuOpen(false);
                }}
              >
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && <p className="error">Error: {error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className="grid">
            {weekdays.map((d) => (
              <div key={d} className="cell header">
                {d}
              </div>
            ))}
          </div>

          <div className="grid">{[...blanks, ...dateCells]}</div>

          <div className="legend">
            <span><span className="dot present" /> Present</span>
            <span><span className="dot absent" /> Absent</span>
            <span><span className="dot on-site" /> On-site</span>
            <span><span className="dot remote" /> Remote</span>
            <span><span className="dot leave" /> Leave</span>
          </div>
        </>
      )}

      <style>{`
        .calendar-card {
          position: relative;
          height: 100%;
          width: 100%;
          padding: 1rem;
          background: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
          font-family: sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .burger {
          font-size: 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .spacer {
          width: 1.4rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
          margin-bottom: 0.25rem;
        }

        .cell {
          height: 2rem;
          width: 2rem;
          font-size: 0.75rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border-radius: 50%;
          margin: 0 auto;
        }

        .cell.header {
          font-weight: bold;
          background: #f0f0f0;
          height: 2rem;
          width: auto;
          border-radius: 0.375rem;
          margin: 0;
        }

        .cell.empty {
          background: transparent;
        }

        .present {
          background: #d8f7d2;
          color: #225522;
          border: none;
        }

        .absent {
          background: #ffecec;
          color: #771111;
          border: none;
        }

        .on-site {
          background: #d8f7d2;
          color: #225522;
          border: none;
        }

        .remote {
          background: #cfeeff;
          color: #004466;
          border: none;
        }

        .leave {
          background: #ffecec;
          color: #771111;
          border: none;
        }

        .sunday {
          background: #ffecec;
          color: #771111;
          border: none;
        }

        .today::after {
          content: "";
          position: absolute;
          width: 1.75rem;
          height: 1.75rem;
          border: 0.1rem solid #ff8c00;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          margin-top: 0.5rem;
          font-size: 0.7rem;
        }

        .dot {
          width: 0.5rem;
          height: 0.5rem;
          display: inline-block;
          border-radius: 50%;
          margin-right: 0.25rem;
        }

        .dot.present {
          background: #d8f7d2;
        }

        .dot.absent {
          background: #ffd9d9;
        }

        .dot.on-site {
          background: #d8f7d2;
        }

        .dot.remote {
          background: #cfeeff;
        }

        .dot.leave {
          background: #ffd9d9;
        }

        .sidebar-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
          transition: width 0.3s ease;
          z-index: 10;
        }

        .sidebar-wrapper.open {
          width: 11.875rem;
        }

        .sidebar {
          background: #f4dfbe;
          height: 100%;
          padding: 1rem;
          box-shadow: 0.125rem 0 0.375rem rgba(0, 0, 0, 0.2);
        }

        .sidebar-header {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .sidebar-header button {
          font-size: 1.2rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .year-list,
        .month-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-y: auto;
        }

        .year-list li,
        .month-list li {
          padding: 0.3rem 0;
          cursor: pointer;
          color: #333;
        }

        .year-list li:hover,
        .year-list li.active,
        .month-list li:hover,
        .month-list li.active {
          background: #e3cba1;
          border-radius: 0.25rem;
          font-weight: bold;
        }

        .error {
          color: red;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
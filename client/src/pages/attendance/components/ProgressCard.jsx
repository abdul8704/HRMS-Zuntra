import React, { useEffect, useRef, useState } from "react";

export default function ProgressCard() {
  const [filter, setFilter] = useState("range");
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tasks, setTasks] = useState([]);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { date: "2025-06-15", description: "UI/UX", completed: true },
        { date: "2025-06-16", description: "Frontend", completed: true },
        { date: "2025-06-17", description: "Backend", completed: false },
        { date: "2025-07-02", description: "API", completed: true },
        { date: "2025-07-04", description: "Testing", completed: false },
        { date: "2025-07-10", description: "Integration", completed: true },
      ]);
    }, 400);
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const monthKey = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  };

  const isInRange = (date) => {
    const d = new Date(date);
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;
    return (!fromDate || d >= fromDate) && (!toDate || d <= toDate);
  };

  const filtered = tasks.filter((t) => {
    const inRange = isInRange(t.date);
    const typeMatch =
      filter === "positive" ? t.completed :
      filter === "negative" ? !t.completed : true;
    return inRange && typeMatch;
  });

  const grouped = filtered.reduce((acc, task) => {
    const key = monthKey(task.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  const setAndClose = (val) => {
    setFilter(val);
    setOpen(false);
  };

  return (
    <div className="card">
      <div className="title-wrapper">
        <h2 className="title">Progress</h2>
      </div>

      <div className="dropdown-wrapper">
        <button ref={btnRef} className="icon-btn" onClick={() => setOpen((p) => !p)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 21 16" fill="none">
            <path
              d="M10.153 15.19s-.662-.176-.921-.498L.596 3.884C.302 3.517.116 2.99.082 2.42-.047 1.846.164 1.277.409.836c.244-.442.595-.72.976-.772.38-.053.76.124 1.053.49l7.715 10.098L17.868.9a1.37 1.37 0 0 1 .498-.394.984.984 0 0 1 .561-.077c.189.03.372.116.538.252.167.137.313.322.432.544.132.222.232.483.293.766.062.283.084.581.065.878a2.995 2.995 0 0 1-.174.843c-.097.26-.228.488-.385.669L11.06 14.82c-.267.272-.907.368-.907.368Z"
              fill="#333"
              opacity=".5"
            />
          </svg>
        </button>

        {open && (
          <ul ref={menuRef} className="menu">
            <li>
              <div className="range-inputs">
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="date" />
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="date" />
              </div>
            </li>
            <li onClick={() => setAndClose("positive")}>Positive</li>
            <li onClick={() => setAndClose("negative")}>Negative</li>
          </ul>
        )}
      </div>

      {/* task list */}
      {filtered.length === 0 ? (
        <p className="empty">No tasks match this view.</p>
      ) : (
        Object.entries(grouped).map(([month, list]) => (
          <div key={month} className="month-section">
            <h3 className="month-header">{month}</h3>
            {list.map((task) => (
              <div
                key={task.date + task.description}
                className={`task ${task.completed ? "positive" : "negative"}`}
              >
                {task.completed ? "✔️" : "🚫"} {task.completed ? "+" : "-"} {formatDate(task.date)} : {task.completed ? "completed" : "incompleted"} {task.description}
              </div>
            ))}
          </div>
        ))
      )}

      {/* styles */}
      <style jsx>{`
        .card {
          position: relative;
          max-width: 620px;
          margin: 2rem auto;
          padding: 1.75rem;
          border-radius: 16px;
          background: rgba(217, 191, 255, 0.83);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          font-family: system-ui, sans-serif;
        }

        .title-wrapper {
          margin-bottom: 1.5rem;
        }
        .title {
          font-size: 2rem;
          font-weight: 800;
          color: #343a40;
          margin: 0;
          padding-left: 0.25rem;
        }

        .dropdown-wrapper {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu {
          position: absolute;
          top: 35px;
          right: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          padding: 0.5rem;
          min-width: 220px;
        }
        .menu li {
          padding: 0.6rem 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .menu li:hover {
          background: #f5f5f5;
        }
        .range-inputs {
          display: flex;
          gap: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .date {
          padding: 0.4rem 0.6rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .month-section {
          margin-bottom: 1.2rem;
        }
        .month-header {
          font-size: 1.25rem;
          font-weight: 700;
          color: #4a148c;
          margin: 0 0 0.6rem;
          border-bottom: 1px solid rgba(74, 20, 140, 0.25);
          padding-bottom: 0.2rem;
        }

        .task {
          margin: 0.4rem 0;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          font-weight: 600;
          word-break: break-word;
        }
        .positive {
          background: #e6f4ea;
          color: #1b5e20;
        }
        .negative {
          background: #fceaea;
          color: #b71c1c;
        }

        .empty {
          text-align: center;
          color: #777;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}

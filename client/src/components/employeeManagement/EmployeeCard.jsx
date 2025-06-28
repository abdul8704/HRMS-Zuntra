import React, { useState } from "react";
import { TimeCard } from "../attendance/TimeCard";

const darkenColor = (hex, percent = 10) => {
  if (!hex || typeof hex !== "string") return "#888";
  let col = hex.replace("#", "");
  if (col.length === 3) col = col.split("").map((c) => c + c).join("");
  const r = parseInt(col.substring(0, 2), 16);
  const g = parseInt(col.substring(2, 4), 16);
  const b = parseInt(col.substring(4, 6), 16);

  const toHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  };

  const hsl = toHSL(r, g, b);
  hsl.l = Math.max(0, hsl.l - percent / 100);
  const h = Math.round(hsl.h * 360);
  const s = Math.round(hsl.s * 100);
  const l = Math.round(hsl.l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const styles = {
  card: (bgColor) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: bgColor,
    borderRadius: "1rem",
    padding: "1rem",
    gap: "1rem",
    boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.2)",
    width: "100%",
    position: "relative",
  }),
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    gap: "1rem",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    flex: "1 1 55%",
    minWidth: "16.25rem", // 260px
    gap: "1rem",
  },
  imageContainer: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    height: "100%",
    width: "5rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: "0.5rem",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem", // 6px
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  name: {
    fontSize: "1.125rem",
    margin: 0,
    cursor: "pointer",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: "#333",
    maxWidth: "100%",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  icon: {
    fontSize: "1rem",
    flexShrink: 0,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    display: "inline-block",
  },
  role: (bg) => ({
    marginTop: "0.25rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: bg,
    borderRadius: "0.75rem",
    width: "fit-content",
    fontSize: "0.8125rem",
    color: "black",
  }),
  timeContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "0.8rem",
    flex: "1 1 40%",
    minWidth: "12.5rem",
  },
  TimeCardWrapper: {
    flex: "0 1 calc(50% - 0.4rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "7rem",
  },
};

export const EmployeeCard = ({
  name,
  email,
  phone,
  role,
  image,
  inTime,
  outTime,
  workTime,
  breakTime,
  bgColor = "#cfd9ea",
}) => {
  const [tooltip, setTooltip] = useState({ show: false, text: "", top: 0, left: 0 });
  const cardColor = darkenColor(bgColor);
  const lightAccentColor = darkenColor(bgColor, 6);

  const showTooltip = (e, text) => {
  setTooltip({
    show: true,
    text,
    top: e.clientY + window.scrollY - 40,
    left: e.clientX + window.scrollX + 10,
  });
};


  const hideTooltip = () => setTooltip({ show: false, text: "", top: 0, left: 0 });

  return (
    <>
      <div className="employee-card" style={styles.card(cardColor)}>
        <div className="card-content" style={styles.cardContent}>
          <div className="left-section" style={styles.leftSection}>
            <div style={styles.imageContainer}>
              <img src={image} alt="Profile" style={styles.image} />
            </div>
            <div className="infoContainer" style={styles.infoContainer}>
              <h2
                style={styles.name}
                onMouseEnter={(e) => showTooltip(e, name)}
                onMouseLeave={hideTooltip}
              >
                <span className="text" style={styles.text}>{name}</span>
              </h2>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, email)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}>📧</span>
                <span className="text" style={styles.text}>{email}</span>
              </div>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, phone)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}>📞</span>
                <span className="text" style={styles.text}>{phone}</span>
              </div>
              <div style={styles.role(lightAccentColor)}>{role}</div>
            </div>
          </div>

          <div className="time-container" style={styles.timeContainer}>
            <div style={styles.TimeCardWrapper}>
              <TimeCard state="in" time={inTime} label={false} color={false} />
            </div>
            <div style={styles.TimeCardWrapper}>
              <TimeCard state="out" time={outTime} color={false} label={false} />
            </div>
            <div style={styles.TimeCardWrapper}>
              <TimeCard state="break" time={breakTime} color={false} label={false} />
            </div>
            <div style={styles.TimeCardWrapper}>
              <TimeCard state="work" time={workTime} color={false} label={false} />
            </div>
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div
          style={{
            position: "absolute",
            top: `${tooltip.top}px`,
            left: `${tooltip.left}px`,
            backgroundColor: "#333",
            color: "#fff",
            padding: "0.375rem 0.75rem",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
            zIndex: 9999,
            boxShadow: "0 0.125rem 0.375rem rgba(0,0,0,0.2)",
          }}
        >
          {tooltip.text}
        </div>
      )}

      <style jsx>{`
  @media (max-width: 25rem) {
    .employee-card {
      padding: 1rem !important;
    }

    .card-content {
      flex-direction: column !important;
      gap: 1rem !important;
    }

    .left-section {
      flex-direction: column !important;
      align-items: center !important;
      flex: 1 1 100% !important;
      min-width: 0 !important;
    }

    .infoContainer {
      align-items: center !important;
      text-align: center !important;
    }

    .time-container {
      justify-content: center !important;
      flex: 1 1 100% !important;
      min-width: 0 !important;
    }

    .employee-card h2 {
      font-size: 1rem !important;
    }

    .employee-card .text {
      max-width: 100% !important;
      word-break: break-word !important;
      white-space: normal !important;
    }

    .time-container > div {
      flex: 1 1 100% !important;
      min-width: 6rem !important;
    }
  }
`}</style>

    </>
  );
};

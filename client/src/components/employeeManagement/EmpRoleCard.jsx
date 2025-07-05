import React, { useRef, useState, useEffect } from "react";
import { ToolTip } from "../dashboard/ToolTip";

const darkenColor = (hex, percent = 20) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;

  if (color.length === 3) {
    color = color.split("").map(c => c + c).join("");
  }

  const r = parseInt(color.slice(0, 2), 16) / 255;
  const g = parseInt(color.slice(2, 4), 16) / 255;
  const b = parseInt(color.slice(4, 6), 16) / 255;

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
    h *= 60;
  }

  l = Math.max(0, l - percent / 100);

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r2, g2, b2;
  if (s === 0) {
    r2 = g2 = b2 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r2 = hueToRgb(p, q, h / 360 + 1 / 3);
    g2 = hueToRgb(p, q, h / 360);
    b2 = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  const toHex = x =>
    Math.round(x * 255).toString(16).padStart(2, "0");

  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
};
export const EmpRoleCard = ({ role, bgColor, onEdit }) => {
  const handleEditClick = () => {
    onEdit({ role, color: bgColor });
  };

  const textRef = useRef(null);
  const cardRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setIsOverflowed(true);
    } else {
      setIsOverflowed(false);
    }
  }, [role]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const iconColor = darkenColor(bgColor, 35);

  return (
    <div
      ref={cardRef}
      className={`w-full h-full flex items-center rounded-xl shadow-md font-sans p-4 bg-opacity-90 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between gap-4 w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.2rem"
          height="2.2rem"
          fill={iconColor}
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z" />
        </svg>

        <div
          className="relative flex-1 min-w-0"
          onMouseEnter={() => isOverflowed && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p ref={textRef} className="text-base font-bold text-gray-800 truncate">
            {role}
          </p>
          {showTooltip && (
            <ToolTip
              text={role}
              anchorRef={textRef}
              position="top"
              offset={6}
            />
          )}
        </div>

        <span className="cursor-pointer shrink-0" onClick={handleEditClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            fill="none"
            viewBox="0 0 25 25"
          >
            <path
              fill="#000"
              fillOpacity=".5"
              d="m15.359 8.333 1.305 1.306L4.055 22.222H2.777v-1.278L15.36 8.334Zm5-8.333a1.39 1.39 0 0 0-.973.403l-2.541 2.541 5.207 5.209 2.542-2.542c.541-.542.541-1.444 0-1.958l-3.25-3.25A1.364 1.364 0 0 0 20.358 0Zm-5 4.43L0 19.793V25h5.208L20.567 9.639 15.359 4.43Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

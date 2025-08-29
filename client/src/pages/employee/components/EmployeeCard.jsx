import React, { useState, useEffect, useRef } from "react";
import { TimeCard } from "../../dashboard/components/TimeCard";
import { ToolTip } from "../../../components/ToolTip";
import api from "../../../api/axios";

export const EmployeeCard = ({
  name,
  email,
  phone,
  role,
  image,
  userid,
  bgColor = "#cfd9ea",
  option = 2, // 1 = only details, 2 = details + time cards, 3 = approval buttons
  onApprove,
  onRemove,
}) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    anchorRef: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loginTime, setLoginTime] = useState("N/A");
  const [logoutTime, setLogoutTime] = useState("N/A");
  const [workTime, setWorkTime] = useState("N/A");
  const [breakTime, setBreakTime] = useState("N/A");

  const cardRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Fetch attendance/timecards
  useEffect(() => {
    const getTimeCards = async () => {
      try {
        const response = await api.get("api/employee/attendace/time-cards", {
          params: { userid: String(userid), date: new Date().toISOString() },
        });

        if (response.data.success) {
          setLoginTime(response.data.timeCards.login || "N/A");
          setLogoutTime(response.data.timeCards.logout || "N/A");
          setWorkTime(response.data.timeCards.work || "N/A");
          setBreakTime(response.data.timeCards.break || "N/A");
        }
      } catch (error) {
        console.log("Error getting time cards", error);
      }
    };
    if (userid) getTimeCards();
  }, [userid]);

  // Tooltip check
  const showTooltipIfTruncated = (anchorRef, text) => {
    const element = anchorRef.current;
    if (!element) return;

    if (element.tagName === "H6") {
      if (element.scrollWidth > element.clientWidth) {
        setTooltip({ show: true, text, anchorRef });
      }
    } else {
      const spanElement = element.querySelector("span");
      if (spanElement && spanElement.scrollWidth > spanElement.clientWidth) {
        setTooltip({ show: true, text, anchorRef });
      }
    }
  };

  const hideTooltip = () =>
    setTooltip({ show: false, text: "", anchorRef: null });

  return (
    <>
      <div
        ref={cardRef}
        className={`employee-card w-full rounded-2xl shadow-md relative transition-opacity duration-700 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex flex-col lg:flex-row w-full gap-2">
          {/* LEFT: Profile + details */}
          <div className="flex flex-1 gap-3 min-w-0 p-2">
            {/* Profile image (hidden on mobile) */}
            <div className="hidden lg:block h-full overflow-hidden rounded-tl-2xl rounded-bl-2xl">
              <img
                src={image}
                alt="Profile"
                className="w-[7rem] h-[7rem] object-cover object-center block"
              />
            </div>

            {/* Name, email, phone, role */}
            <div className="flex flex-col flex-[2] justify-center min-w-0">
              <h6
                ref={nameRef}
                className="text-md font-semibold cursor-pointer truncate text-center lg:text-left"
                onMouseEnter={() => showTooltipIfTruncated(nameRef, name)}
                onMouseLeave={hideTooltip}
              >
                {name}
              </h6>

              <div
                ref={emailRef}
                className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer justify-center lg:justify-start truncate"
                onMouseEnter={() => showTooltipIfTruncated(emailRef, email)}
                onMouseLeave={hideTooltip}
              >
                📧 <span className="truncate">{email}</span>
              </div>

              <div
                ref={phoneRef}
                className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer justify-center lg:justify-start truncate"
                onMouseEnter={() => showTooltipIfTruncated(phoneRef, phone)}
                onMouseLeave={hideTooltip}
              >
                📞 <span className="truncate">{phone}</span>
              </div>

              <div className="mt-1 py-1 px-2 rounded-xl w-fit text-xs text-black bg-white/50 truncate mx-auto lg:mx-0">
                {role}
              </div>
            </div>
          </div>

          {/* RIGHT: Option handling */}
          {option === 2 && (
            <div className="flex flex-col flex-wrap justify-center gap-3 p-3 lg:w-[14rem]">
              {/* Row 1 */}
              <div className="flex gap-3 justify-center">
                <TimeCard state="in" time={loginTime} color showLabel={false} />
                <TimeCard state="out" time={logoutTime} color showLabel={false} />
              </div>
              {/* Row 2 */}
              <div className="flex gap-3 justify-center">
                <TimeCard state="break" time={breakTime} color showLabel={false} />
                <TimeCard state="work" time={workTime} color showLabel={false} />
              </div>
            </div>
          )}

          {option === 3 && (
            <div className="flex flex-col items-center justify-center gap-2 ml-auto p-2">
              <button
                onClick={() => onApprove?.()}
                className="w-14 h-12 bg-green-200 hover:bg-green-300 text-black font-semibold rounded-md"
              >
                ✓
              </button>
              <button
                onClick={() => onRemove?.()}
                className="w-14 h-12 bg-red-200 hover:bg-red-300 text-black font-semibold rounded-md"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <ToolTip
          text={tooltip.text}
          anchorRef={tooltip.anchorRef}
          position="top"
          offset={10}
        />
      )}
    </>
  );
};

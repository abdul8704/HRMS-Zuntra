import React, { useState, useEffect, useRef } from "react";
import { TimeCard } from "../../dashboard/components/TimeCard";
import { ToolTip } from "../../../components/ToolTip";

export const EmployeeCard = ({
  // id =  "687a5a67cd620a8964a67952",
  // image = `http://localhost:5000/uploads/profilePictures/${userId}.png`,
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
  isNewUser = false,
  onApprove,
}) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    anchorRef: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
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

  const showTooltipIfTruncated = (anchorRef, text) => {
    const element = anchorRef.current;
    if (element) {
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
    }
  };

  const hideTooltip = () =>
    setTooltip({ show: false, text: "", anchorRef: null });

  return (
    <>
      <div
        ref={cardRef}
        className={`
          employee-card w-full rounded-2xl shadow-lg relative
          transition-opacity duration-700 ease-out
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{ backgroundColor: bgColor, transition: "0.5s" }}
      >
        <div
          className={`flex ${
            isNewUser ? "flex-row" : "flex-col"
          } lg:flex-row w-full gap-1`}
        >
          {/* Left Section */}
          <div className="flex flex-1 gap-2 min-w-0">
            <div className="h-full overflow-hidden rounded-tl-2xl rounded-bl-2xl">
              <img
                src={image}
                alt="Profile"
                className="w-[8rem] h-[8rem] object-fill object-top block"
              />
            </div>

            <div className="flex flex-col flex-[2] justify-center ">
              <h6
                ref={nameRef}
                className="text-md m-0 cursor-pointer truncate w-full text-center sm:text-left"
                onMouseEnter={() => showTooltipIfTruncated(nameRef, name)}
                onMouseLeave={hideTooltip}
              >
                {name}
              </h6>

              <div
                ref={emailRef}
                className="flex items-center gap-1 text-sm text-gray-800 cursor-pointer"
                onMouseEnter={() => showTooltipIfTruncated(emailRef, email)}
                onMouseLeave={hideTooltip}
                style={{ maxWidth: "220px", overflow: "hidden" }} // ← Fixed max width for email container
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="12"
                  fill="none"
                  viewBox="0 0 18 12"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M1.72 11.775c-.474 0-.878-.144-1.215-.432-.336-.288-.504-.634-.505-1.04V1.472C0 1.067.168.72.505.432A1.81 1.81 0 0 1 1.72 0h13.754c.473 0 .878.144 1.215.433.337.288.505.635.505 1.039v8.831c0 .405-.169.752-.505 1.04a1.801 1.801 0 0 1-1.215.432H1.72Zm6.876-5.151 6.877-3.68V1.472l-6.877 3.68-6.877-3.68v1.472l6.877 3.68Z"
                  />
                </svg>
                <span
                  className="truncate block"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {email}
                </span>
              </div>

              <div
                ref={phoneRef}
                className="flex items-center gap-1 text-sm text-gray-800 w-full max-w-full overflow-hidden cursor-pointer"
                onMouseEnter={() => showTooltipIfTruncated(phoneRef, phone)}
                onMouseLeave={hideTooltip}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="12"
                  fill="none"
                  viewBox="0 0 13 12"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M2.536 5.166C3.544 7.018 5.169 8.53 7.15 9.477l1.541-1.439a.732.732 0 0 1 .715-.157 8.507 8.507 0 0 0 2.5.373c.386 0 .7.294.7.654v2.283c0 .36-.314.654-.7.654C5.33 11.845 0 6.867 0 .726 0 .364.315.07.7.07h2.452c.385 0 .7.295.7.654 0 .818.14 1.603.4 2.336a.626.626 0 0 1-.175.667l-1.541 1.44Z"
                  />
                </svg>
                <span className="truncate">{phone}</span>
              </div>

              <div className="mt-1 py-1 px-2 rounded-xl w-fit text-xs text-black bg-white/40 truncate">
                {role}
              </div>
            </div>
          </div>

          {/* Time Cards or Action Buttons */}
          {isNewUser ? (
            <div className="flex flex-col flex-wrap justify-center gap-3 flex-[1] p-2.5">
              <button
                onClick={() => onApprove?.()}
                className="h-[3rem] bg-[#C1E8BD] text-black rounded-xl shadow hover:bg-[#C1FFBD] text-lg font-semibold"
              >
                ✓
              </button>
              <button className="h-[3rem] bg-[#E1BEC5] text-black rounded-xl shadow hover:bg-[#FFBEC5] text-lg font-semibold">
                ✕
              </button>
            </div>
          ) : (
            <div className="flex flex-col flex-wrap justify-center gap-3 p-2.5">
              <div className="flex gap-2.5 w-full flex-[1] justify-center">
                <div className="flex-1 min-w-[6rem] flex justify-center items-center">
                  <TimeCard
                    state="in"
                    time={inTime}
                    showLabel={false}
                    color={true}
                  />
                </div>
                <div className="flex-1 min-w-[6rem] flex justify-center items-center">
                  <TimeCard
                    state="out"
                    time={outTime}
                    showLabel={false}
                    color={true}
                  />
                </div>
              </div>
              <div className="flex flex-[1] gap-2.5 w-full justify-center">
                <div className="flex-1 min-w-[6rem] flex justify-center items-center">
                  <TimeCard
                    state="break"
                    time={breakTime}
                    showLabel={false}
                    color={true}
                  />
                </div>
                <div className="flex-1 min-w-[6rem] flex justify-center items-center">
                  <TimeCard
                    state="work"
                    time={workTime}
                    showLabel={false}
                    color={true}
                  />
                </div>
              </div>
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

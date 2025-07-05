import React, { useState, useEffect, useRef } from "react";
import { TimeCard } from "../dashboard/TimeCard";
import { ToolTip } from "../dashboard/ToolTip";

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
  const [tooltip, setTooltip] = useState({ show: false, text: "", anchorRef: null });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const showTooltip = (anchorRef, text) => {
    setTooltip({
      show: true,
      text,
      anchorRef
    });
  };

  const hideTooltip = () => setTooltip({ show: false, text: "", anchorRef: null });

  return (
    <>
      <div 
        ref={cardRef}
        className={`
          employee-card w-full rounded-2xl p-4 shadow-lg relative
          transition-all duration-700 ease-out
          ${isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
          }
        `}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex flex-row flex-wrap justify-between items-start w-full gap-4">
          {/* Left Section */}
          <div className="flex flex-row items-stretch flex-1 min-w-[260px] gap-4 basis-[55%]">
            {/* Image Container */}
            <div className="flex items-stretch justify-start h-full w-20">
              <img 
                src={image} 
                alt="Profile" 
                className="w-full h-full object-cover block rounded-lg"
              />
            </div>
            
            {/* Info Container */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0 overflow-hidden">
              <h2
                ref={nameRef}
                className="text-lg m-0 cursor-pointer"
                onMouseEnter={() => showTooltip(nameRef, name)}
                onMouseLeave={hideTooltip}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full inline-block">
                  {name}
                </span>
              </h2>
              
              <div 
                ref={emailRef}
                className="flex items-center gap-2 text-sm text-gray-800 max-w-full flex-nowrap overflow-hidden"
                onMouseEnter={() => showTooltip(emailRef, email)} 
                onMouseLeave={hideTooltip}
              >
                <span className="text-base flex-shrink-0">📧</span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full inline-block">
                  {email}
                </span>
              </div>
              
              <div 
                ref={phoneRef}
                className="flex items-center gap-2 text-sm text-gray-800 max-w-full flex-nowrap overflow-hidden"
                onMouseEnter={() => showTooltip(phoneRef, phone)} 
                onMouseLeave={hideTooltip}
              >
                <span className="text-base flex-shrink-0">📞</span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full inline-block">
                  {phone}
                </span>
              </div>
              
              <div 
                className="mt-1 py-1 px-2 rounded-xl w-fit text-xs text-black"
                style={{ backgroundColor: bgColor }}
              >
                {role}
              </div>
            </div>
          </div>

          {/* Time Container */}
          <div className="flex flex-wrap justify-end gap-3 flex-1 min-w-[200px] basis-[40%]">
            <div className="flex gap-2.5">
              <div className="flex-[0_1_calc(50%-0.4rem)] flex justify-center items-center min-w-[112px]">
                <TimeCard state="in" time={inTime} label={false} color={false} />
              </div>
              <div className="flex-[0_1_calc(50%-0.4rem)] flex justify-center items-center min-w-[112px]">
                <TimeCard state="out" time={outTime} color={false} label={false} />
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="flex-[0_1_calc(50%-0.4rem)] flex justify-center items-center min-w-[112px]">
                <TimeCard state="break" time={breakTime} color={false} label={false} />
              </div>
              <div className="flex-[0_1_calc(50%-0.4rem)] flex justify-center items-center min-w-[112px]">
                <TimeCard state="work" time={workTime} color={false} label={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Styles */}
        <style jsx>{`
          @media (max-width: 400px) {
            .employee-card > div {
              flex-direction: column !important;
              gap: 1rem !important;
            }

            .employee-card > div > div:first-child {
              flex-direction: column !important;
              align-items: center !important;
              flex: 1 1 100% !important;
              min-width: 0 !important;
            }

            .employee-card > div > div:first-child > div:last-child {
              align-items: center !important;
              text-align: center !important;
            }

            .employee-card > div > div:last-child {
              justify-content: center !important;
              flex: 1 1 100% !important;
              min-width: 0 !important;
            }

            .employee-card h2 {
              font-size: 1rem !important;
            }

            .employee-card span {
              max-width: 100% !important;
              word-break: break-word !important;
              white-space: normal !important;
            }

            .employee-card > div > div:last-child > div {
              flex: 1 1 100% !important;
              min-width: 6rem !important;
            }
          }
        `}</style>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <ToolTip 
          text={tooltip.text} 
          anchorRef={tooltip.anchorRef}
          position="top"
          offset={8}
        />
      )}
    </>
  );
};
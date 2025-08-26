import React, { useEffect, useRef, useState } from "react";

export function EmployeeCourseProgress({ data }) {
  const [tooltip, setTooltip] = useState({ show: false, text: "", anchorRef: null });
  const progressBarRef = useRef(null);
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleMouseEnter = () => {
    setTooltip({
      show: true,
      text: `Completion: ${data.percentComplete}%`,
      anchorRef: progressBarRef,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", anchorRef: null });
  };

  const SimpleTooltip = ({ text, show }) => {
    if (!show) return null;
    return (
      <div className="absolute z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap -top-8 left-1/2 transform -translate-x-1/2">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    );
  };

  const getResponsiveStyles = () => {
    const { width, height } = dimensions;
    const baseWidth = 384;
    const baseHeight = 144;
    const widthScale = width / baseWidth;
    const heightScale = height / baseHeight;
    const minScale = Math.min(widthScale, heightScale);
    return {
      fontSize: `${Math.max(minScale * 14, 10)}px`,
      nameFontSize: `${Math.max(minScale * 16, 12)}px`,
      smallFontSize: `${Math.max(minScale * 12, 9)}px`,
      tagFontSize: `${Math.max(minScale * 11, 8)}px`,
      padding: `${Math.max(minScale * 12, 8)}px`,
      imageSize: `${Math.max(minScale * 96, 60)}px`,
      gap: `${Math.max(minScale * 4, 2)}px`,
      progressHeight: `${Math.max(minScale * 8, 4)}px`,
      tagPadding: `${Math.max(minScale * 8, 4)}px`,
    };
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const updateDimensions = () => {
      const rect = card.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const styles = getResponsiveStyles();

  return (
    <div ref={cardRef} className="h-full w-full">
      <div className="flex flex-row bg-[#eef8f8] rounded-xl shadow-md w-full h-full overflow-hidden">
        {/* Left: Course image */}
        <div className="flex-shrink-0 h-full">
          <img
            src={data.courseDetails.courseImage}
            alt={data.courseDetails.courseName}
            className="h-full object-cover rounded-l-xl"
            style={{ width: styles.imageSize }}
          />
        </div>

        {/* Right: Course info */}
        <div className="flex-1 flex flex-col justify-between" style={{ padding: styles.padding }}>
          <div className="flex flex-col" style={{ gap: styles.gap }}>
            <p
              className="font-bold text-gray-800 leading-tight truncate"
              style={{ fontSize: styles.nameFontSize }}
            >
              {data.courseDetails.courseName}
            </p>
            <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
              Instructor: {data.courseDetails.courseInstructor}
            </p>
            <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
              Rating: ⭐ {data.courseDetails.courseRating}
            </p>
            {data.courseDetails.deadline > 0 && (
              <span
                className="inline-block text-teal-700 bg-teal-100 rounded-full w-fit"
                style={{
                  fontSize: styles.tagFontSize,
                  padding: `${parseInt(styles.tagPadding) / 2}px ${styles.tagPadding}`,
                  marginTop: styles.gap,
                }}
              >
                Duration: {data.courseDetails.deadline} {data.courseDetails.deadlineUnits}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: styles.gap }}>
            <div
              ref={progressBarRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-full bg-gray-300 rounded-full relative"
              style={{ height: styles.progressHeight }}
            >
              <div
                className="bg-teal-500 rounded-full absolute top-0 left-0 transition-all duration-300"
                style={{
                  width: `${data.percentComplete}%`,
                  height: styles.progressHeight,
                }}
              ></div>
              <SimpleTooltip text={tooltip.text} show={tooltip.show} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

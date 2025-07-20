import React, { useEffect, useRef, useState } from "react";

export function EmployeeCourseProgress({type}) {
  const [tooltip, setTooltip] = useState({ show: false, text: "", anchorRef: null });
  const progressBarRef = useRef(null);
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const employeeData = {
    name: "Jai Atithya A",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "jaiatithya@zuntra.com",
    phone: "+91 1234567890",
    role: "Embedded & IoT Developer",
    progress: 40,
  };

  const courseData = {
    name: "Advanced React Development",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop&crop=center",
    instructor: "Dr. Sarah Johnson",
    role: "React Specialist",
    progress: 65,
  };

  const handleMouseEnter = () => {
    const progress = type === "employee" ? employeeData.progress : courseData.progress;
    setTooltip({
      show: true,
      text: `${type === "employee" ? "Course Progress" : "Completion"}: ${progress}%`,
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
    const baseFontSize = Math.max(minScale * 14, 10);
    const nameFontSize = Math.max(minScale * 16, 12);
    const smallFontSize = Math.max(minScale * 12, 9);
    const tagFontSize = Math.max(minScale * 11, 8);
    const padding = Math.max(minScale * 12, 8);
    const imageSize = Math.max(minScale * 96, 60);
    const gap = Math.max(minScale * 4, 2);
    const progressHeight = Math.max(minScale * 8, 4);
    const tagPadding = Math.max(minScale * 8, 4);
    return {
      fontSize: `${baseFontSize}px`,
      nameFontSize: `${nameFontSize}px`,
      smallFontSize: `${smallFontSize}px`,
      tagFontSize: `${tagFontSize}px`,
      padding: `${padding}px`,
      imageSize: `${imageSize}px`,
      gap: `${gap}px`,
      progressHeight: `${progressHeight}px`,
      tagPadding: `${tagPadding}px`,
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
  const data = type == "employee" ? employeeData : courseData;

  return (
    <div ref={cardRef} className="h-full w-full">
      <div className="flex flex-row bg-[#eef8f8] rounded-xl shadow-md w-full h-full overflow-hidden">
        <div className="flex-shrink-0 h-full">
          <img
            src={data.image}
            alt={type}
            className="h-full object-cover rounded-l-xl"
            style={{ width: styles.imageSize }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between" style={{ padding: styles.padding }}>
          <div className="flex flex-col" style={{ gap: styles.gap }}>
            <p
              className="font-bold text-gray-800 leading-tight truncate"
              style={{ fontSize: styles.nameFontSize }}
            >
              {type === "employee" ? data.name : data.name}
            </p>
            {type === "employee" ? (
              <>
                <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
                  {data.email}
                </p>
                <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
                  {data.phone}
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
                  Instructor: {data.instructor}
                </p>
                <p className="text-gray-600 truncate" style={{ fontSize: styles.smallFontSize }}>
                  Duration: 6 weeks
                </p>
              </>
            )}

            <span
              className="inline-block text-teal-700 bg-teal-100 rounded-full w-fit"
              style={{
                fontSize: styles.tagFontSize,
                padding: `${parseInt(styles.tagPadding) / 2}px ${styles.tagPadding}`,
                marginTop: styles.gap,
              }}
            >
              {data.role}
            </span>
          </div>

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
                  width: `${data.progress}%`,
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

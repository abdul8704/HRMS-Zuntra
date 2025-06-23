import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { PopupCard } from "../components/PopupCard";

const courseList = [
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "Instructor",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  // 👇 Add more as needed
];

export const HrCourseManagement = () => {
  // Popup state
  const [showPopup, setShowPopup] = useState(true); // Set to true to test the popup

  // Function to show popup (you can call this from anywhere in your component)
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="website-container" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div className="website-module" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <CourseNavbar />
        <div className="scrollable-content">
          <div className="card-flex">
            {courseList.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>
      
      {/* PopupCard Component */}
      <PopupCard
        isVisible={showPopup}
        onClose={handleClosePopup}
        type="success"
        title="Course Action"
        message="Course operation completed successfully!"
        duration={5000}
        color="#10B981"
        position="top-right"
      />

      <style>{`
        .scrollable-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0; /* Remove padding from scrollable content */
        }

        .card-flex {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
          padding: 1rem 2rem 2rem 2rem; /* Move padding here to match navbar exactly */
          margin: 0; /* Ensure no margin */
        }

        /* Alternative flexbox approach if you prefer */
        .card-flex-alternative {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .card-flex-alternative > * {
          flex: 1 1 280px;
          max-width: calc(25% - 1.5rem); /* 4 cards per row with gaps */
        }

        @media (max-width: 1200px) {
          .card-flex {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            padding: 1rem 1.5rem 2rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .card-flex {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .card-flex {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
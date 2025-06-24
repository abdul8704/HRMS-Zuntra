import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { PopupCard } from "../components/PopupCard";
import { useParams } from "react-router-dom";
import GoToLoomButton from "../components/coursemanagement/GoToLoomButton";
import InstallLoomExtensionButton from "../components/coursemanagement/InstallLoomExtensionButton";

const courseList = [
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Git & GitHub",
    instructor: "Mr. Jai Atithya A",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "A Complete Guide to your DL",
    instructor: "Mr. Joseph Daniel H",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Git & GitHub",
    instructor: "Mr. Jai Atithya A",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "A Complete Guide to your DL",
    instructor: "Mr. Joseph Daniel H",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Git & GitHub",
    instructor: "Mr. Jai Atithya A",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "A Complete Guide to your DL",
    instructor: "Mr. Joseph Daniel H",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  // ... more course objects as in your original list
];

export const HrCourseManagement = () => {
  const { navId } = useParams();

  return (
    <div
      className="website-container"
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sidebar />
      <div
        className="website-module"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CourseNavbar />

        <div className="scrollable-content">
          {navId === "all" && (
            <div className="card-flex">
              {courseList.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          )}

          {navId === "create" && (
            <div className="loom-section">
              <h2 className="loom-heading">Record with Loom</h2>
              <GoToLoomButton />
              <InstallLoomExtensionButton />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scrollable-content {
          flex-grow: 1;
          overflow-y: auto;
          margin-top: 1.5rem;
        }

        .card-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          box-sizing: border-box;
        }

        .loom-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 100px;
          gap: 20px;
        }

        .loom-heading {
          font-size: 2rem;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
        }

        .loom-section button,
        .loom-section a {
          background-color: #b9fff4;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .loom-section button:hover,
        .loom-section a:hover {
          background-color: #9ff0e4;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .card-flex {
            justify-content: center;
            padding: 1rem;
          }

          .loom-section {
            margin-top: 50px;
          }
        }

        @media (max-width: 480px) {
          .card-flex {
            flex-direction: column;
            align-items: center;
            padding: 1rem 0.5rem;
          }

          .loom-heading {
            font-size: 1.5rem;
          }

          .loom-section button,
          .loom-section a {
            width: 90%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

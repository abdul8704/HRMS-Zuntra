import React from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { UpskillNavbar } from "../components/upskill/UpskillNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { ChevronLeft, ChevronRight, Download, RefreshCw } from "lucide-react";

const assignedCourseList = [
  {
    image: "https://i.postimg.cc/3rDpW4g1/What-is-UIUX-Transformation-and-How-Does-it-Benefit-Businesses-04-0-1.png",
    title: "Introduction to UI/UX",
    instructor: "Dharinish",
    duration: "Finish by: 10-10-10",
    badgeColor: "#FADADD",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Course Name",
    instructor: "by Instructor",
    duration: "At your own pace",
    badgeColor: "#D0F0C0",
    rating: 3.5,
  },
];

const enrolledCourseList = [
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
    duration: "At your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
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
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
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
  ,
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
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
  ,
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
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
];

const availableCourseList = [
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Git & GitHub Essentials",
    instructor: "Mr. Jai Atithya A",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "MongoDB Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "At your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Intro to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Cloud Essentials",
    instructor: "Ms. Ramya S",
    duration: "Self-paced",
    badgeColor: "#E0FFFF",
    rating: 3.5,
  },
  ,
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Intro to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Cloud Essentials",
    instructor: "Ms. Ramya S",
    duration: "Self-paced",
    badgeColor: "#E0FFFF",
    rating: 3.5,
  },
  ,
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Intro to Data Science",
    instructor: "Ms. Harini S",
    duration: "In 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Cloud Essentials",
    instructor: "Ms. Ramya S",
    duration: "Self-paced",
    badgeColor: "#E0FFFF",
    rating: 3.5,
  },
];

const completedCourseList = [
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Full Stack Basics",
    instructor: "Ms. Harini S",
    duration: "Completed on: 12-05-2024",
    badgeColor: "#E6E6FA",
    rating: 4.0,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Cloud Fundamentals",
    instructor: "Mr. Joseph Daniel H",
    duration: "Completed on: 20-06-2024",
    badgeColor: "#E6E6FA",
    rating: 4.5,
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
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
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
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  ,
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
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
];

// New component for completed course cards
const CompletedCourseCard = ({ image, title, instructor, duration, badgeColor, rating }) => {
  return (
    <div className="completed-course-card">
      <div className="completed-course-image">
        <img src={image} alt={title} />
      </div>
      <div className="completed-course-content">
        <div className="completed-course-header">
          <div className="completed-course-info">
            <h3>{title}</h3>
            <p className="instructor">{instructor}</p>
            <p className="duration">{duration}</p>
          </div>
          <div className="completed-course-rating">
            <span>★ {rating}</span>
          </div>
        </div>
        <div className="completed-course-actions">
          <button className="action-btn" title="Download Certificate">
            <Download size={16} />
          </button>
          <button className="action-btn" title="Retake Course">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Upskill = () => {
  const { navId } = useParams();

  const getCourseList = () => {
    switch (navId) {
      case "assigned":
        return assignedCourseList;
      case "enrolled":
        return enrolledCourseList;
      case "all":
        return availableCourseList;
      case "completed":
        return completedCourseList;
      default:
        return null;
    }
  };

  const coursesToRender = getCourseList();

  const scrollHorizontally = (direction) => {
    const container = document.getElementById("course-carousel");
    const scrollAmount = 300;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="website-container"
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div
        className="website-module"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div className="navbar-fixed">
          <UpskillNavbar />
        </div>

        <div className="scrollable-content">
          {coursesToRender ? (
            coursesToRender.length === 0 ? (
              <div className="coming-soon-container">
                <h1 className="coming-soon-text">No courses available.</h1>
              </div>
            ) : navId === "all" ? (
              <div className="carousel-wrapper">
                <button className="scroll-arrow left" onClick={() => scrollHorizontally("left")}>
                  <ChevronLeft size={28} />
                </button>
                <div className="horizontal-scroll-container" id="course-carousel">
                  {coursesToRender.map((course, index) => (
                    <div className="card-wrapper" key={index}>
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
                <button className="scroll-arrow right" onClick={() => scrollHorizontally("right")}>
                  <ChevronRight size={28} />
                </button>
              </div>
            ) : navId === "completed" ? (
              <div className="completed-card-flex">
                {coursesToRender.map((course, index) => (
                  <CompletedCourseCard key={index} {...course} />
                ))}
              </div>
            ) : (
              <div className="card-flex">
                {coursesToRender.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            )
          ) : (
            <div className="coming-soon-container">
              <h1 className="coming-soon-text">🚀 Under Development, Coming Soon</h1>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar-fixed {
          flex-shrink: 0;
          height: 80px;
          background: white;
          z-index: 100;
        }

        .scrollable-content {
          flex-grow: 1;
          overflow-y: auto;
        }

        .card-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 2rem;
          padding: 2rem;
        }

        .completed-card-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 2rem;
          justify-content: flex-start;
        }

        .completed-course-card {
          display: flex;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          height: 120px;
          width: calc(50% - 0.5rem);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .completed-course-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .completed-course-image {
          width: 25%;
          height: 100%;
          overflow: hidden;
        }

        .completed-course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .completed-course-content {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .completed-course-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .completed-course-info {
          flex: 1;
        }

        .completed-course-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .completed-course-info .instructor {
          margin: 0 0 0.3rem 0;
          color: #666;
          font-size: 0.9rem;
        }

        .completed-course-info .duration {
          margin: 0;
          color: #888;
          font-size: 0.8rem;
        }

        .completed-course-rating {
          color: #ffa500;
          font-size: 0.9rem;
          font-weight: 600;
          margin-left: 1rem;
          flex-shrink: 0;
        }

        .completed-course-actions {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: #f0f0f0;
          border: none;
          border-radius: 6px;
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .action-btn:hover {
          background: #e0e0e0;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .horizontal-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          gap: 2rem;
          padding: 1rem 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          flex-grow: 1;
          max-width: 100%;
        }

        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .card-wrapper {
          min-width: 250px;
          flex: 0 0 auto;
        }

        .scroll-arrow {
          background: white;
          border: none;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
          flex-shrink: 0;
        }

        .scroll-arrow:hover {
          background: #f0f0f0;
        }

        .coming-soon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .coming-soon-text {
          font-size: 3rem;
          font-weight: 700;
          color: rgb(153, 153, 153);
          text-shadow: 0 0 10px #BBD3CC, 0 0 20px #BBD3CC;
          animation: pulse 2s infinite ease-in-out;
          margin: 0;
          text-align: center;
        }

        @keyframes pulse {
          0%, 100% {
            text-shadow: 0 0 10px #BBD3CC, 0 0 20px #BBD3CC;
          }
          50% {
            text-shadow: 0 0 20px #BBD3CC, 0 0 40px #BBD3CC;
          }
        }
      `}</style>
    </div>
  );
};
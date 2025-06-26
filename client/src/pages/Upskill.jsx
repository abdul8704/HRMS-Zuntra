import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { UpskillNavbar } from '../components/upskill/UpskillNavbar';
import { CourseCard } from '../components/coursemanagement/CourseCard';

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
];

export const Upskill = () => {
  const { navId } = useParams();

  const validTabs = ["enrolled", "assigned", "available"];

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
        <UpskillNavbar />

        <div className="scrollable-content">
          {validTabs.includes(navId) ? (
            <div className="card-flex">
              {courseList.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          ) : (
            <div className="coming-soon-container">
              <style>{`
                @keyframes pulse {
                  0%, 100% {
                    text-shadow: 0 0 10px #BBD3CC, 0 0 20px #BBD3CC;
                  }
                  50% {
                    text-shadow: 0 0 20px #BBD3CC, 0 0 40px #BBD3CC;
                  }
                }
              `}</style>
              <h1
                style={{
                  fontSize: "5rem",
                  fontWeight: "700",
                  color: "rgb(153, 153, 153)",
                  textShadow: "0 0 10px #BBD3CC, 0 0 20px #BBD3CC",
                  animation: "pulse 2s infinite ease-in-out",
                  margin: 0,
                  textAlign: "center"
                }}
              >
                🚀 Under Development, Coming Soon
              </h1>
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
          padding: 1rem;
        }

        .coming-soon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .card-flex {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .card-flex {
            flex-direction: column;
            align-items: center;
            padding: 1rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};


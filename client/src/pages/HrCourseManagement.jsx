import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { CreateCourse } from "../components/courseManagement/CreateCourse";
import api from '../api/axios';

// const courseList = [
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Git & GitHub",
//     instructor: "Mr. Jai Atithya A",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "MongoDB - Advanced",
//     instructor: "Mr. Abdul Aziz M A",
//     duration: "at your own pace",
//     badgeColor: "#C7F3D0",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Data Science",
//     instructor: "Ms. Harini S",
//     duration: "in 3 months",
//     badgeColor: "#FFEFB2",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "A Complete Guide to your DL",
//     instructor: "Mr. Joseph Daniel H",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
//   // Duplicate entries for demo
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Git & GitHub",
//     instructor: "Mr. Jai Atithya A",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "MongoDB - Advanced",
//     instructor: "Mr. Abdul Aziz M A",
//     duration: "at your own pace",
//     badgeColor: "#C7F3D0",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Data Science",
//     instructor: "Ms. Harini S",
//     duration: "in 3 months",
//     badgeColor: "#FFEFB2",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "A Complete Guide to your DL",
//     instructor: "Mr. Joseph Daniel H",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   }
// ];

export const HrCourseManagement = () => {
  const { navId } = useParams();
  const [courseList, setcourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await api.get(`/api/course`);
      if (res.data.success) {
        setcourseList(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setApiMessage(res.data?.message || "Something went wrong."); // Fix here
        setcourseList([]);
      }
    } catch (error) {
      setApiMessage(error?.response?.data?.message || "Error fetching projects."); // Fix here
      setcourseList([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);
console.log(courseList)

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

        {navId === "all" && (
          <div className="scrollable-content">
            <div className="card-flex">
              {courseList.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        )}

        {navId === "create" && (
          <CreateCourse />
        )}
      </div>

      <style>
        {`
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

      .loom-section {
        height: calc(100vh - 80px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
      }

      .loom-section h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
      }

      .loom-section button {
        background-color: #cde1db;
        border: none;
        padding: 0.75rem 1.5rem;
        margin: 0.5rem 0;
        border-radius: 1rem;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.3s ease;
      }

      .loom-section button:hover {
        background-color: #b0d4c9;
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
      `}
      </style>
    </div>
  );
};

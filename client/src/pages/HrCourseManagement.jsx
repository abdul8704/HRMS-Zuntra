import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
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
  // Duplicate entries for demo
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
  }
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
              <h1 className="loom-heading">Record with Loom</h1>
              <div className="loom-buttons">
                <GoToLoomButton />
                <InstallLoomExtensionButton />
              </div>
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

        .loom-section {
          height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .loom-heading {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }

        .loom-buttons {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 400px;
        }

        @media (max-width: 768px) {
          .card-flex {
            justify-content: center;
          }

          .loom-heading {
            font-size: 2rem;
          }

          .loom-buttons a {
            width: 100%;
            justify-content: center;
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
        }
      `}</style>
    </div>
  );
};

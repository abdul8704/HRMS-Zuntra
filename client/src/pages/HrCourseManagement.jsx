import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";

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

      <style>{`
        .scrollable-content {
          flex-grow: 1;
          overflow-y: auto;
        }

        .card-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 5rem;
          padding: 1rem 0.5rem 1rem 2rem; /* 👈 Reduces right padding */
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .card-flex {
            justify-content: center;
            padding: 1rem;
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

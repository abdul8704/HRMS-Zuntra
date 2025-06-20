import { Sidebar } from "../components/Sidebar"
import { CourseCard } from '../components/coursemanagement/CourseCard'
import { CourseNavbar } from '../components/coursemanagement/CourseNavbar'

export const HrCourseManagement = () => {
  return (
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <CourseNavbar />
        <div className="project-cards-container">
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Helen Coasta"
            duration="at your own pace"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Generative AI"
            instructor="Georgia"
            duration="In 3 Weeks"
            rating={3.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Full stack developer"
            instructor="Millie Brown"
            duration="In 2 Months"
            rating={3}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Angelin Berry"
            duration="at your own pace"
            rating={3.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Telecommunication"
            instructor="Thara Stelin"
            duration="In 3 Weeks"
            rating={3}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Data Science"
            instructor="Regina George"
            duration="at your own pace"
            rating={4}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Cloud basics"
            instructor="Marcus Franklin"
            duration="In 4 Months"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Steve Harrington"
            duration="In 3 Weeks"
            rating={3.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="Data science"
            instructor="Joslelin Friesta"
            duration="at your own pace"
            rating={4.5}
          />
        </div>

        {/* ✅ Responsive CSS */}
        <style>{`
          .project-cards-container {
            display: flex;
            flexWrap: wrap;
            gap: 2rem;
            margin-top: 35px;
            padding: 1rem;
            max-width: 100%;
            overflow-x: hidden;
          }

          @media (max-width: 1024px) {
            .project-cards-container {
              grid-template-columns: repeat(2, 1fr);
              padding: 0.75rem;
            }
          }

          @media (max-width: 768px) {
            .project-cards-container {
              grid-template-columns: 1fr;
              padding: 0.5rem;
            }
          }

          @media (max-width: 480px) {
            .project-cards-container {
              gap: 1rem;
              padding: 0.5rem 0.25rem;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

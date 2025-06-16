import { Sidebar } from "../components/Sidebar"
import { CourseCard } from '../components/courseManagement/CourseCard'
import { CourseNavbar } from '../components/courseManagement/CourseNavbar'
export const HrCourseManagement = () => {
  return (
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <CourseNavbar />
        <div className="project-cards-container">
          <CourseCard />
        </div>
        <style jsx>{`
        .project-cards-container{
          display: flex;
          flex-wrap: wrap;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
      </div>
    </div>
  )
}

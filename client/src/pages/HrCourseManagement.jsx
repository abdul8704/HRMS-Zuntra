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
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
           <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
           
           <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
          <CourseCard
            image="https://img.icons8.com/fluency/96/graduation-cap.png"
            title="React Basics"
            instructor="Jane Doe"
            duration="In 3 Weeks"
            rating={4.5}
          />
        </div>
        <style>{`
        .project-cards-container{
          display: grid;
          grid-template-columns: repeat(3, 1fr); 
          margin-top: 35px;
          margin-left: 40px;
          column-gap: 2rem;
          row-gap: 2rem;   
          max-height:100%;
          max-width:100%;
          overflow-y:auto;
          overflow-x:hidden;
          padding:1rem;
        }
      `}</style>
      </div>
    </div>
  )
}

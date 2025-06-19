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
        <style>{`
        .project-cards-container{
          display: grid;
          grid-template-columns: repeat(3, 1fr); 
          margin-top: 35px;
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

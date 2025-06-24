import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from '../components/projectManagement/ProjectCard';
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar';
import { Link, useParams } from 'react-router-dom';
import { ProjectPopup } from '../components/projectManagement/ProjectPopup';
import { TaskCard } from '../components/projectManagement/TaskCard';

export const HrProjectManagement = () => {
  const { navId } = useParams();

 const projects = [
  {
    title: "Project 1",
    subtitle: "Data Drifters",
    description: "Analyzing large datasets to uncover trends and patterns. Data is the new oil!",
    user: {
      name: "Abish DM",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  },
  {
    title: "Project 2",
    subtitle: "Code Blazers",
    description: "Building resilient APIs for high-traffic platforms with Node.js and Express.",
    user: {
      name: "Elena Morris",
      role: "Backend Developer",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  },
  {
    title: "Project 3",
    subtitle: "UI Surge",
    description: "Creating user interfaces that are both beautiful and intuitive using React.",
    user: {
      name: "Ravi Kumar",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
  },
  {
    title: "Project 4",
    subtitle: "Bug Busters",
    description: "Squashing bugs and improving test coverage across the codebase.",
    user: {
      name: "Sarah Lee",
      role: "QA Engineer",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  },
  {
    title: "Project 5",
    subtitle: "AI Innovators",
    description: "Designing ML models that learn and adapt with minimal supervision.",
    user: {
      name: "Vikram Patel",
      role: "ML Engineer",
      avatar: "https://i.pravatar.cc/100?img=9",
    },
  },
  {
    title: "Project 6",
    subtitle: "Cloud Surfers",
    description: "Migrating legacy systems to scalable cloud infrastructure using AWS.",
    user: {
      name: "Tina Ray",
      role: "Cloud Architect",
      avatar: "https://i.pravatar.cc/100?img=10",
    },
  },
  {
    title: "Project 7",
    subtitle: "Security Squad",
    description: "Implementing authentication, authorization, and encryption protocols.",
    user: {
      name: "Harsh Mehta",
      role: "Security Engineer",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
  },
  {
    title: "Project 8",
    subtitle: "DevOps Ninjas",
    description: "CI/CD pipelines, monitoring, and automated deployments across environments.",
    user: {
      name: "Lily Thomas",
      role: "DevOps Engineer",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    title: "Project 9",
    subtitle: "Visioneers",
    description: "Working on computer vision projects to identify objects in real-time.",
    user: {
      name: "Ankit Sharma",
      role: "Computer Vision Specialist",
      avatar: "https://i.pravatar.cc/100?img=13",
    },
  },
  {
    title: "Project 10",
    subtitle: "VoiceVerse",
    description: "Building voice recognition engines for multilingual support.",
    user: {
      name: "Nisha Rao",
      role: "Speech Engineer",
      avatar: "https://i.pravatar.cc/100?img=14",
    },
  },
];

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <ProjectNavbar />
<div className="project-cards-container">
  {projects.map((project, index) => (
    <Link to="/project/overview" key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ProjectCard projectData={project} />
    </Link>
  ))}
</div>

        </div>
      </div>
      <ProjectPopup />
      <style>{`
        .project-cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          margin-top: 1.5rem;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );

  const [activeTab, setActiveTab] = useState("todo");

  const tasks = [
    {
      title: "Design Homepage Layout",
      description: "Create wireframes and mockups for the new homepage design. Focus on user experience and mobile responsiveness.",
      user: {
        name: "John Doe",
        role: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/100?img=1"
      },
      timeLeft: "3 Months left",
      completionDate: "Dec 15, 2024"
    },
    {
      title: "API Integration",
      description: "Integrate payment gateway API with the frontend application. Ensure proper error handling and security.",
      user: {
        name: "Jane Smith",
        role: "Full Stack Developer",
        avatar: "https://i.pravatar.cc/100?img=2"
      },
      timeLeft: "2 Weeks left",
      completionDate: "Dec 10, 2024"
    },
    {
      title: "Database Migration",
      description: "Migrate user data from legacy system to new database schema. Backup all data before migration.",
      user: {
        name: "Mike Johnson",
        role: "Backend Developer",
        avatar: "https://i.pravatar.cc/100?img=3"
      },
      timeLeft: "1 Month left",
      completionDate: "Dec 20, 2024"
    },
    {
      title: "Testing Suite",
      description: "Create comprehensive testing suite for the new features. Include unit tests, integration tests, and e2e tests.",
      user: {
        name: "Sarah Wilson",
        role: "QA Engineer",
        avatar: "https://i.pravatar.cc/100?img=4"
      },
      timeLeft: "2 Months left",
      completionDate: "Dec 8, 2024"
    },
    {
      title: "Performance Optimization",
      description: "Optimize application performance by reducing load times and improving code efficiency.",
      user: {
        name: "David Brown",
        role: "Senior Developer",
        avatar: "https://i.pravatar.cc/100?img=5"
      },
      timeLeft: "3 Weeks left",
      completionDate: "Dec 12, 2024"
    },
    {
      title: "Security Audit",
      description: "Conduct thorough security audit of the application. Check for vulnerabilities and implement fixes.",
      user: {
        name: "Lisa Garcia",
        role: "Security Engineer",
        avatar: "https://i.pravatar.cc/100?img=6"
      },
      timeLeft: "1 Week left",
      completionDate: "Dec 18, 2024"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <TaskNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <TaskCard 
                key={index} 
                taskData={task} 
                taskStatus={activeTab}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { CourseCard } from "./components/CourseCard";
import AddCourse from "./components/AddCourse";
import Module from "./components/Module";
import SubModule from "./components/SubModule";
import { Loading } from "../utils/Loading";
import api from "../../api/axios";
import { AddCourseMod } from "./components/AddCourseMod";
import {AddCourseSubModule} from "./components/AddCourseSubModule"


export const CourseManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();

  // Filter states
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [instructorSearchTerm, setInstructorSearchTerm] = useState("All Instructors");
  const [selectedInstructor, setSelectedInstructor] = useState("All Instructors");
  const [showCourseTypeDropdown, setShowCourseTypeDropdown] = useState(false);
  const [selectedCourseType, setSelectedCourseType] = useState("All Types");

  // Declare instructors array (you can replace this with API data later)
  const instructors = [
    "John Smith",
    "Sarah Johnson",
    "Michael Chen",
    "Emily Davis",
    "Robert Wilson",
    "Lisa Anderson"
  ];

  const courseTypes = ["Self Paced", "Scheduled Time"];

  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    instructor: "",
    courseId: "",
    courseDescription: "",
    introVideoUrl: "",
    tags: "",
  });

  const [modules, setModules] = useState([
    {
      moduleTitle: "",
      subModules: [
        {
          submoduleTitle: "",
          videoUrl: "",
          description: "",
          assignment: [],
        },
      ],
    },
  ]);

  const [errorFields, setErrorFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");

  const validTabs = ["all", "create", "add"];

  useEffect(() => {
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }
  }, [navId]);

  useEffect(() => {
    // Force component to acknowledge filter changes
    console.log('Filter state changed:', {
      searchTerm,
      selectedInstructor,
      selectedCourseType,
      isFilterActive
    });
  }, [searchTerm, selectedInstructor, selectedCourseType, isFilterActive]);

  useEffect(() => {
    handleClearFilters();
  }, [navId]);

  useEffect(() => {
    if (navId === "create" || navId === "add") return;

    const fetchCourses = async () => {
      setLoading(true);
      setApiMessage("");

      try {
        const res = await api.get(`/api/course/`);
        if (res.data.success) {
          setCourses(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || "Something went wrong.");
          setCourses([]);
        }
      } catch (error) {
        setApiMessage("Error fetching courses.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navId, navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.instructor-dropdown')) {
        setShowInstructorDropdown(false);
      }
      if (!event.target.closest('.course-type-dropdown')) {
        setShowCourseTypeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allInstructorsList = ["All Instructors", ...instructors];
  const allCourseTypesList = ["All Types", ...courseTypes];

  // Show all instructors when dropdown is opened or when search is empty
  const filteredInstructors = instructorSearchTerm.trim() === "" || instructorSearchTerm === selectedInstructor
    ? allInstructorsList
    : allInstructorsList.filter((instructor) =>
      instructor.toLowerCase().includes(instructorSearchTerm.toLowerCase())
    );

  // Filter courses based on all active filters
  const filteredCourses = courses.filter((course) => {
    // Search filter (course name, description, tags)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        course.courseName?.toLowerCase().includes(term) ||
        course.courseDescription?.toLowerCase().includes(term) ||
        course.tags?.toLowerCase().includes(term);
      if (!matchesSearch) return false;
    }

    // Instructor filter
    if (selectedInstructor !== "All Instructors" && course.instructor !== selectedInstructor) {
      return false;
    }

    // Course type filter (you may need to adjust this based on your course data structure)
    if (selectedCourseType !== "All Types") {
      // Assuming you have a courseType field in your course data
      // If not, you'll need to add this field to your course data
      if (course.courseType !== selectedCourseType) {
        return false;
      }
    }

    return true;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedInstructor("All Instructors");
    setInstructorSearchTerm("All Instructors");
    setSelectedCourseType("All Types");
    setShowInstructorDropdown(false);
    setShowCourseTypeDropdown(false);
    setIsFilterActive(false);
  };

  const handleModuleTitleChange = (moduleIndex, newTitle) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].moduleTitle = newTitle;
    setModules(updatedModules);
  };

  const handleSubModuleChange = (moduleIndex, subIndex, updatedSubModule) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules[subIndex] = updatedSubModule;
    setModules(updatedModules);
  };

  const handleAssignmentChange = (moduleIndex, subIndex, updatedAssignment) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules[subIndex].assignment = updatedAssignment;
    setModules(updatedModules);
  };

  const handleDeleteSubModule = (moduleIndex, subIndex) => {
    const subModules = modules[moduleIndex].subModules;
    if (subModules.length === 1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules = subModules.filter((_, idx) => idx !== subIndex);
    setModules(updatedModules);
  };

  const handleDeleteModule = (moduleIndex) => {
    if (modules.length === 1) return;
    const updatedModules = [...modules];
    updatedModules.splice(moduleIndex, 1);
    setModules(updatedModules);
  };

  const isSubModuleValid = (subModule) =>
    subModule.submoduleTitle && subModule.videoUrl && subModule.description;

  const isModuleValid = (module) =>
    module.moduleTitle &&
    module.subModules.length > 0 &&
    isSubModuleValid(module.subModules.at(-1));

  const handleAddSubModule = (moduleIndex) => {
    const lastSub = modules[moduleIndex].subModules.at(-1);
    if (!isSubModuleValid(lastSub)) {
      alert("Please complete all SubModule fields before adding another.");
      return;
    }
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules.push({
      submoduleTitle: "",
      videoUrl: "",
      description: "",
      assignment: [],
    });
    setModules(updatedModules);
  };

  const handleAddModule = () => {
    const lastModule = modules.at(-1);
    if (!isModuleValid(lastModule)) {
      alert("Complete all Module and SubModule fields before adding another module.");
      return;
    }
    setModules([
      ...modules,
      {
        moduleTitle: "",
        subModules: [
          {
            submoduleTitle: "",
            videoUrl: "",
            description: "",
            assignment: [],
          },
        ],
      },
    ]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let errors = [];

    for (const key in courseInfo) {
      if (!courseInfo[key]) errors.push(key);
    }

    modules.forEach((mod, modIndex) => {
      if (!mod.moduleTitle) errors.push(`module-${modIndex}`);
      mod.subModules.forEach((sub, subIndex) => {
        if (!sub.submoduleTitle) errors.push(`submoduleTitle-${modIndex}-${subIndex}`);
        if (!sub.videoUrl) errors.push(`videoUrl-${modIndex}-${subIndex}`);
        if (!sub.description) errors.push(`description-${modIndex}-${subIndex}`);
      });
    });

    setErrorFields(errors);
    if (errors.length > 0) {
      alert("Please fill all required fields!");
      return;
    }

    alert("✅ Course Submitted!");
  };

  const isError = (fieldId) => submitted && errorFields.includes(fieldId);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 p-4 gap-4 overflow-hidden">
        <Navbar
          type="courseManagement"
          showFilter={true}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
          handleClearFilters={handleClearFilters}
        />

        {/* Filter Section */}
        {isFilterActive && navId === "all" && (
          <div className="w-full bg-[#BBD3CC] rounded-xl flex gap-2 p-2">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by course name, description, or tags"
              className="bg-white/50 flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Instructor Dropdown */}
            <div className="relative flex-1 instructor-dropdown">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search instructors..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
                  value={instructorSearchTerm}
                  onChange={(e) => {
                    setInstructorSearchTerm(e.target.value);
                    setShowInstructorDropdown(true);
                  }}
                  onFocus={() => setShowInstructorDropdown(true)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
                  onClick={() => {
                    setShowInstructorDropdown(!showInstructorDropdown);
                    if (!showInstructorDropdown) {
                      setInstructorSearchTerm("");
                    }
                  }}
                >
                  <svg className={`w-4 h-4 transition-transform ${showInstructorDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {showInstructorDropdown && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredInstructors.length === 0 ? (
                    <div className="px-3 py-2 text-gray-500">No instructors found</div>
                  ) : (
                    filteredInstructors.map((instructor, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedInstructor === instructor ? 'bg-[#BBD3CC]' : ''
                          }`}
                        onClick={() => {
                          setSelectedInstructor(instructor);
                          setInstructorSearchTerm(instructor);
                          setShowInstructorDropdown(false);
                        }}
                      >
                        {instructor}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Course Type Dropdown */}
            <div className="relative flex-1 course-type-dropdown">
              <div
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#A6C4BA] flex items-center justify-between"
                onClick={() => setShowCourseTypeDropdown((prev) => !prev)}
              >
                <span>{selectedCourseType}</span>
                <svg className={`w-4 h-4 transition-transform ${showCourseTypeDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showCourseTypeDropdown && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                  {allCourseTypesList.map((type) => (
                    <div
                      key={type}
                      className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedCourseType === type ? 'bg-[#BBD3CC]' : ''
                        }`}
                      onClick={() => {
                        setSelectedCourseType(type);
                        setShowCourseTypeDropdown(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-white/70 text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
        )}

        {/* Filter Summary */}
        {isFilterActive && navId === "all" && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
            <div className="flex gap-2">
              {searchTerm && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Search: "{searchTerm}"</span>}
              {selectedInstructor !== "All Instructors" && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Instructor: {selectedInstructor}</span>}
              {selectedCourseType !== "All Types" && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Type: {selectedCourseType}</span>}
            </div>
          </div>
        )}

        {loading && <Loading />}

        {/* Updated Grid Layout for Course Cards */}
        {!loading && navId === "all" && (
          <div className="flex-1 overflow-y-auto">
            {filteredCourses.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 font-medium">
                {courses.length === 0 ? "No courses available" : "No courses match the current filters"}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {filteredCourses.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/course/${index}/intro`)}
                    className="cursor-pointer h-full"
                  >
                    <CourseCard key={index} {...course} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {navId === "create" && (
          <div className="flex-1 flex flex-col justify-center items-center text-center overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-8">Record with Loom</h1>

            <button onClick={() => window.open('https://www.loom.com/lp/screen-capture-lp?utm_xl=&utm_term=video%20screen%20capture_p&utm_campaign=loom_google_6800_self-serve_web_in_google-search_conversions_cpa_work-signup_non-brand_x_1-8-2024_screen-capture&utm_source=adwords&utm_medium=ppc&utm_content=chrome_cta&hsa_acc=4481576800&hsa_cam=20921277822&hsa_grp=158601799578&hsa_ad=687070555152&hsa_src=g&hsa_tgt=kwd-110016097&hsa_kw=video%20screen%20capture&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=20921277822&gbraid=0AAAAABgZlEv5iw3jtuQcz0lKTBBV3WcNF&gclid=CjwKCAjwyb3DBhBlEiwAqZLe5MrbZ3Y39ZU6JfhaYNYr4B1rfT-04nsVum_DbR-ICVBBrqZ0L5KVhxoCW58QAvD_BwE', '_blank')} className="bg-[#A6C4BA] hover:bg-[#BBD3CC] text-white font-bold text-base h-12 w-72 rounded-full flex items-center justify-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40">
                <path fill="#625DF5" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z" />
              </svg>
              Go to Loom Website
            </button>

            <button onClick={() => window.open('https://www.loom.com/', '_blank')} className="bg-[#A6C4BA] hover:bg-[#BBD3CC] text-white font-bold text-base h-12 w-72 rounded-full flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" />
              </svg>
              Install Loom Extension
            </button>
          </div>
        )}

        {navId === "add" && (
          <div className="flex-1 overflow-hidden px-4">
              {/* Course Basic Info */}
              {/* <AddCourse
                courseData={courseInfo}
                onChange={setCourseInfo}
                errors={errorFields}
                submitted={submitted}
              /> */}
              <AddCourseMod />
              <AddCourseSubModule/>

              {/* Assignment Dropdown */}
              {/* <AssignmentModule
                initialQuestions={modules[0].subModules[0].assignment}
                onAssignmentChange={(assignment) => {
                  const updatedModules = [...modules];
                  updatedModules[0].subModules[0].assignment = assignment;
                  setModules(updatedModules);
                }}
              /> */}

              {/* Submit Button
              <button
                onClick={handleSubmit}
                className="bg-gray-500 text-white mt-6 px-8 py-3 rounded hover:bg-gray-600"
              >
                Submit Course
              </button> */}
            </div>
        )}

      </div>
    </div>
  );
};
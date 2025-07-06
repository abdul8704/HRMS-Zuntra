import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  Mail,
  Phone,
  DollarSign,
  Edit3,
  ChevronRight,
  X,
} from "lucide-react";
import ZuntraLogo from "../assets/Zuntra.svg";
import EditProfileCard from "./employeeManagement/EditProfilePopup";
import api from "../api/axios";

export default function SidebarDetails({ type = "user" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const { userId, roleId } = useParams();

  const handleEditProfile = () => setShowEditCard(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (type === "user" && userId) {
      fetchEmployee(userId);
    }
  }, [type, userId]);

  const fetchEmployee = async (empId) => {
    setLoading(true);
    setApiMessage("");
    try {
      const res = await api.get(`/api/employee/${empId}`);
      if (res.data.success) {
        setEmployeeData(res.data.data);
      } else {
        setApiMessage(res.data.message || "Failed to load employee.");
        setEmployeeData(null);
      }
    } catch (err) {
      setApiMessage("Error fetching employee.");
      setEmployeeData(null);
    } finally {
      setLoading(false);
    }
  };
  console.log(employeeData);

  const roleData = {
    roleName: "Admin",
    description: "Manages platform-level access and user settings.",
  };

  if (type === "role") {
    console.log("Role ID:", roleId);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[999] transition-opacity duration-300 ${
          isMobile && isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed top-0 left-0 z-[1000] transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        } bg-[#BBD3CC] shadow-2xl w-full md:w-[320px] min-h-screen`}
      >
        {/* Mobile Close Button */}
        {isMobile && isOpen && (
          <div className="absolute top-4 right-4 z-10">
            <button
              className="w-10 h-10 rounded-full bg-white text-black/50 shadow-md flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Logo */}
        <div className="pt-16 md:pt-6 pb-6 px-6 flex justify-center">
          <img
            src={ZuntraLogo}
            alt="ZUNTRA DIGITAL Logo"
            className="h-[50px] w-auto object-contain"
          />
        </div>

        {/* USER: Render dynamic data */}
        {type === "user" && (
          <div className="px-6 pb-8">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : apiMessage ? (
              <p className="text-center text-red-500">{apiMessage}</p>
            ) : employeeData ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-[140px] md:w-[160px] h-[140px] md:h-[160px] bg-white rounded-full p-1 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-300">
                      <img
                        src={
                          employeeData.profileImage ||
                          "https://via.placeholder.com/160"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-black opacity-100 text-xl md:text-2xl font-normal mb-1">
                    {employeeData.name}
                  </h2>
                  <p className="text-black opacity-50">{employeeData.title}</p>
                </div>

                <div className="flex flex-col gap-4 text-black opacity-50">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>{employeeData.team || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span className="text-xs md:text-sm break-all">
                      {employeeData.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>{employeeData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    <span>{employeeData.salary}</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={handleEditProfile}
                    className="w-full bg-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-100 border border-gray-200 flex items-center justify-center gap-2 text-black opacity-50"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* ROLE: Static Data */}
        {type === "role" && (
          <div className="px-6 pb-8 text-center text-black">
            <h2 className="text-xl font-semibold mb-2">{roleData.roleName}</h2>
            <p className="opacity-60">{roleData.description}</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      {!isOpen && isMobile && (
        <div className="fixed top-[4rem] -left-[10px] w-12 h-12 bg-[#bcd4cd] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-[1000]">
          <button
            className="w-10 h-10 rounded-full bg-white text-black/50 shadow-md flex items-center justify-center hover:bg-gray-200 transition"
            onClick={() => setIsOpen(true)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1100] flex items-center justify-center animate-fadeIn">
          <EditProfileCard onClose={() => setShowEditCard(false)} />
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-in-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

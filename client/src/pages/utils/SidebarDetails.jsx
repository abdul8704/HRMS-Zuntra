import { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  Edit3,
  ChevronRight,
  X,
  Clock,
  User,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import ZuntraLogo from "../../assets/Zuntra.svg";
import { EditProfileCard } from "../employee/components/EditProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import api, { BASE_URL } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "./Loading";

export function SidebarDetails({ type }) {
  const navigate = useNavigate();
  const params = useParams();
  const empId = type === "user" ? params.empId : null;
  const roleId = type === "role" ? params.roleId : null;
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleEditProfile = () => setShowEditCard((prev) => !prev);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        if (empRes.data.success) {
          setData(empRes.data.employeeDetail);
        }
        if (courseRes.data.success) {
          console.log("User Enrolled Courses:", courseRes.data);
        }
      } catch (err) {
        console.error(
          "Error fetching user details:",
          err?.response?.data?.message || err.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRoleData = async () => {
      setIsLoading(true);
      try {
        // 🔹 placeholder API call
        const roleRes = await api.get(`/api/roles/${roleId}`);
        console.log(roleRes);
        if (roleRes.data.success) {
          setData(roleRes.data.data);
        }
      } catch (err) {
        console.error(
          "Error fetching role details:",
          err?.response?.data?.message || err.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (type === "user") {
      fetchUserData();
    } else if (type === "role" && roleId) {
      fetchRoleData();
    }
  }, [type, empId, roleId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Overlay for mobile sidebar */}
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
        } bg-[#BBD3CC] shadow-2xl w-full md:w-[320px] min-h-screen flex flex-col`}
      >
        {/* Close button for mobile */}
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

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            className="text-xl font-bold text-black hover:scale-110 transition"
            onClick={() => {
              if (type === "user") {
                navigate("/employee/all");
              } else if (type === "role") {
                navigate("/employee/roles");
              }
            }}
          >
            ←
          </button>
        </div>

        {/* Logo */}
        <div className="pt-16 md:pt-6 pb-4 px-6 flex justify-center">
          <img
            src={ZuntraLogo}
            alt="ZUNTRA DIGITAL Logo"
            className="h-[50px] w-auto object-contain"
          />
        </div>

        {isLoading && <Loading />}

        {/* User Details */}
        {type === "user" && !isLoading && data && (
          <>
            {/* Header */}
            <div className="px-6 pb-6">
              <div className="flex justify-center mb-6">
                <div className="w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] rounded-full overflow-hidden bg-gray-300">
                  <img
                    src={`${BASE_URL}/uploads/profilePictures/${data._id}.png`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-black text-xl md:text-2xl font-semibold">
                  {data.username}
                </h2>
              </div>

              <div className="flex justify-center m-1">
                <div
                  className="rounded-full px-3 py-1 text-white text-center text-sm font-medium"
                  style={{ backgroundColor: data.role?.color || "#ccc" }}
                >
                  {data.role?.role}
                </div>
              </div>

              <div className="text-center text-black/80 text-sm space-y-1">
                <p className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.phoneNumber}
                </p>
                <p className="flex items-center justify-center gap-2 break-all">
                  <Mail className="w-4 h-4" />
                  {data.email}
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5 text-sm text-black opacity-60">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">Joined Date:</span>{" "}
                  <span className="text-black/80">
                    {new Date(data.dateJoined).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">Shift:</span>{" "}
                  <span className="text-black/80">
                    {data.shift?.shiftName
                      ? data.shift.shiftName
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">Branch:</span>{" "}
                  <span className="text-black/80">
                    {data.campus?.campusName || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">DOB:</span>{" "}
                  <span className="text-black/80">
                    {new Date(data.personalDetail?.DOB).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">Religion:</span>{" "}
                  <span className="text-black/80">
                    {data.personalDetail?.religion || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-black/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Address:</span>{" "}
                  <span className="text-black/80 break-words">
                    {data.personalDetail?.Address || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-black/70 flex-shrink-0" />
                <div>
                  <span className="font-medium">Salary:</span>{" "}
                  <span className="text-black/80">
                    ₹{data.personalDetail?.Salary || 0}/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Edit Button */}
            {String(user?._id) === String(empId) && (
              <div className="sticky bottom-0 bg-[#BBD3CC] px-6 py-4">
                <button
                  onClick={handleEditProfile}
                  className="w-full bg-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-100 border border-gray-200 flex items-center justify-center gap-2 text-black opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </>
        )}

        {type === "role" && !isLoading && data && (
  <>
    {/* Header - Circle Icon with role color */}
    <div className="px-6 pb-6">
      <div className="flex justify-center mb-6">
        <div
          className="w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
          style={{ backgroundColor: data.color || "#ccc" }}
        >
          <User className="w-12 h-12 text-[#000]" />
        </div>
      </div>

      {/* Role Name */}
      <div className="text-center">
        <h2 className="text-black text-xl md:text-2xl font-semibold">
          {data.role}
        </h2>
      </div>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5 text-sm text-black opacity-70">
      <div className="flex items-center gap-3">
        <Users className="w-4 h-4 text-black/70 flex-shrink-0" />
        <div>
          <span className="font-medium">Number of Users:</span>{" "}
          <span className="text-black/80">{data.userCount || 0}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DollarSign className="w-4 h-4 text-black/70 flex-shrink-0" />
        <div>
          <span className="font-medium">Base Salary:</span>{" "}
          <span className="text-black/80">
            ₹{data.baseSalary || 0}/hr
          </span>
        </div>
      </div>

      {/* Allowed Access Section */}
      <div>
        <h3 className="font-medium text-black mb-2">Access Granted</h3>
        <div className="flex flex-wrap gap-2">
          {data.allowedAccess?.length > 0 ? (
            data.allowedAccess.map((access, idx) => (
              <span
                key={idx}
                className="bg-white/30 px-2 py-1 rounded-full text-[0.7rem] font-medium text-black shadow-sm border border-gray-200"
              >
                {access}
              </span>
            ))
          ) : (
            <span className="text-black/60 text-sm">No access defined</span>
          )}
        </div>
      </div>
    </div>
  </>
)}

      </div>

      {/* Sidebar toggle for mobile */}
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
          <EditProfileCard data={data} onClose={handleEditProfile} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}

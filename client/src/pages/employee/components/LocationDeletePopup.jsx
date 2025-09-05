import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const LocationDeletePopup = ({
  isOpen,
  onClose,
  onConfirm, // Add this prop to handle success callback
  locationName,
  oldCampusId,
}) => {
  const [campuses, setCampuses] = useState([]);
  const [newCampusId, setNewCampusId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("/api/branch/")
        .then((res) => {
          console.log("branches response:", res.data);

          const list = Array.isArray(res.data?.branches) ? res.data.branches : [];
          const filtered = list.filter((c) => c._id !== oldCampusId);

          setCampuses(filtered);

          if (filtered.length > 0) {
            setNewCampusId(filtered[0]._id);
          }
        })
        .catch(() => toast.error("Failed to fetch campus list for reassignment"));
    }
  }, [isOpen, oldCampusId]);

  const handleDelete = async () => {
    if (!oldCampusId) {
      toast.error("Missing campus ID");
      return;
    }

    if (campuses.length > 0 && !newCampusId) {
      toast.error("Please select a campus to move users to");
      return;
    }

    setIsDeleting(true);

    try {
      console.log("Deleting campus:", oldCampusId, "Moving users to:", newCampusId);

      // Build URL with query parameters only (to match current backend route)
      let deleteUrl = `/api/branch/delete-branch?oldCampusId=${oldCampusId}`;
      
      // Add newCampusId query parameter if selected
      if (newCampusId) {
        deleteUrl += `&newCampusId=${newCampusId}`;
      }

      const response = await axios.delete(deleteUrl);

      if (response.data?.success) {
        toast.success("Branch deleted successfully");
        if (onConfirm) onConfirm(); // Call parent's success handler
        onClose();
      } else {
        throw new Error(response.data?.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Delete URL was:", deleteUrl);
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete branch";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete
            {locationName && (
              <span className="font-medium"> "{locationName}"</span>
            )}
            ?
          </p>

          {/* Only show dropdown if there are other campuses */}
          {campuses.length > 0 && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Move users to:
              </label>
              <select
                className="w-full border rounded-md p-2"
                value={newCampusId}
                onChange={(e) => setNewCampusId(e.target.value)}
                disabled={isDeleting}
              >
                <option value="">-- Select a campus --</option>
                {campuses.map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.campusName}
                  </option>
                ))}
              </select>
            </>
          )}

          {campuses.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">
              Warning: This is the only campus. All users will need to be reassigned manually.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-400 rounded-md transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || (campuses.length > 0 && !newCampusId)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300 rounded-md transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDeletePopup;
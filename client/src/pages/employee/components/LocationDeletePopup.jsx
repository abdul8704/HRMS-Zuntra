import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const LocationDeletePopup = ({
  isOpen,
  onClose,
  locationName,
  oldCampusId,
  branchName,
}) => {
  const [campuses, setCampuses] = useState([]);
  const [newCampusId, setNewCampusId] = useState("");

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
  try {
    console.log("Deleting with:", oldCampusId, branchName);

    await axios.delete("/api/branch/delete-branch", {
      data: { oldCampusId }   // ✅ send id in request body (since backend expects it this way)
    });

    alert("Branch deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete branch");
  } finally {
    setShowDeletePopup(false);
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

          {/* Dropdown to select replacement campus */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Move users to:
          </label>
          <select
            className="w-full border rounded-md p-2"
            value={newCampusId}
            onChange={(e) => setNewCampusId(e.target.value)}
          >
            <option value="">-- Select a campus --</option>
            {campuses.map((campus) => (
              <option key={campus._id} value={campus._id}>
                {campus.campusName}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-400 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDeletePopup;

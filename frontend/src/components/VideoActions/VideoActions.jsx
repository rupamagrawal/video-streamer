import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, axiosInstance } from "../../context/AuthContext";

export default function VideoActions({ videoId, ownerId, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isOwner = user?._id === ownerId;

  if (!isOwner) return null;

  const handleEdit = () => {
    navigate(`/edit-video/${videoId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/video/${videoId}`);
      alert("Video deleted successfully");
      onDelete?.();
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete video");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsUpdating(true);
    try {
      await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`,
        {}
      );
      alert("Publish status updated");
      window.location.reload(); // Refresh to see changes
    } catch (err) {
      console.error("Publish toggle error:", err);
      alert("Failed to update publish status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-white hover:text-gray-400 text-2xl transition"
        title="Video options"
      >
        ⋮
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700">
          <button
            onClick={handleEdit}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-lg transition flex items-center gap-2"
          >
            ✏️ Edit Video
          </button>

          <button
            onClick={handleTogglePublish}
            disabled={isUpdating}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            🔄 Toggle Publish
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full text-left px-4 py-2 hover:bg-red-900 rounded-b-lg transition flex items-center gap-2 text-red-400 disabled:opacity-50"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

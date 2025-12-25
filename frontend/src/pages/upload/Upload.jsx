import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../context/AuthContext";
import { getValidationError } from "../../utils/validation";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (field, value) => {
    if (field === "title") setTitle(value);
    if (field === "description") setDescription(value);
    
    if (value && errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!videoFile) {
      newErrors.videoFile = "Video file is required";
    }

    if (!thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbPreview(URL.createObjectURL(file));
    if (errors.thumbnail) {
      setErrors({ ...errors, thumbnail: "" });
    }
  };

  const handleUpload = async () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await axiosInstance.post(
        "/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Video uploaded successfully!");
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Upload failed";
      setErrors({ general: errorMsg });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center px-6 py-10">
      <div className="bg-gray-900 p-8 rounded-xl max-w-2xl w-full shadow-lg border border-gray-800">

        <h1 className="text-3xl font-semibold mb-6">Upload a New Video</h1>

        {errors.general && (
          <p className="text-red-400 text-sm mb-4">{errors.general}</p>
        )}

        {/* Title */}
        <input
          className="w-full p-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mb-3">{errors.title}</p>
        )}

        {/* Description */}
        <textarea
          className="w-full p-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Video Description"
          value={description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          rows="3"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mb-3">{errors.description}</p>
        )}

        {/* Video Upload Box */}
        <label className="block mb-1">
          <span className="font-medium">Upload Video File</span>

          <div className="mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300 cursor-pointer hover:bg-gray-700 transition-all"
               onClick={() => document.getElementById("videoInput").click()}>
            {videoFile ? (
              <p className="text-green-400">📹 {videoFile.name}</p>
            ) : (
              <p>Click here to choose a video file</p>
            )}
          </div>

          <input
            id="videoInput"
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideoFile(e.target.files[0]);
              if (e.target.files[0] && errors.videoFile) {
                setErrors({ ...errors, videoFile: "" });
              }
            }}
            className="hidden"
          />
        </label>
        {errors.videoFile && (
          <p className="text-red-400 text-sm mb-3">{errors.videoFile}</p>
        )}

        {/* Thumbnail Upload */}
        <label className="block mb-1">
          <span className="font-medium">Upload Thumbnail</span>

          <div
            className="mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300 cursor-pointer hover:bg-gray-700 transition-all"
            onClick={() => document.getElementById("thumbInput").click()}
          >
            {thumbnail ? (
              <p className="text-green-400">🖼 Thumbnail Selected</p>
            ) : (
              <p>Click here to choose a thumbnail</p>
            )}
          </div>

          <input
            id="thumbInput"
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="hidden"
          />
        </label>
        {errors.thumbnail && (
          <p className="text-red-400 text-sm mb-3">{errors.thumbnail}</p>
        )}

        {/* Thumbnail Preview */}
        {thumbPreview && (
          <img
            src={thumbPreview}
            alt="Thumbnail preview"
            className="rounded-lg mb-6 w-full max-h-64 object-cover border border-gray-700"
          />
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-lg font-medium transition-all"
        >
          {isLoading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
}

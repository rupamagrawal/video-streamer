import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const navigate = useNavigate();

  async function handleUploadVideo() {
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("videoFile", videoFile);
      form.append("thumbnail", thumbnail);

      await axios.post(
        "http://localhost:8000/api/v1/video",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Video uploaded successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Upload Fail!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">

      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-xl">
        
        <h2 className="text-2xl font-semibold mb-6">Upload New Video</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />

        {/* Description */}
        <textarea
          placeholder="Enter video description"
          value={description}
          onChange={(e) => setDescripton(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 mb-4"
          rows="3"
        ></textarea>

        {/* Video File */}
        <label className="block mb-2 text-gray-300">Select Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer mb-4"
        />

        {/* Thumbnail */}
        <label className="block mb-2 text-gray-300">Select Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer mb-4"
        />

        {/* Upload Button */}
        <button
          onClick={handleUploadVideo}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-4"
        >
          Upload Video
        </button>

      </div>

    </div>
  );
}

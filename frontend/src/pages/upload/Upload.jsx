import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!title || !description || !videoFile || !thumbnail) {
      return alert("All fields are required!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/video",
        formData,
        { withCredentials: true }
      );

      alert("Video uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      alert("Upload failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center px-6 py-10">
      <div className="bg-gray-900 p-8 rounded-xl max-w-2xl w-full shadow-lg border border-gray-800">

        <h1 className="text-3xl font-semibold mb-6">Upload a New Video</h1>

        {/* Title */}
        <input
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        {/* Video Upload Box */}
        <label className="block mb-6">
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
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* Thumbnail Upload */}
        <label className="block mb-6">
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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-medium transition-all"
        >
          Upload Video
        </button>
      </div>
    </div>
  );
}

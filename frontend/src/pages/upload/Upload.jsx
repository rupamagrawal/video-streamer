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

      const response = await axios.post(
        `http://localhost:8000/api/v1/video`,
        form
      );
      alert("Video uploaded successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Upload Fail!");
    }
  }

  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        name="Description"
        placeholder="Add Description Here"
        value={description}
        onChange={(e) => setDescripton(e.target.value)}
      />

      <input
        type="file"
        name="videoFile"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />

      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
      />

      <button onClick={handleUploadVideo}>Upload</button>
    </div>
  );
}

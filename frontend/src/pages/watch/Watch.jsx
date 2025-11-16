import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Watch() {
  const [video, setVideo] = useState(null);
  const [pending, setPending] = useState(false);
  const { id } = useParams();

  async function getVideobyId() {
    setPending(true);

    const response = await axios.get(
      `http://localhost:8000/api/v1/video/${id}`
    );
    const result = await response.data;

    if (result && result.data) {
      setVideo(result.data);
    } else {
      setVideo(null);
    }
    setPending(false);
  }

  useEffect(() => {
    getVideobyId();
  }, []);

  if (pending) return <h1 className="text-white p-6">Loading...</h1>;

  if (!video) return <h1 className="text-white p-6">Video Not Found!</h1>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <video
          controls
          className="w-full rounded-lg shadow-lg"
          src={video.videoFile}
        />

        {/* Title */}
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

        {/* Views + Date */}
        <p className="text-gray-400 text-sm mt-1">
          {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>

        {/* Owner Section */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

          <div>
            <p className="font-semibold">{video.ownerDetails?.username}</p>
            <p className="text-gray-400 text-sm">{video.ownerDetails?.email}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-4 leading-relaxed">
          {video.description}
        </p>
        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {/* Add Comment Box */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

            <textarea
              className="flex-grow bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              rows="2"
            ></textarea>
          </div>

          <button className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white">
            Post
          </button>

          {/* Comments List */}
          <div className="mt-6 space-y-6">
            {/* Example Comment */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div>
                <p className="font-semibold">JohnDoe</p>
                <p className="text-gray-300">This is a great video!</p>
                <p className="text-gray-500 text-sm">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

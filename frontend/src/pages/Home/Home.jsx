import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function fetchVideoList() {
    setPending(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8000/api/v1/video?page=1&limit=10", {
        withCredentials: true,
      });
      const result = response.data;

      if (result?.data?.videos?.length > 0) {
        setVideos(result.data.videos);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setError("Failed to load videos. Make sure backend is running.");
      setVideos([]);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchVideoList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {pending ? (
        <h1 className="text-xl">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg"
                onClick={() => navigate(`/watch/${video._id}`)}
              >
                
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    className="w-full h-48 object-cover"
                  />

                  {/* Duration Overlay */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(video.duration / 60)}:
                    {("0" + Math.floor(video.duration % 60)).slice(-2)}
                  </div>
                </div>

                {/* Title */}
                <p className="text-white font-semibold p-3">{video.title}</p>

                {/* Owner name */}
                <p className="text-gray-300 text-sm px-3">
                  {video.ownerDetails?.username || "Unknown User"}
                </p>

                {/* Views + Date */}
                <p className="text-gray-400 text-xs px-3 pb-3">
                  {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>

              </div>
            ))
          ) : (
            <h1>No Videos Yet</h1>
          )}

        </div>
      )}
    </div>
  );
}

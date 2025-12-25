import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../context/AuthContext";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(`/video?query=${encodeURIComponent(query)}&page=1&limit=20`);
      const result = response.data;

      if (result?.data?.videos?.length > 0) {
        setVideos(result.data.videos);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to search videos");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "<span className="text-blue-400">{query}</span>"
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
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
                    alt={video.title}
                  />

                  {/* Duration Overlay */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(video.duration / 60)}:
                    {("0" + Math.floor(video.duration % 60)).slice(-2)}
                  </div>
                </div>

                {/* Title */}
                <p className="text-white font-semibold p-3 line-clamp-2">{video.title}</p>

                {/* Owner name */}
                <p className="text-gray-300 text-sm px-3">
                  {video.ownerDetails?.username || "Unknown User"}
                </p>

                {/* Views + Date */}
                <p className="text-gray-400 text-xs px-3 pb-3">
                  {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-xl py-20">
            <p>No videos found for "{query}"</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, axiosInstance } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Channel() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseURL = "http://localhost:8000/api/v1";

  useEffect(() => {
    fetchChannelProfile();
  }, [username]);

  const fetchChannelProfile = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/users/c/${username}`);
      const channelData = res.data.data;
      setChannel(channelData);
      setSubscribers(channelData.subscribersCount || 0);
      setVideos(channelData.videos || []);
      setIsSubscribed(!!channelData.isSubscribed);
    } catch (err) {
      setError("Failed to load channel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!currentUser) {
      alert("Please login to subscribe");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/subscription/c/${channel._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.data?.message?.includes("Subscribed")) {
        setIsSubscribed(true);
        setSubscribers((prev) => prev + 1);
      } else {
        setIsSubscribed(false);
        setSubscribers((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      alert("Failed to update subscription");
    }
  };

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!channel) return <div className="text-white text-center py-10">Channel not found</div>;

  const isOwnChannel = currentUser?._id === channel._id;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Cover Image */}
      {channel.coverImage && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img
            src={channel.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel Info */}
      <div className="px-6 py-6 border-b border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={channel.avatar}
            alt={channel.username}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-700"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{channel.fullName}</h1>
            <p className="text-gray-400 mb-2">@{channel.username}</p>
            <p className="text-sm text-gray-400 mb-4">{subscribers} subscribers</p>

            {!isOwnChannel && (
              <button
                onClick={handleSubscribe}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  isSubscribed
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>

        {channel.email && (
          <p className="text-gray-400 text-sm">Email: {channel.email}</p>
        )}
      </div>

      {/* Videos */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Videos</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate(`/watch/${video._id}`)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{video.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {video.views || 0} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-10">No videos yet</p>
        )}
      </div>
    </div>
  );
}

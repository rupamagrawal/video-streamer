import React, { useState, useEffect } from "react";
import { useAuth, axiosInstance } from "../../context/AuthContext";

export default function LikeButton({ videoId, commentId, tweetId, initialIsLiked = false, initialLikeCount = 0 }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(Boolean(initialIsLiked));
  const [likeCount, setLikeCount] = useState(Number(initialLikeCount) || 0);
  const [loading, setLoading] = useState(false);

  const getEndpoint = () => {
    if (videoId) return `/like/toggle/v/${videoId}`;
    if (commentId) return `/like/toggle/c/${commentId}`;
    if (tweetId) return `/like/toggle/t/${tweetId}`;
    return null;
  };

  // Sync with parent-provided initial values
  useEffect(() => {
    setIsLiked(Boolean(initialIsLiked));
    setLikeCount(Number(initialLikeCount) || 0);
  }, [initialIsLiked, initialLikeCount]);

  // Helpful logs
  useEffect(() => {
    console.log("📌 LikeButton state update - isLiked:", isLiked, "likeCount:", likeCount);
  }, [isLiked, likeCount]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like");
      return;
    }

    const endpoint = getEndpoint();
    if (!endpoint) return;

    setLoading(true);
    try {
      console.log("🔵 Sending like request to:", endpoint, "User ID:", user._id);
      const res = await axiosInstance.post(endpoint, {});
      console.log("🟢 Like response received:", res);

      const message = res.data?.message || "";
      const isNowLiked = message.includes("Liked");
      setIsLiked(isNowLiked);
      console.log("❤️ isLiked set to:", isNowLiked, "based on message:", message);

      const data = res.data?.data || {};
      if (data?.totalLikes !== undefined) {
        setLikeCount(data.totalLikes);
      } else if (data?.totalCommentLike !== undefined) {
        setLikeCount(data.totalCommentLike);
      } else if (data?.totalTweetLike !== undefined) {
        setLikeCount(data.totalTweetLike);
      }
    } catch (err) {
      console.error("❌ Like error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to update like";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading || !user}
      style={{
        backgroundColor: isLiked ? '#dc2626' : '#374151',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: loading || !user ? 'not-allowed' : 'pointer',
        opacity: loading || !user ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s',
      }}
      title={!user ? "Login to like" : isLiked ? "Unlike" : "Like"}
      onMouseEnter={(e) => {
        if (!loading && user) {
          e.currentTarget.style.backgroundColor = isLiked ? '#b91c1c' : '#4b5563';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isLiked ? '#dc2626' : '#374151';
      }}
    >
      <span className="text-xl">👍</span>
      <span>{likeCount}</span>
    </button>
  );
}

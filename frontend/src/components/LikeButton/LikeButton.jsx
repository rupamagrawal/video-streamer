import React, { useState, useEffect } from "react";
import { useAuth, axiosInstance } from "../../context/AuthContext";

export default function LikeButton({ videoId, commentId, tweetId }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getEndpoint = () => {
    if (videoId) return `/like/toggle/v/${videoId}`;
    if (commentId) return `/like/toggle/c/${commentId}`;
    if (tweetId) return `/like/toggle/t/${tweetId}`;
  };

  // Log when isLiked changes
  useEffect(() => {
    console.log("📌 LikeButton state update - isLiked:", isLiked, "likeCount:", likeCount);
  }, [isLiked, likeCount]);

  // Fetch initial like count when component mounts
  useEffect(() => {
    if (!videoId && !commentId && !tweetId) return;
    
    setLikeCount(0);
  }, [videoId, commentId, tweetId]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like");
      return;
    }

    setLoading(true);
    try {
      const endpoint = getEndpoint();
      console.log("🔵 Sending like request to:", endpoint, "User ID:", user._id);
      
      const res = await axiosInstance.post(endpoint, {});
      
    //   console.log("🟢 Like response received:", res);
    //   console.log("📦 Response data:", res.data);
    //   console.log("📦 Response data.data:", res.data.data);
      
      // Get the response message to determine if it's a like or dislike
      const message = res.data.message;
      const isNowLiked = message.includes("Liked");
      
      // Update like state based on response message
      setIsLiked(isNowLiked);
      console.log("❤️ isLiked set to:", isNowLiked, "based on message:", message);
      
      // Update like count from response
      const data = res.data.data;
      
      if (data?.totalLikes !== undefined) {
        console.log("📊 Setting totalLikes to:", data.totalLikes);
        setLikeCount(data.totalLikes);
      } else if (data?.totalCommentLike !== undefined) {
        console.log("📊 Setting totalCommentLike to:", data.totalCommentLike);
        setLikeCount(data.totalCommentLike);
      } else if (data?.totalTweetLike !== undefined) {
        console.log("📊 Setting totalTweetLike to:", data.totalTweetLike);
        setLikeCount(data.totalTweetLike);
      } else {
        console.log("⚠️ No like count field found in response");
      }
    } catch (err) {
      console.error("❌ Like error:", err);
      console.error("Error response:", err.response);
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
          e.target.style.backgroundColor = isLiked ? '#b91c1c' : '#4b5563';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = isLiked ? '#dc2626' : '#374151';
      }}
    >
      <span className="text-xl">👍</span>
      <span>{likeCount}</span>
    </button>
  );
}

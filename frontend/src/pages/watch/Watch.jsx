import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, axiosInstance } from "../../context/AuthContext";
import LikeButton from "../../components/LikeButton/LikeButton";
import SubscribeButton from "../../components/SubscribeButton/SubscribeButton";
import VideoActions from "../../components/VideoActions/VideoActions";

export default function Watch() {
  const [video, setVideo] = useState(null);
  const [pending, setPending] = useState(false);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function getVideobyId() {
    setPending(true);

    try {
      const response = await axiosInstance.get(`/video/${id}`);
      const result = response.data;

      if (result && result.data) {
        setVideo(result.data);
      } else {
        setVideo(null);
      }
    } catch (error) {
      console.error("Failed to fetch video:", error);
      setVideo(null);
    } finally {
      setPending(false);
    }
  }

  async function fetchComments() {
    try {
      const res = await axiosInstance.get(`/comment/${id}`);

      setComments(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch comments:", error);
    }
  }

  async function handlePostComment() {
    if (!commentText.trim()) return;

    if (!user) {
      alert("Please login to comment");
      return;
    }

    try {
      setCommentLoading(true);

      await axiosInstance.post(`/comment/${id}`, { content: commentText });

      setCommentText("");
      fetchComments();
    } catch (error) {
      console.log("Failed to post comment:", error);
      alert("Failed to post comment");
    } finally {
      setCommentLoading(false);
    }
  }

  useEffect(() => {
    getVideobyId();
    fetchComments();
  }, [id]);

  if (pending) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

        {/* Title with Actions */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>

            {/* Views + Date */}
            <p className="text-gray-400 text-sm mt-1">
              {video.views} views •{" "}
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Video Actions Menu */}
          <VideoActions
            videoId={id}
            ownerId={video.ownerDetails?._id}
            onDelete={() => navigate("/")}
          />
        </div>

        {/* Owner Section with Subscribe */}
        <div className="flex items-center justify-between mt-6 p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src={
                video.ownerDetails?.avatar || "https://via.placeholder.com/40"
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div
              onClick={() =>
                navigate(`/channel/${video.ownerDetails?.username}`)
              }
              className="cursor-pointer hover:opacity-80"
            >
              <p className="font-semibold">{video.ownerDetails?.username}</p>
              <p className="text-gray-400 text-sm">
                {video.ownerDetails?.email}
              </p>
            </div>
          </div>

          {user?._id !== video.ownerDetails?._id && (
            <SubscribeButton
              channelId={video.ownerDetails?._id}
              onSubscribeChange={fetchComments}
            />
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-4 leading-relaxed">
          {video.description}
        </p>

        {/* Actions (Like Button) */}
        <div className="flex gap-4 mt-6 pb-6 border-b border-gray-700">
          <LikeButton
            videoId={id}
            initialIsLiked={video.isLiked}
            initialLikeCount={video.totalLikes}
          />
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Comments ({comments.length})
          </h2>

          {/* Add Comment Box */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="grow bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              rows="2"
            />
          </div>

          <button
            onClick={handlePostComment}
            disabled={commentLoading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white disabled:opacity-50"
          >
            {commentLoading ? "Posting..." : "Post"}
          </button>

          {/* Comments List */}
          <div className="mt-6 space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <img
                    src={
                      comment.owner?.avatar || "https://via.placeholder.com/40"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {comment.owner?.username || "User"}
                    </p>
                    <p className="text-gray-300">{comment.content}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {/* Like comment button */}
                    <div className="mt-2">
                      <LikeButton
                        commentId={comment._id}
                        initialIsLiked={comment.isLiked}
                        initialLikeCount={comment.totalCommentLike}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

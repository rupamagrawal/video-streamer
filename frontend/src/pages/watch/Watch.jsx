import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Watch() {
  const [video, setVideo] = useState(null);
  const [pending, setPending] = useState(false);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

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

  async function fetchComments() {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comment/${id}`,
        { withCredentials: true }
      );

      setComments(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePostComment() {
    if (!commentText.trim()) return;

    try {
      setCommentLoading(true);

      await axios.post(
        `http://localhost:8000/api/v1/comment/${id}`,
        { content: commentText },
        { withCredentials: true }
      );

      setCommentText("");
      fetchComments();
    } catch (error) {
      console.log(error);
    } finally {
      setCommentLoading(false);
    }
  }

  useEffect(() => {
    getVideobyId();
    fetchComments();
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
          <h2 className="text-xl font-semibold mb-4">
            Comments ({comments.length})
          </h2>

          {/* Add Comment Box */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

                  <div>
                    <p className="font-semibold">
                      {comment.owner?.username || "User"}
                    </p>
                    <p className="text-gray-300">{comment.content}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
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

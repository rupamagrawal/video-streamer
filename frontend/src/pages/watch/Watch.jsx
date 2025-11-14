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

  return (
    <div>
      {pending ? (
        <div>Loading....</div>
      ) : video ? (
        <div>
          <video
            controls
            autoPlay
            controlsList="nodownload"
            width="600"
            src={video.videoFile}
            style={{ borderRadius: "8px" }}
          />
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <p>Views: {video.views}</p>

          <h3>Uploaded By:</h3>
          <p>{video.ownerDetails?.username}</p>
          <p>{video.ownerDetails?.email}</p>
        </div>
      ) : (
        <div>
          <h1>Video Not Found!</h1>
        </div>
      )}
    </div>
  );
}

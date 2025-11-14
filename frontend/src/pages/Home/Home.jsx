import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [pending, setPending] = useState(false);

  async function fetchVideoList() {
    setPending(true);

    const response = await axios.get(
      "http://localhost:8000/api/v1/video?page=1&limit=10"
    );

    const result = await response.data;

    if (result && result.data && result.data.videos.length > 0) {
      setVideos(result.data.videos);
    } else {
      setVideos([]);
    }
    setPending(false);
  }

  const navigate = useNavigate();

  useEffect(() => {
    fetchVideoList();
  }, []);

  return (
    <div>
      {pending ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id}>
                <img
                  src={video.thumbnail}
                  onClick={() => navigate(`/watch/${video._id}`)}
                  style={{ cursor: "pointer" }}
                />
                <p>{video.title}</p>
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

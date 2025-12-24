import React, { useState, useEffect } from "react";
import { useAuth, axiosInstance } from "../../context/AuthContext";

export default function SubscribeButton({ channelId, onSubscribeChange }) {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      alert("Please login to subscribe");
      return;
    }

    if (!channelId) {
      alert("Channel ID is missing");
      console.error("Channel ID is undefined", { channelId });
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/subscription/c/${channelId}`,
        {}
      );

      // Check response message to determine if subscribed or unsubscribed
      const message = res.data.message || "";
      if (message.includes("Subscribed")) {
        setIsSubscribed(true);
        setSubscriberCount((prev) => prev + 1);
      } else if (message.includes("Unsubscribed")) {
        setIsSubscribed(false);
        setSubscriberCount((prev) => prev - 1);
      }

      onSubscribeChange?.();
    } catch (err) {
      console.error("Subscribe error:", err);
      alert(err.response?.data?.message || "Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading || !channelId}
      className={`px-6 py-2 rounded-full font-semibold transition ${
        isSubscribed
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-red-600 hover:bg-red-700"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

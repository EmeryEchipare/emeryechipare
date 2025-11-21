"use client";

import { useState, useEffect } from "react";

const API_URL = "https://emeryechipare-api.emery-echipare.workers.dev";

interface LikeButtonProps {
  artworkId: number;
}

export default function LikeButton({ artworkId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch initial like status and count
  useEffect(() => {
    async function fetchLikeData() {
      try {
        // Get like count
        const countResponse = await fetch(`${API_URL}/artwork/${artworkId}/likes`);
        const countData = await countResponse.json();
        setLikeCount(countData.likes || 0);

        // Check if user has liked
        const likedResponse = await fetch(`${API_URL}/artwork/${artworkId}/liked`);
        const likedData = await likedResponse.json();
        setLiked(likedData.liked || false);
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    }

    fetchLikeData();
  }, [artworkId]);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    // Optimistic UI update
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      const response = await fetch(`${API_URL}/artwork/${artworkId}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();
      setLiked(data.liked);
      setLikeCount(data.likes);
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        className={`w-6 h-6 transition-colors ${
          liked ? "fill-red-500 text-red-500" : "fill-none text-gray-600"
        }`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="text-gray-900 font-medium">{likeCount}</span>
    </button>
  );
}

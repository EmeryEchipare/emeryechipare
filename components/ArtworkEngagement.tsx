"use client";

import LikeButton from "./LikeButton";
import Comments from "./Comments";

interface ArtworkEngagementProps {
  artworkId: number;
}

export default function ArtworkEngagement({ artworkId }: ArtworkEngagementProps) {
  return (
    <div className="space-y-6">
      <div>
        <LikeButton artworkId={artworkId} />
      </div>
      <Comments artworkId={artworkId} />
    </div>
  );
}

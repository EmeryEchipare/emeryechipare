"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArtworkEngagement from "./ArtworkEngagement";
import type { Artwork } from "@/lib/artworks";

interface ArtworkViewerProps {
  artwork: Artwork;
  artworkId: number;
  prevId: number | null;
  nextId: number | null;
}

export default function ArtworkViewer({ artwork, artworkId, prevId, nextId }: ArtworkViewerProps) {
  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Load panel state from localStorage on mount
  useEffect(() => {
    const savedPanelState = localStorage.getItem('artworkPanelOpen');
    if (savedPanelState === 'true') {
      setShowPanel(true);
    }
  }, []);

  // Save panel state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('artworkPanelOpen', showPanel.toString());
  }, [showPanel]);

  // Format date for display
  const formattedDate = new Date(artwork.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  const handlePrevious = () => {
    if (prevId) {
      router.push(`/artwork/${prevId}`);
    }
  };

  const handleNext = () => {
    if (nextId) {
      router.push(`/artwork/${nextId}`);
    }
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && nextId) {
      handleNext();
    }
    if (isRightSwipe && prevId) {
      handlePrevious();
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-black overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top navigation bar - minimal, floating */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4">
        <Link 
          href="/gallery" 
          className="flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Gallery
        </Link>
        
        {!showPanel && (
          <button
            onClick={togglePanel}
            className="flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Info & Comments
          </button>
        )}
      </div>

      {/* Full-screen image */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${showPanel ? 'lg:pr-96' : ''}`}
        onClick={() => !showPanel && togglePanel()}
        style={{ cursor: showPanel ? 'default' : 'pointer' }}
      >
        <img
          src={`/artwork/${artwork.filename}`}
          alt={artwork.title}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => {
            e.stopPropagation();
            if (!showPanel) togglePanel();
          }}
        />
      </div>

      {/* Navigation arrows - always on top */}
      <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-[60]">
        {prevId && (
          <button
            onClick={handlePrevious}
            className="pointer-events-auto p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors shadow-lg"
            title="Previous artwork"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex-1"></div>
        {nextId && (
          <button
            onClick={handleNext}
            className="pointer-events-auto p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors shadow-lg"
            title="Next artwork"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Sliding info/comments panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-white transform transition-transform duration-500 ease-in-out z-50 overflow-y-auto ${
          showPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close button - always visible */}
          <button
            onClick={togglePanel}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 z-10"
            title="Close panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2 pr-10">
            {artwork.title}
          </h1>
          <p className="text-gray-600 mb-6">{formattedDate}</p>

          {/* Description (if exists) */}
          {artwork.description && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                About This Work
              </h2>
              <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
            </div>
          )}

          {/* Engagement features */}
          <ArtworkEngagement artworkId={artworkId} />
        </div>
      </div>
    </div>
  );
}

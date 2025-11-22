import { getArtworkById, getAdjacentArtworkIds, artworks } from "@/lib/artworks";
import ArtworkViewer from "@/components/ArtworkViewer";

// Generate static paths for all artworks
export function generateStaticParams() {
  return artworks.map((art) => ({
    id: art.id.toString(),
  }));
}

export default async function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artworkId = parseInt(id);
  const artwork = getArtworkById(artworkId);
  const { prevId, nextId } = getAdjacentArtworkIds(artworkId);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Artwork Not Found</h1>
          <a href="/gallery" className="text-gray-600 hover:text-gray-900 underline">
            Back to Gallery
          </a>
        </div>
      </div>
    );
  }

  return (
    <ArtworkViewer 
      artwork={artwork}
      artworkId={artworkId}
      prevId={prevId}
      nextId={nextId}
    />
  );
}

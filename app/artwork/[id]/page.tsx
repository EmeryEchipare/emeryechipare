import Link from "next/link";
import { getArtworkById, getAdjacentArtworkIds, artworks } from "@/lib/artworks";

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
          <Link href="/gallery" className="text-gray-600 hover:text-gray-900 underline">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  // Format date for display
  const formattedDate = new Date(artwork.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
            Emery Echipare
          </Link>
          <div className="flex gap-8 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-900 hover:text-gray-600 transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back to Gallery Link */}
          <Link 
            href="/gallery" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`/artwork/${artwork.filename}`}
                  alt={artwork.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Previous/Next Navigation */}
              <div className="flex justify-between items-center mt-8">
                {prevId ? (
                  <Link
                    href={`/artwork/${prevId}`}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextId ? (
                  <Link
                    href={`/artwork/${nextId}`}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Next
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {artwork.title}
                </h1>
                <p className="text-gray-600 mb-8">{formattedDate}</p>

                {/* Description (if exists) */}
                {artwork.description && (
                  <div className="mb-8">
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      About This Work
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
                  </div>
                )}

                {/* Placeholder for future like/comment features */}
                <div className="border-t border-gray-200 pt-8">
                  <p className="text-sm text-gray-500 italic">
                    Social features (likes & comments) coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Emery Echipare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

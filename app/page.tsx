import Link from "next/link";
import { getLatestArtworks } from "@/lib/artworks";

export default function Home() {
  const latestArtworks = getLatestArtworks(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
            Emery Echipare
          </Link>
          <div className="flex gap-8 text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
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

      {/* Hero Section */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-6xl font-serif font-bold text-gray-900 mb-12">
              Distracted Listening
            </h1>
            <div className="flex gap-4 justify-center">
              <Link
                href="/gallery"
                className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Works Placeholder */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
            Featured Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArtworks.map((art) => (
              <Link 
                key={art.id} 
                href="/gallery"
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden group-hover:opacity-90 transition-opacity">
                  <img
                    src={`/artwork/${art.filename}`}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900">{art.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Emery Echipare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

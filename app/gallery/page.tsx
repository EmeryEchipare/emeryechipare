import Link from "next/link";

export default function Gallery() {
  // Placeholder artwork data
  const artworks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Untitled ${i + 1}`,
    price: `$${(i + 1) * 50}`,
  }));

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

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 mb-16">
            Browse my collection of original artwork and prints available for purchase.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {artworks.map((art) => (
              <div key={art.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden group-hover:bg-gray-200 transition-colors">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <p className="text-sm">Artwork {art.id}</p>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{art.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{art.price}</p>
                <button className="text-sm text-gray-900 hover:text-gray-600 transition-colors">
                  View Details →
                </button>
              </div>
            ))}
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

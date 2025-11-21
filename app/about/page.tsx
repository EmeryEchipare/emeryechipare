import Link from "next/link";

export default function About() {
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
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8">About</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-12 leading-relaxed text-xl">
              Hand-drawn ink landscapes.
            </p>

            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Get in Touch
            </Link>
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

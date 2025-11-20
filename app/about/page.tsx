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
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8">About the Artist</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="aspect-video bg-gray-100 rounded-lg mb-12 flex items-center justify-center">
              <p className="text-gray-400">Artist Photo</p>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Hello, I'm Emery</h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to my art portfolio. I'm a contemporary artist passionate about creating 
              meaningful pieces that resonate with viewers on a personal level.
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              My work explores themes of identity, emotion, and the human experience. Through 
              various mediums and techniques, I strive to capture moments of beauty and contemplation 
              that invite viewers to pause and reflect.
            </p>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 mt-12">Artist Statement</h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Art, for me, is a conversation between the creator and the observer. Each piece 
              tells a story, evokes an emotion, or poses a question. My goal is to create work 
              that speaks to the universal experiences we all share while celebrating the unique 
              perspectives that make us individual.
            </p>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 mt-12">Availability</h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Original artworks and limited edition prints are available for purchase. 
              For commissions, collaborations, or general inquiries, please don't hesitate 
              to reach out through the contact page.
            </p>

            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors mt-8"
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

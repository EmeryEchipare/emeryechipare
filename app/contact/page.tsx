import Link from "next/link";

export default function Contact() {
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
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-12">
            Interested in purchasing artwork or commissioning a piece? I'd love to hear from you.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <a href="mailto:Emery.Echipare@gmail.com" className="text-gray-900 hover:text-gray-600 transition-colors">
                  Emery.Echipare@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Tell me more..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Send Message
              </button>

              <p className="text-sm text-gray-500 text-center">
                Form submission will be configured in a future update. For now, please email directly.
              </p>
            </form>
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

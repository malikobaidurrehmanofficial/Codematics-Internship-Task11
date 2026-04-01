import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/5 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Movix</h3>
            <p className="text-sm text-gray-400">
              Your destination for discovering great movies
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/search" className="text-sm text-gray-400 hover:text-white transition">Discover</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms</a></li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Data</h4>
            <p className="text-sm text-gray-400">
              Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">TMDB</a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Movix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

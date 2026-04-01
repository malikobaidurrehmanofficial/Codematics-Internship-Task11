import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="text-3xl font-black text-[#E50914] hover:text-[#F5051D] transition">
              MOVIX
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover your next favorite movie. Stream, watch, and explore films.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#E50914] transition text-sm">Home</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-[#E50914] transition text-sm">Discover</Link></li>
              <li><Link to="/watchlist" className="text-gray-400 hover:text-[#E50914] transition text-sm">My List</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E50914] transition text-sm">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {currentYear} MOVIX. All rights reserved.</p>
          <p>Made with ❤️ for movie lovers</p>
        </div>
      </div>
    </footer>
  );
}
          <p>Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition">TMDB</a></p>
        </div>
      </div>
    </footer>
  );
}


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className="h-16 bg-black/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-red-600 group-hover:bg-red-700 transition" />
            <span className="text-xl font-bold hidden sm:inline">Movix</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm hover:text-red-500 transition">Home</Link>
            <Link to="/search" className="text-sm hover:text-red-500 transition">Discover</Link>
            {isAuthenticated && (
              <Link to="/watchlist" className="text-sm hover:text-red-500 transition">Watchlist</Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <Search size={20} />
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-400">{user?.displayName || 'User'}</span>
                <button className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded transition">
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/auth" className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded transition hidden sm:block">
                Sign In
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/5 p-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies..."
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/5 md:hidden">
            <div className="px-6 py-4 space-y-3">
              <Link to="/" className="block text-sm hover:text-red-500 transition" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/search" className="block text-sm hover:text-red-500 transition" onClick={() => setMobileOpen(false)}>Discover</Link>
              {isAuthenticated && (
                <Link to="/watchlist" className="block text-sm hover:text-red-500 transition" onClick={() => setMobileOpen(false)}>Watchlist</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

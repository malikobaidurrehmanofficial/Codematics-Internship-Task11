import { Film, Search, Star, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '../../utils/helpers';

const iconLinkClass = (active) =>
  classNames(
    'relative flex h-10 w-10 items-center justify-center rounded-full border transition duration-300',
    active
      ? 'border-[#E50914]/40 bg-[#E50914]/14 text-white shadow-[0_0_30px_rgba(229,9,20,0.28)]'
      : 'border-white/10 bg-white/[0.04] text-gray-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white'
  );

export default function Navbar() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="surface-glass flex items-center justify-between rounded-full border border-white/10 bg-black/80 px-4 py-3 shadow-[0_25px_60px_rgba(0,0,0,0.42)]">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] text-white shadow-[0_0_35px_rgba(229,9,20,0.45)]">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.28em] text-white">Movix</p>
              <p className="hidden text-[10px] uppercase tracking-[0.45em] text-gray-500 md:block">
                Cinematic Nights
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-gray-300 md:flex">
            <Link className="transition hover:text-white" to="/">
              Home
            </Link>
            <Link className="transition hover:text-white" to="/#trending">
              Trending
            </Link>
            <Link className="transition hover:text-white" to="/#discover">
              Discover
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              aria-label="Discover titles"
              className={iconLinkClass(location.hash === '#discover')}
              to="/#discover"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              aria-label="Browse top rated titles"
              className={iconLinkClass(location.hash === '#top-rated')}
              to="/#top-rated"
            >
              <Star className="h-4 w-4" />
            </Link>
            <Link
              aria-label="Open account"
              className={iconLinkClass(location.pathname === '/auth')}
              to="/auth"
            >
              <User className="h-4 w-4" />
              {user ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E50914]" /> : null}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

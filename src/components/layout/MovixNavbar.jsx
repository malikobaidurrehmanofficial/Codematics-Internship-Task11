import { Heart, Moon, Search, Star, Sun, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/helpers';
import logo from '../../assets/logo.png';
import { logOut } from '../../services/authService';
import { logout } from '../../store/authSlice';

const iconLinkClass = (active) =>
  classNames(
    'relative flex h-10 w-10 items-center justify-center rounded-full border transition duration-300',
    active
      ? 'border-[#E50914]/40 bg-[#E50914]/14 text-white shadow-[0_0_30px_rgba(229,9,20,0.28)]'
      : 'border-app surface-card text-muted hover:-translate-y-0.5 hover:border-white/20 hover:text-app'
  );

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (localStorage.getItem('movix-theme') || 'dark') === 'light';
};

export default function MovixNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const watchlistCount = useSelector((state) => state.watchlist.movieIds.length);
  const [isLight, setIsLight] = useState(getInitialTheme);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', isLight);
    localStorage.setItem('movix-theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight((prev) => !prev);
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setAccountOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(logout());
      setAccountOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="surface-glass nav-surface flex items-center justify-between rounded-full border border-app px-4 py-3 shadow-[0_25px_60px_rgba(0,0,0,0.42)]">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black shadow-[0_0_35px_rgba(229,9,20,0.45)]">
              <img alt="Movix logo" className="h-full w-full object-cover" src={logo} />
            </div>
            <div>
              <p className="text-app text-lg font-semibold tracking-[0.28em]">Movix</p>
              <p className="text-muted hidden text-[10px] uppercase tracking-[0.45em] md:block">
                Cinematic Nights
              </p>
            </div>
          </Link>

          <nav className="text-muted hidden items-center gap-7 text-sm md:flex">
            <Link className="transition hover:text-app" to="/">
              Home
            </Link>
            <Link className="transition hover:text-app" to="/#trending">
              Trending
            </Link>
            <Link className="transition hover:text-app" to="/#discover">
              Discover
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Toggle light mode"
              className={iconLinkClass(false)}
              onClick={toggleTheme}
              type="button"
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <Link
              aria-label="Discover titles"
              className={iconLinkClass(location.pathname === '/search')}
              to="/search"
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
              aria-label="View your list"
              className={iconLinkClass(location.pathname === '/watchlist')}
              to="/watchlist"
            >
              <Heart className="h-4 w-4" />
              {watchlistCount ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E50914] text-[10px] font-semibold text-white">
                  {watchlistCount}
                </span>
              ) : null}
            </Link>
            <div className="relative">
              <button
                aria-label="Open account menu"
                className={iconLinkClass(location.pathname === '/auth' || accountOpen)}
                onClick={handleAccountClick}
                type="button"
              >
                <User className="h-4 w-4" />
                {user ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E50914]" /> : null}
              </button>
              {accountOpen ? (
                <div className="surface-card border-app absolute right-0 mt-3 w-44 rounded-2xl border p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <button
                    className="text-app w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/watchlist');
                    }}
                    type="button"
                  >
                    My List
                  </button>
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-[#E50914] transition hover:bg-[#E50914]/10"
                    onClick={handleLogout}
                    type="button"
                  >
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

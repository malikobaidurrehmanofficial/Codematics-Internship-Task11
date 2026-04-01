import { Link } from 'react-router-dom';

export default function MovixFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-soft mt-20 border-t border-app">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <Link className="text-3xl font-semibold tracking-[0.24em] text-app" to="/">
              Movix
            </Link>
            <p className="text-muted max-w-sm text-sm leading-7">
              A premium dark-theme movie destination built for discovering what deserves the biggest screen in your room.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-muted text-sm font-semibold uppercase tracking-[0.3em]">Browse</h3>
            <div className="text-muted space-y-3 text-sm">
              <Link className="block transition hover:text-white" to="/#trending">
                Trending Now
              </Link>
              <Link className="block transition hover:text-white" to="/#top-rated">
                Top Rated
              </Link>
              <Link className="block transition hover:text-white" to="/#discover">
                Discover
              </Link>
              <Link className="block transition hover:text-white" to="/watchlist">
                My List
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-muted text-sm font-semibold uppercase tracking-[0.3em]">Experience</h3>
            <div className="text-muted space-y-3 text-sm leading-6">
              <p>Dark-first cinematic visuals with rich gradients and smooth motion.</p>
              <p>Streaming-inspired browsing with quick rows and an endless discover shelf.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-muted text-sm font-semibold uppercase tracking-[0.3em]">Account</h3>
            <div className="text-muted space-y-3 text-sm">
              <Link className="block transition hover:text-white" to="/auth">
                Sign in to sync your list
              </Link>
              <a
                className="block transition hover:text-white"
                href="https://www.themoviedb.org/"
                rel="noreferrer"
                target="_blank"
              >
                Powered by TMDB
              </a>
            </div>
          </div>
        </div>

        <div className="text-muted mt-12 flex flex-col gap-3 border-t border-app pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>{currentYear} Movix. All rights reserved.</p>
          <p>Built for movie nights that should feel bigger than a template.</p>
        </div>
      </div>
    </footer>
  );
}

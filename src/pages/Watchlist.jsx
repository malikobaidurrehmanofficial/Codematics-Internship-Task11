import { useQueries } from '@tanstack/react-query';
import { Film } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovixMovieGrid from '../components/movie/MovixMovieGrid';
import MovixMovieSkeleton from '../components/movie/MovixMovieSkeleton';
import MovixButton from '../components/ui/MovixButton';
import { getMovieDetails } from '../services/movixTmdb';

export default function Watchlist() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const watchlistIds = useSelector((state) => state.watchlist.movieIds);

  const movieQueries = useQueries({
    queries: watchlistIds.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => getMovieDetails(id),
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 10,
    })),
  });

  const isLoading = movieQueries.some((query) => query.isLoading);
  const movies = movieQueries.map((query) => query.data).filter(Boolean);

  if (!isAuthenticated) {
    return (
      <div className="bg-app flex min-h-[70vh] items-center justify-center px-6 pt-28">
        <div className="surface-card border-app max-w-xl rounded-[32px] border p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E50914]/15 text-[#E50914]">
            <Film className="h-6 w-6" />
          </div>
          <h1 className="text-app mt-6 text-3xl font-semibold">Sign in to see your saved movies.</h1>
          <p className="text-muted mt-4">
            Your Movix list is tied to your account so you can pick up where you left off.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/auth">
              <MovixButton size="lg">Go to Movix Access</MovixButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-app pb-24 pt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-[0.35em]">Movix</p>
            <h1 className="text-app mt-3 text-3xl font-semibold md:text-4xl">My List</h1>
            <p className="text-muted mt-2 max-w-2xl text-sm">
              Saved titles you want to revisit. Add more movies from any card to grow your list.
            </p>
          </div>
          <div className="text-muted text-sm">{watchlistIds.length} saved titles</div>
        </div>

        {isLoading && !movies.length ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <MovixMovieSkeleton count={10} />
          </div>
        ) : null}

        {!isLoading && !movies.length ? (
          <div className="surface-card border-app rounded-[32px] border p-10 text-center">
            <h2 className="text-app text-2xl font-semibold">Your list is empty.</h2>
            <p className="text-muted mt-3">
              Browse the home screen and tap save to build your own Movix lineup.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/">
                <MovixButton>Browse Movix</MovixButton>
              </Link>
            </div>
          </div>
        ) : null}

        {movies.length ? (
          <MovixMovieGrid isLoading={isLoading} movies={movies} showHint={false} />
        ) : null}
      </div>
    </div>
  );
}

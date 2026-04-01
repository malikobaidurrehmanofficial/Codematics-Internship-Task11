import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/Button.new';
import { moviesApi } from '../services/tmdb';
import { addToWatchlist, removeFromWatchlist, selectIsInWatchlist } from '../features/watchlist/watchlistSlice';
import HeroSkeleton from '../components/movie/HeroSkeleton.new';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isInWatchlist = useSelector(state => selectIsInWatchlist(state, id));

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await moviesApi.getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  if (isLoading) return <HeroSkeleton />;
  
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Movie not found'}</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex gap-8 items-end">
              {/* Poster */}
              <div className="flex-shrink-0 hidden md:block">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 rounded-lg shadow-2xl"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 pb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-300">
                  {movie.release_date && (
                    <div>
                      <p className="text-gray-400">Released</p>
                      <p className="text-white">{new Date(movie.release_date).getFullYear()}</p>
                    </div>
                  )}
                  {movie.vote_average && (
                    <div>
                      <p className="text-gray-400">Rating</p>
                      <p className="text-yellow-400 font-semibold">★ {movie.vote_average.toFixed(1)}/10</p>
                    </div>
                  )}
                  {movie.runtime && (
                    <div>
                      <p className="text-gray-400">Runtime</p>
                      <p className="text-white">{movie.runtime} min</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleWatchlistToggle}
                    variant={isInWatchlist ? 'secondary' : 'primary'}
                  >
                    {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/')}>
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          {movie.overview && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed max-w-3xl">{movie.overview}</p>
            </div>
          )}

          {/* Production Info */}
          {(movie.production_companies?.length > 0 || movie.production_countries?.length > 0) && (
            <div className="grid md:grid-cols-2 gap-8">
              {movie.production_companies?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Production</h3>
                  <p className="text-gray-300">
                    {movie.production_companies.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
              {movie.production_countries?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Countries</h3>
                  <p className="text-gray-300">
                    {movie.production_countries.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

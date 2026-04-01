import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.new';
import MovieGrid from '../components/movie/MovieGrid.new';
import { selectWatchlist, removeFromWatchlist, clearWatchlist } from '../features/watchlist/watchlistSlice';

export default function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector(selectWatchlist);

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-bg pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">My Watchlist</h1>
            <p className="text-gray-400 text-lg mb-8">
              Your watchlist is empty. Start adding movies!
            </p>
            <Button onClick={() => navigate('/')}>
              Discover Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleRemove = (movieId) => {
    dispatch(removeFromWatchlist(movieId));
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Watchlist</h1>
            <p className="text-gray-400">{watchlist.length} movies saved</p>
          </div>
          {watchlist.length > 0 && (
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('Clear all watchlist items?')) {
                  dispatch(clearWatchlist());
                }
              }}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Grid with Remove Option */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="group">
              <div
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer relative overflow-hidden rounded-lg"
              >
                {movie.poster_path && (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm">View Details</Button>
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-3 font-semibold text-white truncate">
                {movie.title}
              </h3>

              {/* Rating */}
              {movie.vote_average && (
                <p className="text-sm text-yellow-400 mb-2">
                  ★ {movie.vote_average.toFixed(1)}/10
                </p>
              )}

              {/* Remove Button */}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleRemove(movie.id)}
                className="w-full"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

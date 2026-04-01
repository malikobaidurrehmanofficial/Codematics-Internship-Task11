import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Clock, Calendar, Globe, Play, Heart, ArrowLeft, User } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';
import { addMovieToWatchlist, removeMovieFromWatchlist } from '../services/watchlistService';
import { addMovieId, removeMovieId } from '../store/watchlistSlice';
import { getBackdropUrl, getPosterUrl } from '../services/tmdb';
import Button from '../components/ui/Button';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const watchlistIds = useSelector((s) => s.watchlist.movieIds);
  const isInWatchlist = watchlistIds.includes(Number(id));

  const { data: movie, isLoading, error } = useMovieDetails(id);

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      if (isInWatchlist) {
        dispatch(removeMovieId(movie.id));
        await removeMovieFromWatchlist(user.uid, movie.id);
      } else {
        dispatch(addMovieId(movie.id));
        await addMovieToWatchlist(user.uid, movie.id);
      }
    } catch (err) {
      console.error('Error updating watchlist:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] pt-20">
        <div className="w-full h-[60vh] bg-gray-800 animate-pulse" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 -mt-32 relative z-10 space-y-5 py-10">
          <div className="h-10 w-2/3 bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">🎬</p>
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] pb-20 pt-20">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        {movie.backdrop_path ? (
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/80 to-[#0B0B0F]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F]/80 via-transparent to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-8 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#E50914] hover:scale-110 transition-all cursor-pointer z-10 shadow-lg"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 -mt-40 md:-mt-52 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 hidden md:block">
            {movie.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-56 lg:w-64 rounded-2xl shadow-2xl hover:shadow-red-900/50 transition-shadow border border-gray-700"
              />
            ) : (
              <div className="w-56 lg:w-64 aspect-[2/3] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
                No Poster
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30 hover:bg-[#E50914]/20 transition-colors"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              {movie.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-2 rounded-full font-semibold text-sm border border-amber-500/30">
                <Star className="h-4 w-4 fill-amber-400" />
                {movie.vote_average?.toFixed(1)}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800 px-3 py-2 rounded-full border border-gray-700">
                <Calendar className="h-4 w-4" />
                {movie.release_date?.slice(0, 4)}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800 px-3 py-2 rounded-full border border-gray-700">
                <Clock className="h-4 w-4" />
                {movie.runtime} min
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800 px-3 py-2 rounded-full border border-gray-700 uppercase">
                <Globe className="h-4 w-4" />
                {movie.original_language}
              </div>
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-10 max-w-3xl">
              {movie.overview || 'No overview available.'}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={handleToggleWatchlist}
                variant={isInWatchlist ? 'secondary' : 'primary'}
              >
                <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Trailer
              </Button>
            </div>

            {/* Cast Section */}
            {movie.credits?.cast?.length > 0 && (
              <div className="mt-12 pt-12 border-t border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Top Cast</h2>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {movie.credits.cast.slice(0, 8).map(person => (
                    <div key={person.id} className="text-center flex-shrink-0">
                      <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-3 overflow-hidden border border-gray-700 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                        {person.profile_path ? (
                          <img src={getPosterUrl(person.profile_path, 'w185')} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-10 w-10 text-gray-600" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white leading-tight truncate max-w-[100px]">{person.name}</p>
                      <p className="text-xs text-gray-400 leading-tight truncate max-w-[100px]">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
          <div className="h-24 w-full shimmer-bg rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎬</p>
          <h2 className="text-2xl font-bold text-text mb-2">Movie Not Found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-white">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        {movie.backdrop_path ? (
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-8 p-2.5 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:scale-110 transition-all cursor-pointer z-10 shadow-lg"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-40 md:-mt-52 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 hidden md:block">
            {movie.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-56 lg:w-64 rounded-2xl shadow-2xl shadow-black/50 border border-border/20 hover:shadow-primary/30 transition-shadow"
              />
            ) : (
              <div className="w-56 lg:w-64 aspect-[2/3] rounded-2xl bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500">
                No Poster
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {movie.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-400 px-3.5 py-2 rounded-full font-semibold text-sm border border-amber-400/20">
                <Star className="h-4 w-4 fill-amber-400" />
                {formatRating(movie.vote_average)}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-100 px-3.5 py-2 rounded-full border border-gray-300">
                <Calendar className="h-4 w-4" />
                {movie.release_date?.slice(0, 4)}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-100 px-3.5 py-2 rounded-full border border-gray-300">
                <Clock className="h-4 w-4" />
                {movie.runtime} min
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-100 px-3.5 py-2 rounded-full border border-gray-300 uppercase">
                <Globe className="h-4 w-4" />
                {movie.original_language}
              </div>
            </div>

            {/* Overview */}
            <p className="text-text-muted leading-relaxed text-base md:text-lg mb-10 max-w-3xl">
              {movie.overview || 'No overview available.'}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={handleToggleWatchlist}
                variant={isInWatchlist ? 'secondary' : 'primary'}
                className={isInWatchlist ? 'border-primary text-primary' : ''}
              >
                <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-primary' : ''}`} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
            </div>
            
            {/* Cast Section */}
            {movie.credits?.cast?.length > 0 && (
              <div className="mt-12 pt-12 border-t border-border/30">
                <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {movie.credits.cast.slice(0, 8).map(person => (
                    <div key={person.id} className="text-center flex-shrink-0">
                      <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden border border-gray-300 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                        {person.profile_path ? (
                          <img src={getPosterUrl(person.profile_path, 'w185')} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-10 w-10 text-text-muted/50" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white leading-tight truncate">{person.name}</p>
                      <p className="text-xs text-text-muted leading-tight truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

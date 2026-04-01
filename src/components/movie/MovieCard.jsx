import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Star, Play } from 'lucide-react';
import { addMovieToWatchlist, removeMovieFromWatchlist } from '../../services/watchlistService';
import { addMovieId, removeMovieId } from '../../store/watchlistSlice';
import { getPosterUrl } from '../../services/tmdb';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const watchlistIds = useSelector((s) => s.watchlist.movieIds);
  const isInWatchlist = watchlistIds.includes(movie.id);

  const posterUrl = movie.poster_path
    ? getPosterUrl(movie.poster_path)
    : movie.poster || null;

  const title = movie.title || movie.name || 'Untitled';
  const rating = movie.vote_average ?? 0;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '';

  const handleToggleWatchlist = async (e) => {
    e.stopPropagation();
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

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20 origin-center"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 group-hover:border-[#E50914]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-xs">
            No Image
          </div>
        )}

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg">
            <Star className="h-3 w-3 text-[#E50914] fill-[#E50914]" />
            {rating.toFixed(1)}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#E50914] hover:bg-[#F5051D] text-white text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Play className="h-4 w-4 fill-white" />
            Play
          </button>

          <button
            onClick={handleToggleWatchlist}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition-all ${
              isInWatchlist
                ? 'bg-[#E50914]/20 border border-[#E50914] text-[#E50914]'
                : 'bg-white/10 border border-white/30 text-white hover:bg-white/20'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWatchlist ? 'fill-[#E50914]' : ''}`} />
            {isInWatchlist ? 'Added' : 'Save'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 transition-all duration-300">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#E50914] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mt-1">{year}</p>
      </div>
    </div>
  );
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5 transition-all duration-300">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-text-muted/70 mt-1 font-medium">{year}</p>
      </div>
    </div>
  );
}

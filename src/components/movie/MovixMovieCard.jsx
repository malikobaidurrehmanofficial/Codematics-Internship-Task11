import { Check, Play, Plus, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovixButton from '../ui/MovixButton';
import { addMovieToWatchlist, removeMovieFromWatchlist } from '../../services/watchlistService';
import { getPosterUrl } from '../../services/movixTmdb';
import { addMovieId, removeMovieId } from '../../store/watchlistSlice';
import { classNames, formatRating, getYearFromDate } from '../../utils/helpers';

export default function MovixMovieCard({ movie, compact = false, className = '' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const watchlistIds = useSelector((state) => state.watchlist.movieIds);
  const isSaved = watchlistIds.includes(movie.id);

  const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : null;
  const title = movie.title || movie.name || 'Untitled';
  const year = getYearFromDate(movie.release_date || movie.first_air_date);

  const handleToggleSave = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated || !user?.uid) {
      navigate('/auth');
      return;
    }

    try {
      if (isSaved) {
        dispatch(removeMovieId(movie.id));
        await removeMovieFromWatchlist(user.uid, movie.id);
      } else {
        dispatch(addMovieId(movie.id));
        await addMovieToWatchlist(user.uid, movie.id);
      }
    } catch (error) {
      console.error('Failed to update watchlist', error);
    }
  };

  return (
    <article
      className={classNames(
        'group relative shrink-0',
        compact ? 'w-[180px] sm:w-[200px] lg:w-[216px]' : 'w-full',
        className
      )}
    >
      <div className="surface-card relative overflow-hidden rounded-2xl border border-app shadow-md transition duration-300 hover:scale-[1.05] hover:border-white/18 hover:shadow-xl">
        <Link className="block" to={`/movie/${movie.id}`}>
          <div className="relative aspect-[2/3] overflow-hidden">
            {posterUrl ? (
              <img
                alt={title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
                src={posterUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.25),transparent_45%),linear-gradient(180deg,#1B1B22,#0B0B0F)] p-5 text-center text-sm text-gray-400">
                Poster unavailable
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <Star className="h-3 w-3 fill-[#E50914] text-[#E50914]" />
              {formatRating(movie.vote_average)}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3
                className="text-base font-semibold text-white"
                style={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {title}
              </h3>
              <p className="text-muted mt-1 text-sm">{year}</p>
            </div>
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-4 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="pointer-events-auto flex items-center gap-2">
            <Link className="flex-1" to={`/movie/${movie.id}`}>
              <MovixButton className="w-full" size="sm">
                <Play className="h-4 w-4" />
                More Info
              </MovixButton>
            </Link>
            <button
              aria-label={isSaved ? `Remove ${title} from your list` : `Save ${title} to your list`}
              className={classNames(
                'flex h-10 w-10 items-center justify-center rounded-full border transition duration-300',
                isSaved
                  ? 'border-[#E50914]/40 bg-[#E50914]/16 text-white'
                  : 'border-white/14 bg-white/[0.06] text-white hover:bg-white/[0.10]'
              )}
              onClick={handleToggleSave}
            >
              {isSaved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

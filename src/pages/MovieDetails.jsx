import { ArrowLeft, Clock3, Globe2, Play, Star } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MovixButton from '../components/ui/MovixButton';
import { useMovieDetails } from '../hooks/useMovies';
import { addMovieToWatchlist, removeMovieFromWatchlist } from '../services/watchlistService';
import { getBackdropUrl, getPosterUrl, getProfileUrl } from '../services/movixTmdb';
import { addMovieId, removeMovieId } from '../store/watchlistSlice';
import { formatRating, formatRuntime, formatVoteCount } from '../utils/helpers';

function DetailLoading() {
  return (
    <div className="bg-app pb-24 pt-28">
      <div className="relative h-[54vh] overflow-hidden">
        <div className="shimmer h-full w-full" />
      </div>
      <div className="-mt-24 max-w-7xl mx-auto grid gap-8 px-6 md:px-10 lg:grid-cols-[320px,1fr] lg:px-16">
        <div className="shimmer aspect-[2/3] rounded-[28px]" />
        <div className="space-y-5">
          <div className="shimmer h-6 w-40 rounded-full" />
          <div className="shimmer h-14 w-4/5 rounded-3xl" />
          <div className="flex gap-3">
            <div className="shimmer h-10 w-28 rounded-full" />
            <div className="shimmer h-10 w-32 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="shimmer h-4 w-full rounded-full" />
            <div className="shimmer h-4 w-5/6 rounded-full" />
            <div className="shimmer h-4 w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const watchlistIds = useSelector((state) => state.watchlist.movieIds);
  const isSaved = watchlistIds.includes(Number(id));

  const { data: movie, error, isLoading } = useMovieDetails(id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  const trailer = movie?.videos?.results?.find(
    (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  const handleToggleSave = async () => {
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
    } catch (toggleError) {
      console.error('Failed to update watchlist', toggleError);
    }
  };

  const handleTrailer = () => {
    if (!trailer?.key) {
      return;
    }

    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return <DetailLoading />;
  }

  if (error || !movie) {
    return (
      <div className="bg-app flex min-h-screen items-center justify-center px-6 pt-28">
        <div className="surface-card border-app max-w-xl rounded-[32px] border p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <p className="text-muted text-sm uppercase tracking-[0.35em]">Movix</p>
          <h1 className="text-app mt-4 text-4xl font-semibold">That title slipped out of frame.</h1>
          <p className="text-muted mt-4">
            The movie details could not be loaded right now. Head back to the home screen and try another pick.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/">
              <MovixButton>Back to Movix</MovixButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path ? getBackdropUrl(movie.backdrop_path) : null;
  const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : null;
  const director = movie.credits?.crew?.find((person) => person.job === 'Director');
  const writer = movie.credits?.crew?.find(
    (person) => person.job === 'Writer' || person.job === 'Screenplay'
  );

  return (
    <div className="bg-app pb-24 pt-28">
      <section className="relative overflow-hidden">
        {backdropUrl ? (
          <img alt={movie.title} className="absolute inset-0 h-full w-full object-cover" src={backdropUrl} />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.35),transparent_35%),linear-gradient(180deg,#181820,#0B0B0F)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,15,0.96)_0%,rgba(11,11,15,0.82)_34%,rgba(11,11,15,0.52)_64%,rgba(11,11,15,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.2)_0%,rgba(11,11,15,0.4)_55%,rgba(11,11,15,1)_100%)]" />

        <div className="relative max-w-7xl mx-auto px-6 pb-20 md:px-10 lg:px-16">
          <button
            className="surface-glass border-app text-app mt-2 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="mt-10 grid gap-8 lg:grid-cols-[320px,1fr] lg:items-end">
            <div className="mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="surface-card border-app overflow-hidden rounded-[28px] border shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
                {posterUrl ? (
                  <img alt={movie.title} className="aspect-[2/3] w-full object-cover" src={posterUrl} />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-[linear-gradient(180deg,#1C1C25,#0B0B0F)] text-gray-400">
                    Poster unavailable
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-3xl">
              {movie.tagline ? (
                <p className="mb-4 text-sm uppercase tracking-[0.38em] text-gray-400">{movie.tagline}</p>
              ) : null}

              <h1 className="text-app text-4xl font-semibold md:text-6xl">{movie.title}</h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-md">
                  <Star className="h-4 w-4 fill-[#E50914] text-[#E50914]" />
                  {formatRating(movie.vote_average)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-md">
                  <Clock3 className="h-4 w-4" />
                  {formatRuntime(movie.runtime)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-md">
                  <Globe2 className="h-4 w-4" />
                  {movie.original_language?.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-gray-200 backdrop-blur-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-muted mt-6 text-base leading-8 md:text-lg">
                {movie.overview || 'No overview is available for this title yet.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <MovixButton disabled={!trailer} onClick={handleTrailer} size="lg">
                  <Play className="h-4 w-4" />
                  {trailer ? 'Play Trailer' : 'Trailer Unavailable'}
                </MovixButton>
                <MovixButton onClick={handleToggleSave} size="lg" variant="secondary">
                  {isSaved ? 'Saved to My List' : 'Save to My List'}
                </MovixButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <section className="mt-16 grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
          <div className="surface-card border-app rounded-[30px] border p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <h2 className="text-app text-2xl font-semibold">Storyline</h2>
            <p className="text-muted mt-4 leading-8">
              {movie.overview || 'No storyline is available for this title.'}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="surface-soft border-app rounded-2xl border p-4">
                <p className="text-muted text-xs uppercase tracking-[0.35em]">Votes</p>
                <p className="text-app mt-3 text-lg font-semibold">{formatVoteCount(movie.vote_count)}</p>
              </div>
              <div className="surface-soft border-app rounded-2xl border p-4">
                <p className="text-muted text-xs uppercase tracking-[0.35em]">Release</p>
                <p className="text-app mt-3 text-lg font-semibold">{movie.release_date}</p>
              </div>
              <div className="surface-soft border-app rounded-2xl border p-4">
                <p className="text-muted text-xs uppercase tracking-[0.35em]">Status</p>
                <p className="text-app mt-3 text-lg font-semibold">{movie.status}</p>
              </div>
            </div>
          </div>

          <div className="surface-card border-app rounded-[30px] border p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <h2 className="text-app text-2xl font-semibold">Movie Facts</h2>

            <div className="text-muted mt-6 space-y-5 text-sm">
              <div className="border-app flex items-start justify-between gap-4 border-b pb-4">
                <span className="text-muted">Director</span>
                <span className="text-app text-right">{director?.name || 'Unavailable'}</span>
              </div>
              <div className="border-app flex items-start justify-between gap-4 border-b pb-4">
                <span className="text-muted">Writer</span>
                <span className="text-app text-right">{writer?.name || 'Unavailable'}</span>
              </div>
              <div className="border-app flex items-start justify-between gap-4 border-b pb-4">
                <span className="text-muted">Runtime</span>
                <span className="text-app text-right">{formatRuntime(movie.runtime)}</span>
              </div>
              <div className="border-app flex items-start justify-between gap-4 border-b pb-4">
                <span className="text-muted">Language</span>
                <span className="text-app text-right">{movie.original_language?.toUpperCase()}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted">Countries</span>
                <span className="text-app text-right">
                  {movie.production_countries?.map((country) => country.name).join(', ') || 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-app text-2xl font-semibold md:text-3xl">Top Cast</h2>
            <p className="text-muted mt-2 text-sm">Faces carrying the story on screen.</p>
          </div>

          <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-3">
            {movie.credits?.cast?.slice(0, 10).map((person) => (
              <article
                className="surface-card border-app w-[170px] shrink-0 overflow-hidden rounded-[24px] border"
                key={person.id}
              >
                {person.profile_path ? (
                  <img
                    alt={person.name}
                    className="aspect-[3/4] w-full object-cover"
                    src={getProfileUrl(person.profile_path)}
                  />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-[linear-gradient(180deg,#1C1C24,#0B0B0F)] text-sm text-gray-500">
                    No Photo
                  </div>
                )}
                <div className="p-4">
                  <p className="text-app text-base font-semibold">{person.name}</p>
                  <p className="text-muted mt-1 text-sm">{person.character}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

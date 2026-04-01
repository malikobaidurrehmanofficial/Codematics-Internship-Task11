import { ChevronLeft, ChevronRight, Info, Play, Star } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MovixMovieGrid from '../components/movie/MovixMovieGrid';
import MovixMovieRow from '../components/movie/MovixMovieRow';
import MovixMovieSkeleton from '../components/movie/MovixMovieSkeleton';
import MovixButton from '../components/ui/MovixButton';
import {
  useDiscoverMovies,
  useGenreMap,
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
} from '../hooks/useMovies';
import { getBackdropUrl, mapGenreIds } from '../services/movixTmdb';
import { formatRating, getYearFromDate, truncateText } from '../utils/helpers';

function HeroFallback() {
  return (
    <div className="max-w-7xl mx-auto flex min-h-[84vh] items-end px-6 pb-24 pt-36 md:px-10 lg:px-16">
      <div className="w-full max-w-2xl space-y-6">
        <div className="shimmer h-5 w-36 rounded-full" />
        <div className="space-y-4">
          <div className="shimmer h-16 w-full rounded-3xl" />
          <div className="shimmer h-16 w-4/5 rounded-3xl" />
        </div>
        <div className="flex gap-3">
          <div className="shimmer h-6 w-24 rounded-full" />
          <div className="shimmer h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="shimmer h-4 w-full rounded-full" />
          <div className="shimmer h-4 w-5/6 rounded-full" />
          <div className="shimmer h-4 w-3/4 rounded-full" />
        </div>
        <div className="flex gap-3">
          <div className="shimmer h-12 w-40 rounded-full" />
          <div className="shimmer h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const location = useLocation();
  const discoverSentinelRef = useRef(null);

  const trending = useTrendingMovies();
  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();
  const discover = useDiscoverMovies();
  const genreMapQuery = useGenreMap();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = discover;

  const trendingMovies = trending.data?.pages?.flatMap((page) => page.results) ?? [];
  const popularMovies = popular.data?.pages?.flatMap((page) => page.results) ?? [];
  const topRatedMovies = topRated.data?.pages?.flatMap((page) => page.results) ?? [];
  const discoverMovies = discover.data?.pages?.flatMap((page) => page.results) ?? [];

  const heroSlides = useMemo(() => {
    const base = trendingMovies.length ? trendingMovies : topRatedMovies.length ? topRatedMovies : popularMovies;
    return base.slice(0, 6);
  }, [popularMovies, topRatedMovies, trendingMovies]);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroMovie = heroSlides[heroIndex];
  const heroGenres = heroMovie
    ? mapGenreIds(heroMovie.genre_ids, genreMapQuery.data || {}).slice(0, 3)
    : [];

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(location.hash.replace('#', ''));
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  useEffect(() => {
    const node = discoverSentinelRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '320px 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!heroSlides.length) {
      return;
    }

    setHeroIndex(0);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timerId);
  }, [heroSlides.length]);

  const hasHero = Boolean(heroMovie);

  return (
    <div className="bg-app pb-24">
      <section className="relative min-h-[84vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((movie, index) => {
            const backdrop = movie?.backdrop_path ? getBackdropUrl(movie.backdrop_path) : null;
            const isActive = index === heroIndex;
            return (
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                key={movie.id}
              >
                {backdrop ? (
                  <img alt={movie.title} className="h-full w-full object-cover" src={backdrop} />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.35),transparent_30%),linear-gradient(180deg,#1A1A24_0%,#0B0B0F_70%)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,15,0.98)_0%,rgba(11,11,15,0.85)_36%,rgba(11,11,15,0.45)_64%,rgba(11,11,15,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.25)_0%,rgba(11,11,15,0.1)_48%,rgba(11,11,15,1)_100%)]" />

        {hasHero ? (
          <div className="max-w-7xl mx-auto flex min-h-[84vh] items-end px-6 pb-24 pt-36 md:px-10 lg:px-16">
            <div className="w-full max-w-2xl">
              <span className="mb-4 inline-flex rounded-full border border-white/14 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gray-200 backdrop-blur-md">
                Now Streaming on Movix
              </span>

              <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-7xl">
                {heroMovie.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-md">
                  <Star className="h-4 w-4 fill-[#E50914] text-[#E50914]" />
                  {formatRating(heroMovie.vote_average)}
                </span>
                <span className="rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-md">
                  {getYearFromDate(heroMovie.release_date)}
                </span>
                {heroGenres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-gray-200 backdrop-blur-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-muted mt-6 max-w-xl text-base leading-8 md:text-lg">
                {truncateText(heroMovie.overview, 220)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/movie/${heroMovie.id}`}>
                  <MovixButton size="lg">
                    <Play className="h-4 w-4" />
                    Play
                  </MovixButton>
                </Link>
                <Link to={`/movie/${heroMovie.id}`}>
                  <MovixButton size="lg" variant="secondary">
                    <Info className="h-4 w-4" />
                    More Info
                  </MovixButton>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <HeroFallback />
        )}

        {heroSlides.length > 1 ? (
          <div className="absolute inset-x-0 bottom-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16">
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous trending spotlight"
                  className="surface-glass border-app text-app flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-white/30"
                  onClick={() =>
                    setHeroIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)
                  }
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Next trending spotlight"
                  className="surface-glass border-app text-app flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-white/30"
                  onClick={() => setHeroIndex((current) => (current + 1) % heroSlides.length)}
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {heroSlides.map((movie, index) => (
                  <button
                    aria-label={`Go to ${movie.title}`}
                    className={`h-2.5 w-8 rounded-full transition ${
                      index === heroIndex ? 'bg-[#E50914]' : 'bg-white/30'
                    }`}
                    key={`hero-dot-${movie.id}`}
                    onClick={() => setHeroIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <div className="relative z-10 -mt-16 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <section className="mt-16" id="trending">
          <MovixMovieRow
            isLoading={trending.isLoading}
            movies={trendingMovies}
            subtitle="The titles dominating watchlists this week."
            title="Trending Now"
          />
        </section>

        <section className="mt-16" id="top-rated">
          <MovixMovieRow
            isLoading={topRated.isLoading}
            movies={topRatedMovies}
            subtitle="Critically loved films worth the runtime."
            title="Top Rated"
          />
        </section>

        <section className="mt-16" id="popular">
          <MovixMovieRow
            isLoading={popular.isLoading}
            movies={popularMovies}
            subtitle="Big crowd-pleasers with blockbuster energy."
            title="Popular"
          />
        </section>

        <section className="mt-16" id="discover">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Discover</h2>
              <p className="text-muted mt-2 max-w-2xl text-sm">
                An endless shelf of hand-picked movie energy, loaded 20 at a time as you scroll.
              </p>
            </div>
            {discover.isLoading && !discoverMovies.length ? (
              <div className="hidden md:flex gap-3">
                <MovixMovieSkeleton count={2} />
              </div>
            ) : null}
          </div>

          <MovixMovieGrid
            isFetchingNextPage={discover.isFetchingNextPage}
            isLoading={discover.isLoading}
            movies={discoverMovies}
            sentinelRef={discoverSentinelRef}
          />
        </section>
      </div>
    </div>
  );
}

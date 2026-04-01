import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import MovixMovieCard from './MovixMovieCard';
import MovixMovieSkeleton from './MovixMovieSkeleton';

export default function MovixMovieRow({ title, subtitle, movies = [], isLoading = false }) {
  const scrollerRef = useRef(null);
  const visibleMovies = movies.slice(0, 12);

  const scrollRow = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction === 'left' ? -420 : 420,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-gray-400">{subtitle}</p> : null}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            aria-label={`Scroll ${title} left`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:border-white/20 hover:bg-white/[0.10]"
            onClick={() => scrollRow('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label={`Scroll ${title} right`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:border-white/20 hover:bg-white/[0.10]"
            onClick={() => scrollRow('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-3" ref={scrollerRef}>
        {isLoading
          ? <MovixMovieSkeleton compact count={6} />
          : visibleMovies.map((movie) => <MovixMovieCard compact key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
}

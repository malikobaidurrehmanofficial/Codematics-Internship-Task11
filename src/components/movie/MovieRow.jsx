import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

export default function MovieRow({ title, movies = [], isLoading }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(movies.length > 5);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {title && <h2 className="text-3xl font-bold text-white">{title}</h2>}
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeleton key={`skel-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (!movies.length) return null;

  return (
    <div className="space-y-6">
      {title && <h2 className="text-3xl font-bold text-white">{title}</h2>}

      <div className="relative group/scroll">
        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#E50914] transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
        >
          {movies.map((movie, idx) => (
            <div key={`${movie.id}-${idx}`} className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#E50914] transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

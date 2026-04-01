import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard.new';
import MovieCardSkeleton from './MovieCardSkeleton.new';

export default function MovieRow({ title, movies = [], isLoading }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <>
        <p className="text-gray-400 text-sm mb-4">Loading...</p>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (!movies.length) return null;

  return (
    <div className="relative group">
      {/* Title */}
      {title && <h3 className="text-xl font-bold mb-6">{title}</h3>}

      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 rounded transition"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 rounded transition"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

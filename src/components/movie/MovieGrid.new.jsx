import { useCallback, useRef, useEffect } from 'react';
import MovieCard from './MovieCard.new';
import MovieCardSkeleton from './MovieCardSkeleton.new';

export default function MovieGrid({ movies = [], isLoading, hasMore, onLoadMore }) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore?.();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Infinite Scroll Target */}
      <div ref={observerTarget} className="h-4 mt-12" />

      {/* Empty State */}
      {movies.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No movies found</p>
        </div>
      )}
    </>
  );
}

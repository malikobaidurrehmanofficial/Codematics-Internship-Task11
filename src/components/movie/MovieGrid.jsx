import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

export default function MovieGrid({ movies = [], isLoading, isFetchingNextPage, lastRef }) {
  if (!movies.length && isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <MovieSkeleton key={`skel-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, idx) => (
        <div
          key={`${movie.id}-${idx}`}
          ref={idx === movies.length - 1 ? lastRef : null}
        >
          <MovieCard movie={movie} />
        </div>
      ))}

      {/* Loading indicators */}
      {isFetchingNextPage &&
        Array.from({ length: 5 }).map((_, i) => (
          <MovieSkeleton key={`load-${i}`} />
        ))}
    </div>
  );
}

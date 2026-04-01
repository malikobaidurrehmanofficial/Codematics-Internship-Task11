import MovixMovieCard from './MovixMovieCard';
import MovixMovieSkeleton from './MovixMovieSkeleton';

export default function MovixMovieGrid({
  movies = [],
  isLoading = false,
  isFetchingNextPage = false,
  sentinelRef,
  showHint = true,
}) {
  if (isLoading && !movies.length) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <MovixMovieSkeleton count={10} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovixMovieCard key={movie.id} movie={movie} />
        ))}

        {isFetchingNextPage ? <MovixMovieSkeleton count={5} /> : null}
      </div>

      {showHint ? (
        <div className="text-muted mt-8 flex flex-col items-center justify-center gap-3 text-sm">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E50914] animate-ping" />
              Loading more titles
            </div>
          ) : (
            <p>Keep scrolling the discover shelf for more picks.</p>
          )}
          <div className="h-1 w-full" ref={sentinelRef} />
        </div>
      ) : null}
    </div>
  );
}

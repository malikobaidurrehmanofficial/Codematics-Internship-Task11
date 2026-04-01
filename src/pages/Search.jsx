import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon, X } from 'lucide-react';
import { searchMovies } from '../services/tmdb';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import MovieCard from '../components/movie/MovieCard';
import MovieSkeleton from '../components/movie/MovieSkeleton';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['searchMovies', debouncedQuery, page],
    queryFn: async () => {
      const res = await searchMovies(debouncedQuery, page);
      if (page === 1) {
        setAllResults(res.results || []);
      } else {
        setAllResults((prev) => [...prev, ...(res.results || [])]);
      }
      return res;
    },
    enabled: debouncedQuery.length > 0,
  });

  const hasMore = data ? page < data.total_pages : false;

  const loadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [hasMore, isFetching]);

  const lastRef = useInfiniteScroll(loadMore, { enabled: hasMore && !isFetching });

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
    setSearchParams(value ? { q: value } : {});
    if (!value) {
       setAllResults([]);
    }
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Search Movies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Find thousands of films by title, actors, or directors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-16 md:mb-20">
          <div className="relative max-w-3xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="search-page-input"
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search movies..."
              className="w-full pl-12 pr-12 py-3 md:py-4 rounded-lg border border-gray-300 text-base md:text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {isLoading && page === 1 && debouncedQuery ? (
          <div>
            <p className="text-sm text-gray-600 mb-6">Searching...</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <MovieSkeleton key={`skel-initial-${i}`} />
              ))}
            </div>
          </div>
        ) : allResults.length > 0 ? (
          <div>
            {data && debouncedQuery && (
              <p className="text-sm text-gray-600 mb-6">
                Found <span className="font-semibold text-gray-900">{data.total_results}</span> result{data.total_results !== 1 ? 's' : ''}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allResults.map((movie, idx) => {
                if (movie.media_type && movie.media_type !== 'movie') return null;
                
                return (
                  <div
                    key={`${movie.id}-${idx}`}
                    ref={idx === allResults.length - 1 ? lastRef : null}
                  >
                    <MovieCard movie={movie} />
                  </div>
                );
              })}
              {isFetching &&
                Array.from({ length: 5 }).map((_, i) => <MovieSkeleton key={`skel-more-${i}`} />)}
            </div>
          </div>
        ) : debouncedQuery && !isLoading ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No movies found</h3>
            <p className="text-gray-600">
              Try a different search query.
            </p>
          </div>
        ) : (
          !debouncedQuery && (
            <div className="text-center py-16">
              <SearchIcon className="w-20 h-20 mx-auto mb-6 text-gray-300" />
              <h3 className="text-2xl font-semibold text-gray-700">Start searching</h3>
              <p className="text-gray-600 text-sm mt-2">
                Type a movie title to find what you're looking for
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

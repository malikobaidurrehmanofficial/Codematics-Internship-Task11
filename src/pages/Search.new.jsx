import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input.new';
import MovieGrid from '../components/movie/MovieGrid.new';
import { moviesApi } from '../services/tmdb';
import { useDebounce } from '../hooks/useDebounce';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  // Update search params when query changes
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
      setPage(1);
      setResults([]);
      performSearch(debouncedQuery, 1);
    } else {
      setSearchParams({});
      setResults([]);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery, pageNum) => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const data = await moviesApi.searchMovies(searchQuery, pageNum);
      
      if (pageNum === 1) {
        setResults(data.results);
      } else {
        setResults(prev => [...prev, ...data.results]);
      }
      
      setTotalResults(data.total_results);
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(debouncedQuery, nextPage);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Search Movies</h1>
          <Input
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          {totalResults > 0 && (
            <p className="text-gray-400 mt-2">
              Found {totalResults} results for "{debouncedQuery}"
            </p>
          )}
        </div>

        {/* Results */}
        {query && (
          <MovieGrid
            movies={results}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}

        {/* Initial State */}
        {!query && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Start typing to search movies</p>
          </div>
        )}
      </div>
    </div>
  );
}

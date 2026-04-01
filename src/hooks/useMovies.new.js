import { useState, useCallback } from 'react';
import { moviesApi } from '../services/tmdb';

/**
 * Hook for managing movies fetching and state
 * @param {string} type - Type of movies to fetch ('trending' or 'search')
 * @returns {Object} Movies data and loading states
 */
export function useMovies(type = 'trending') {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(
    async (pageNum = 1, query = null) => {
      try {
        setIsLoading(true);
        setError(null);

        let data;
        if (type === 'search' && query) {
          data = await moviesApi.searchMovies(query, pageNum);
        } else {
          data = await moviesApi.getTrendingMovies(pageNum);
        }

        if (pageNum === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }

        setPage(pageNum);
        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [type]
  );

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchMovies(page + 1);
    }
  }, [page, isLoading, hasMore, fetchMovies]);

  const reset = useCallback(() => {
    setMovies([]);
    setPage(1);
    setError(null);
    setHasMore(true);
  }, []);

  return {
    movies,
    page,
    isLoading,
    error,
    hasMore,
    fetchMovies,
    loadMore,
    reset,
  };
}

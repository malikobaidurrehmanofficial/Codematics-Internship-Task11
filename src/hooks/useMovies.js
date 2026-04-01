import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  discoverMovies,
  getGenreMap,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
} from '../services/movixTmdb';

const getNextPageParam = (lastPage) =>
  lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;

export function useTrendingMovies() {
  return useInfiniteQuery({
    queryKey: ['trending'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTrendingMovies(pageParam),
    getNextPageParam,
  });
}

export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ['popular'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    getNextPageParam,
  });
}

export function useTopRatedMovies() {
  return useInfiniteQuery({
    queryKey: ['topRated'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
    getNextPageParam,
  });
}

export function useDiscoverMovies() {
  return useInfiniteQuery({
    queryKey: ['discover'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      discoverMovies({
        page: pageParam,
        include_adult: false,
        sort_by: 'popularity.desc',
      }),
    getNextPageParam,
  });
}

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id),
    enabled: Boolean(id),
  });
}

export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: Boolean(query) && query.length >= 2,
  });
}

export function useGenreMap() {
  return useQuery({
    queryKey: ['genreMap'],
    queryFn: getGenreMap,
    staleTime: Infinity,
  });
}

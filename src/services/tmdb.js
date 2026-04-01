const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

// ─── Image helpers ───
export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path, size = 'original') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

// ─── Fetch wrapper ───
const tmdbFetch = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, v);
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

// ─── API functions ───
export const getTrendingMovies = (page = 1) =>
  tmdbFetch('/trending/movie/week', { page });

export const getPopularMovies = (page = 1) =>
  tmdbFetch('/movie/popular', { page });

export const getTopRatedMovies = (page = 1) =>
  tmdbFetch('/movie/top_rated', { page });

export const searchMovies = (query, page = 1) =>
  tmdbFetch('/search/movie', { query, page });

export const getMovieDetails = (id) =>
  tmdbFetch(`/movie/${id}`, { append_to_response: 'videos,credits' });

export const discoverMovies = (params = {}) =>
  tmdbFetch('/discover/movie', params);

export const getGenreList = () =>
  tmdbFetch('/genre/movie/list');

// ─── Genre map (cached) ───
let genreMap = null;
export const getGenreMap = async () => {
  if (genreMap) return genreMap;
  const data = await getGenreList();
  genreMap = {};
  data.genres.forEach((g) => {
    genreMap[g.id] = g.name;
  });
  return genreMap;
};

export const mapGenreIds = (ids = [], gMap = {}) =>
  ids.map((id) => gMap[id]).filter(Boolean);

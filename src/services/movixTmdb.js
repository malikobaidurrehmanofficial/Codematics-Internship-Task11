const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

const buildImageUrl = (path, size) => (path ? `${IMG_BASE}/${size}${path}` : null);

export const getPosterUrl = (path, size = 'w500') => buildImageUrl(path, size);
export const getBackdropUrl = (path, size = 'original') => buildImageUrl(path, size);
export const getProfileUrl = (path, size = 'w185') => buildImageUrl(path, size);

const tmdbFetch = async (endpoint, params = {}) => {
  if (!API_KEY) {
    throw new Error('Missing TMDB API key. Set VITE_TMDB_API_KEY in your environment.');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getTrendingMovies = (page = 1) => tmdbFetch('/trending/movie/week', { page });
export const getPopularMovies = (page = 1) => tmdbFetch('/movie/popular', { page });
export const getTopRatedMovies = (page = 1) => tmdbFetch('/movie/top_rated', { page });
export const searchMovies = (query, page = 1) => tmdbFetch('/search/movie', { query, page });
export const getMovieDetails = (id) =>
  tmdbFetch(`/movie/${id}`, { append_to_response: 'videos,credits,images' });
export const discoverMovies = (params = {}) => tmdbFetch('/discover/movie', params);
export const getGenreList = () => tmdbFetch('/genre/movie/list');

let genreMap = null;

export const getGenreMap = async () => {
  if (genreMap) {
    return genreMap;
  }

  const data = await getGenreList();
  genreMap = {};

  data.genres.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  return genreMap;
};

export const mapGenreIds = (ids = [], genres = {}) => ids.map((id) => genres[id]).filter(Boolean);

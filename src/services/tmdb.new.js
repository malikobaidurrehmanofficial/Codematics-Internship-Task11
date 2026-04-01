const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const moviesApi = {
  async getTrendingMovies(page = 1) {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    return response.json();
  },

  async searchMovies(query, page = 1) {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to search movies');
    return response.json();
  },

  async getMovieDetails(movieId) {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return response.json();
  },

  async getMovieGenres() {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch genres');
    const data = await response.json();
    return data.genres;
  },

  async getMoviesByGenre(genreId, page = 1) {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch movies by genre');
    return response.json();
  },
};

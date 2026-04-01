import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  homeMovies: [],
  searchResults: [],
  currentMovie: null,
  page: 1,
  totalPages: 1,
  hasMore: true,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setHomeMovies: (state, action) => {
      const { movies, page = 1, totalPages } = action.payload;
      state.homeMovies = page === 1 ? movies : [...state.homeMovies, ...movies];
      state.page = page;
      state.totalPages = totalPages;
      state.hasMore = page < totalPages;
      state.error = null;
    },
    setSearchResults: (state, action) => {
      const { movies, page = 1, totalPages } = action.payload;
      state.searchResults = page === 1 ? movies : [...state.searchResults, ...movies];
      state.page = page;
      state.totalPages = totalPages;
      state.hasMore = page < totalPages;
      state.error = null;
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetSearch: (state) => {
      state.searchResults = [];
      state.page = 1;
      state.totalPages = 1;
      state.hasMore = true;
    },
  },
});

export const {
  setHomeMovies,
  setSearchResults,
  setCurrentMovie,
  setLoading,
  setError,
  resetSearch,
} = moviesSlice.actions;

// Selectors
export const selectMovies = (state) => ({
  homeMovies: state.movies.homeMovies,
  searchResults: state.movies.searchResults,
  page: state.movies.page,
  hasMore: state.movies.hasMore,
});
export const selectCurrentMovie = (state) => state.movies.currentMovie;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;

export default moviesSlice.reducer;

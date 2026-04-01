import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    movieIds: [],
    loading: false,
  },
  reducers: {
    setWatchlist: (state, action) => {
      state.movieIds = action.payload;
      state.loading = false;
    },
    addMovieId: (state, action) => {
      if (!state.movieIds.includes(action.payload)) {
        state.movieIds.push(action.payload);
      }
    },
    removeMovieId: (state, action) => {
      state.movieIds = state.movieIds.filter((id) => id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.movieIds = [];
      state.loading = false;
    },
    setWatchlistLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setWatchlist, addMovieId, removeMovieId, clearWatchlist, setWatchlistLoading } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;

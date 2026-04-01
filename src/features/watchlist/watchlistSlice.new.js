import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some(item => item.id === movie.id);
      if (!exists) {
        state.items.push(movie);
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter(item => item.id !== movieId);
    },
    clearWatchlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;

// Selectors
export const selectWatchlist = (state) => state.watchlist.items;
export const selectIsInWatchlist = (state, movieId) =>
  state.watchlist.items.some(item => item.id === movieId);
export const selectWatchlistCount = (state) => state.watchlist.items.length;

export default watchlistSlice.reducer;

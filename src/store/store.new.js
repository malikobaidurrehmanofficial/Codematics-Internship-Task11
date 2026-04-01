import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.new';
import moviesReducer from '../features/movies/moviesSlice.new';
import watchlistReducer from '../features/watchlist/watchlistSlice.new';
import themeReducer from '../features/theme/themeSlice.new';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    watchlist: watchlistReducer,
    theme: themeReducer,
  },
});

export default store;

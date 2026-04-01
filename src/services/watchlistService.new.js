const STORAGE_KEY = 'filmfolio_watchlist';

export const watchlistService = {
  /**
   * Save watchlist to localStorage
   */
  saveWatchlist(watchlist) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error('Failed to save watchlist:', error);
    }
  },

  /**
   * Get watchlist from localStorage
   */
  getWatchlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load watchlist:', error);
      return [];
    }
  },

  /**
   * Add movie to watchlist
   */
  addMovie(movie) {
    const watchlist = this.getWatchlist();
    const exists = watchlist.some(m => m.id === movie.id);
    if (!exists) {
      watchlist.push(movie);
      this.saveWatchlist(watchlist);
    }
    return watchlist;
  },

  /**
   * Remove movie from watchlist
   */
  removeMovie(movieId) {
    const watchlist = this.getWatchlist();
    const filtered = watchlist.filter(m => m.id !== movieId);
    this.saveWatchlist(filtered);
    return filtered;
  },

  /**
   * Check if movie is in watchlist
   */
  isInWatchlist(movieId) {
    const watchlist = this.getWatchlist();
    return watchlist.some(m => m.id === movieId);
  },

  /**
   * Clear entire watchlist
   */
  clearWatchlist() {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Get watchlist count
   */
  getCount() {
    return this.getWatchlist().length;
  },
};

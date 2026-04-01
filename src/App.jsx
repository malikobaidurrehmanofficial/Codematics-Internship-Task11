import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { logout, setUser } from './store/authSlice';
import { clearWatchlist, setWatchlist, setWatchlistLoading } from './store/watchlistSlice';
import { onAuthChange, serializeUser } from './services/authService';
import { subscribeToWatchlist } from './services/watchlistService';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.uid);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(serializeUser(firebaseUser)));
        return;
      }

      dispatch(logout());
      dispatch(clearWatchlist());
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      dispatch(clearWatchlist());
      return undefined;
    }

    dispatch(setWatchlistLoading(true));
    const unsubscribe = subscribeToWatchlist(userId, (movieIds) => {
      dispatch(setWatchlist(movieIds));
    });

    return () => unsubscribe();
  }, [dispatch, userId]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <AppRouter />
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRouter from './routes/AppRouter.new';
import { authService } from './services/authService.new';
import { setUser } from './features/auth/authSlice.new';

function App() {
  const dispatch = useDispatch();

  // Check authentication on app load
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-bg text-white">
      <AppRouter />
    </div>
  );
}

export default App;

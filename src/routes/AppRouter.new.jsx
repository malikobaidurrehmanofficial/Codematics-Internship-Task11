import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout.new';
import ProtectedRoute from '../components/ui/ProtectedRoute.new';

// Pages
import Home from '../pages/Home.new';
import Search from '../pages/Search.new';
import MovieDetail from '../pages/MovieDetail.new';
import Watchlist from '../pages/Watchlist.new';
import Login from '../pages/Login.new';
import Signup from '../pages/Signup.new';
import NotFound from '../pages/NotFound.new';

// Selectors
import { selectUser } from '../features/auth/authSlice';

export default function AppRouter() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

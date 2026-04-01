import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import Watchlist from '../pages/Watchlist';
import Search from '../pages/Search';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

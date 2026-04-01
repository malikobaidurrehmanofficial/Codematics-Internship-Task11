import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/movie/HeroSlider.new';
import MovieGrid from '../components/movie/MovieGrid.new';
import { moviesApi } from '../services/tmdb';
import { setHomeMovies, setLoading, setError, selectMovies, selectLoading } from '../features/movies/moviesSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { homeMovies, page, hasMore } = useSelector(selectMovies);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      dispatch(setLoading(true));
      const data = await moviesApi.getTrendingMovies(1);
      dispatch(setHomeMovies({ movies: data.results, totalPages: data.total_pages }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoadMore = async () => {
    if (page >= 3) return; // Limit to first 3 pages
    try {
      dispatch(setLoading(true));
      const data = await moviesApi.getTrendingMovies(page + 1);
      dispatch(setHomeMovies({ 
        movies: [...homeMovies, ...data.results], 
        page: page + 1,
        totalPages: data.total_pages 
      }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      {homeMovies.length > 0 && (
        <HeroSlider movies={homeMovies.slice(0, 5)} onSelectMovie={handleMovieClick} />
      )}

      {/* Trendings Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Trending Now</h2>
          <MovieGrid
            movies={homeMovies}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </section>
    </div>
  );
}

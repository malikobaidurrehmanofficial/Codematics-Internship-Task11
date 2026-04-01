import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { useTrendingMovies } from '../../hooks/useMovies';
import { getBackdropUrl } from '../../services/tmdb';
import Button from '../ui/Button';

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { data, isLoading } = useTrendingMovies();

  const movies = data?.pages?.[0]?.results || [];
  const heroMovies = movies.slice(0, 5);

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  if (heroMovies.length === 0 || isLoading) {
    return <div className="w-full h-96 bg-gray-800 animate-pulse rounded-xl" />;
  }

  const movie = heroMovies[currentIndex];
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="pt-16 pb-8 md:pb-12">
      <div className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden group">
        {/* Background Images */}
        {heroMovies.map((m, idx) => (
          <div
            key={m.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={getBackdropUrl(m.backdrop_path)}
              alt={m.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="max-w-3xl px-6 md:px-12 animate-fade-in">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {movie.title || movie.name}
            </h1>

            {/* Info Row */}
            <div className="flex items-center gap-4 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                <span className="text-[#E50914] font-bold">★</span>
                <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}/10</span>
              </div>
              <div className="text-gray-300 font-medium">
                {movie.release_date?.slice(0, 4)}
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed line-clamp-3">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5 fill-white" />
                Play Now
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-2"
              >
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-6 md:left-12 flex gap-2.5">
          {heroMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-12 bg-[#E50914]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
              setCurrentIndex(
                (prev) => (prev - 1 + heroMovies.length) % heroMovies.length
              )
            }
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-lg hover:bg-white/30 bg-white/10 text-white transition hidden md:block pointer-events-auto"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % heroMovies.length)
            }
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
            {heroMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentIndex
                    ? 'h-2 w-8 bg-white'
                    : 'h-2 w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

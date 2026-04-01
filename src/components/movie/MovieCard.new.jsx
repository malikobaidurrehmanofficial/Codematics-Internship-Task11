import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { getPosterUrl } from '../../services/tmdb';

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!movie?.poster_path) return null;

  return (
    <div
      className="group relative flex-shrink-0 w-40 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Image */}
      <img
        src={getPosterUrl(movie.poster_path, 'w300')}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-2xl shadow-md group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
      />

      {/* Rating Badge */}
      {movie.vote_average > 0 && (
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          {movie.vote_average.toFixed(1)}
        </div>
      )}

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur rounded-2xl flex items-center justify-center gap-3 animate-fade-in">
          <button className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition">
            <Play className="w-5 h-5 fill-white" />
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Title */}
      <p className="mt-3 text-sm font-medium line-clamp-2 group-hover:text-red-500 transition">
        {movie.title}
      </p>
    </div>
  );
}

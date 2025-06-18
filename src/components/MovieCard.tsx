import React from 'react';
import { Calendar, Film, Tv, PlayCircle } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'movie':
        return <Film size={16} />;
      case 'series':
        return <Tv size={16} />;
      default:
        return <PlayCircle size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'movie':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'series':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <Film className="text-gray-500" size={48} />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getTypeColor(movie.Type)}`}>
            {getTypeIcon(movie.Type)}
            {movie.Type}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-white/90">
            <Calendar size={14} />
            <span className="text-sm">{movie.Year}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="capitalize">{movie.Type}</span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
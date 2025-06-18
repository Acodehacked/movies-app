import React from 'react';
import { Film } from 'lucide-react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: string;
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading, 
  error, 
  totalResults, 
  onMovieClick 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-700/50 rounded-2xl mb-4"></div>
            <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
            <div className="h-3 bg-gray-700/50 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-red-400 mb-4">
            <Film size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Search Error</h3>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-6">
          <Film size={64} className="mx-auto" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Discover Amazing Movies & TV Shows
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Start typing in the search bar above to find your favorite movies, TV series, and episodes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-300">
          Found <span className="text-white font-semibold">{totalResults}</span> results
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
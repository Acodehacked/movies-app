import React from 'react';
import { X, Star, Calendar, Clock, Globe, Award, Users, Pen } from 'lucide-react';
import { DetailedMovie } from '../types/movie';

interface MovieDetailsProps {
  movie: DetailedMovie;
  onClose: () => void;
  loading: boolean;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose, loading }) => {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full mx-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded mb-4"></div>
            <div className="h-32 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getRatingColor = (rating: string, source: string) => {
    const numRating = parseFloat(rating);
    
    if (source === 'Internet Movie Database') {
      if (numRating >= 8) return 'text-green-400';
      if (numRating >= 6) return 'text-yellow-400';
      return 'text-red-400';
    }
    
    if (source === 'Rotten Tomatoes') {
      const percentage = parseInt(rating);
      if (percentage >= 80) return 'text-green-400';
      if (percentage >= 60) return 'text-yellow-400';
      return 'text-red-400';
    }
    
    return 'text-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl max-w-4xl w-full my-8 border border-gray-700/50">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors duration-200"
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-5 gap-6 p-6">
            <div className="md:col-span-2">
              {movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Poster</span>
                </div>
              )}
            </div>

            <div className="md:col-span-3 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{movie.Title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {movie.Year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {movie.Runtime}
                  </span>
                  <span className="px-2 py-1 bg-gray-700/50 rounded-lg text-sm">
                    {movie.Rated}
                  </span>
                </div>
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className={getRatingColor(rating.Value, rating.Source)} size={20} />
                      </div>
                      <div className={`text-lg font-bold ${getRatingColor(rating.Value, rating.Source)}`}>
                        {rating.Value}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {rating.Source === 'Internet Movie Database' ? 'IMDb' :
                         rating.Source === 'Rotten Tomatoes' ? 'Rotten Tomatoes' :
                         'Metacritic'}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Users className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <span className="text-gray-400">Director:</span>
                      <span className="text-white ml-2">{movie.Director}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Pen className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <span className="text-gray-400">Writer:</span>
                      <span className="text-white ml-2">{movie.Writer}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Globe className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <span className="text-gray-400">Country:</span>
                      <span className="text-white ml-2">{movie.Country}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Award className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <span className="text-gray-400">Awards:</span>
                      <span className="text-white ml-2">{movie.Awards}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(', ').map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
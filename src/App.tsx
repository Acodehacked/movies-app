import React, { useState } from 'react';
import { Film } from 'lucide-react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import { useMovies, useMovieDetails } from './hooks/useMovies';
import { Movie } from './types/movie';

function App() {
  const { movies, loading, error, totalResults, search } = useMovies();
  const { movieDetails, loading: detailsLoading, fetchDetails, clearDetails } = useMovieDetails();
  const [showAPIKeyMessage, setShowAPIKeyMessage] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    fetchDetails(movie.imdbID);
  };

  const handleCloseDetails = () => {
    clearDetails();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                  <Film className="text-blue-400" size={32} />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  CineSearch
                </h1>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover and explore millions of movies, TV series, and episodes with detailed information and ratings.
              </p>
            </div>

            {/* API Key Notice */}
            {showAPIKeyMessage && (
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <span className="text-amber-400 text-sm font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-amber-400 font-semibold mb-1">API Key Required</h3>
                      <p className="text-amber-300/80 text-sm">
                        To use this app, you need to get a free API key from{' '}
                        <a 
                          href="http://www.omdbapi.com/apikey.aspx" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline hover:text-amber-300"
                        >
                          OMDB API
                        </a>
                        {' '}and update the API_KEY in src/utils/api.ts
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAPIKeyMessage(false)}
                      className="flex-shrink-0 text-amber-400/60 hover:text-amber-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}

            <SearchBar onSearch={search} loading={loading} />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          <MovieGrid
            movies={movies}
            loading={loading}
            error={error}
            totalResults={totalResults}
            onMovieClick={handleMovieClick}
          />
        </main>

        {/* Movie Details Modal */}
        {movieDetails && (
          <MovieDetails
            movie={movieDetails}
            onClose={handleCloseDetails}
            loading={detailsLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
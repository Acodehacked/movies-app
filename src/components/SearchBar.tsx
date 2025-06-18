import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, year: string, type: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, year, type);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, year, type, onSearch]);

  const clearFilters = () => {
    setYear('');
    setType('');
    setShowFilters(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <div className="relative">
          <Search 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-200 ${
              loading ? 'animate-pulse' : ''
            }`} 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search for movies, TV series, episodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-16 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Filter size={20} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any Year</option>
                  {years.map((y) => (
                    <option key={y} value={y.toString()}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any Type</option>
                  <option value="movie">Movies</option>
                  <option value="series">TV Series</option>
                  <option value="episode">Episodes</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-200"
                  title="Clear Filters"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
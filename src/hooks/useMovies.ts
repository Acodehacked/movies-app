import { useState, useEffect, useCallback } from 'react';
import { searchMovies, getMovieDetails } from '../utils/api';
import { Movie, DetailedMovie } from '../types/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState('0');

  const search = useCallback(async (query: string, year?: string, type?: string) => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults('0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(query, year, type);
      
      if (response.Response === 'True') {
        setMovies(response.Search || []);
        setTotalResults(response.totalResults || '0');
      } else {
        setError(response.Error || 'No movies found');
        setMovies([]);
        setTotalResults('0');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
      setTotalResults('0');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    movies,
    loading,
    error,
    totalResults,
    search,
  };
};

export const useMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<DetailedMovie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async (imdbID: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMovieDetails(imdbID);
      
      if (response.Response === 'True') {
        setMovieDetails(response);
      } else {
        setError(response.Error || 'Failed to fetch movie details');
        setMovieDetails(null);
      }
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearDetails = useCallback(() => {
    setMovieDetails(null);
    setError(null);
  }, []);

  return {
    movieDetails,
    loading,
    error,
    fetchDetails,
    clearDetails,
  };
};
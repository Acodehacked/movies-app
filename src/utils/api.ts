const API_KEY = 'affe98e'; // Users need to get their own key from http://www.omdbapi.com/apikey.aspx
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query: string, year?: string, type?: string): Promise<any> => {
  if (!query.trim()) return { Search: [], totalResults: '0', Response: 'True' };
  
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    ...(year && { y: year }),
    ...(type && { type }),
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  return response.json();
};

export const getMovieDetails = async (imdbID: string): Promise<any> => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: 'full',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  return response.json();
};
import {useEffect, useState} from 'react';
import movieAPI from '../api/movieAPI';
import {Movie, MovieResponse} from '../interfaces/movie';

type MovieState = {
  isLoading: boolean;
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
};

function useMovies() {
  const [movieState, setMovieState] = useState<MovieState>({
    isLoading: true,
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMoviesNowPlaying = async () => {
    try {
      const response = await movieAPI.get<MovieResponse>('/now_playing');
      return response;
    } catch (error) {
      console.error('Error on getMoviesNowPlaying', error);
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await movieAPI.get<MovieResponse>('/popular');
      return response;
    } catch (error) {
      console.log('Error on getPopularMovies', error);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await movieAPI.get<MovieResponse>('/top_rated');
      return response;
    } catch (error) {
      console.log('Error on getTopRatedMovies', error);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      const response = await movieAPI.get<MovieResponse>('/upcoming');
      return response;
    } catch (error) {
      console.log('Error on getUpcomingMovies', error);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      const response = await Promise.all([
        getMoviesNowPlaying(),
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
      ]);
      setMovieState(prev => {
        return {
          ...prev,
          isLoading: false,
          nowPlaying: response[0]?.data.results || [],
          popular: response[1]?.data.results || [],
          topRated: response[2]?.data.results || [],
          upcoming: response[3]?.data.results || [],
        };
      });
    };

    makeRequest();
  }, []);

  return {
    ...movieState,
  };
}

export default useMovies;

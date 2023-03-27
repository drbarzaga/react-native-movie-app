import movieAPI from '../api/movieAPI';
import {useCallback, useEffect, useState} from 'react';
import {MovieFullDetail} from '../interfaces/movie';
import {Cast, CreditsResponse} from '../interfaces/credit';

interface MovieDetail {
  isLoading: boolean;
  detail: MovieFullDetail | null;
  cast: Cast[];
}

function useMovieDetails(id: number) {
  const [movieDetail, setMovieDetail] = useState<MovieDetail>({
    isLoading: true,
    detail: null,
    cast: [],
  });

  const getMovieDetails = useCallback(async () => {
    try {
      const response = await movieAPI.get<MovieFullDetail>(`/${id}`);
      return response;
    } catch (error) {
      console.error('Error on getMovieDetails', error);
    }
  }, [id]);

  const getMovieCredits = useCallback(async () => {
    try {
      const response = await movieAPI.get<CreditsResponse>(`/${id}/credits`);
      return response;
    } catch (error) {
      console.error('Error on getMovieCredits', error);
    }
  }, [id]);

  useEffect(() => {
    const makeRequests = async () => {
      const response = await Promise.all([
        getMovieDetails(),
        getMovieCredits(),
      ]);
      setMovieDetail(prev => {
        return {
          ...prev,
          isLoading: false,
          detail: response[0]?.data || null,
          cast: response[1]?.data.cast || [],
        };
      });
    };

    makeRequests();
  }, [getMovieDetails, getMovieCredits]);

  return movieDetail;
}

export default useMovieDetails;

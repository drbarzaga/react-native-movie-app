import axios from 'axios';

const movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  params: {
    api_key: '75a40e0f403c0636d88c8ef739debd11',
    language: 'es-ES',
  },
});

export default movieAPI;

import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const API_URL = process.env.REACT_APP_DEVELOPMENT
  ? 'http://localhost:8080/api/1.0'
  : 'https://hotel-api-e55z.onrender.com/api/1.0';

export const useBaseQuery = fetchBaseQuery({ baseUrl: API_URL });

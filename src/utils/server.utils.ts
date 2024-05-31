import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getToken } from './token.utils';

const API_URL =
  process.env.REACT_APP_DEVELOPMENT === 'false'
    ? process.env.REACT_APP_PRODUCTION_URL
    : process.env.REACT_APP_DEVELOPMENT_URL;

export const useBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders(headers) {
    headers.set('Authorization', getToken() as string);
  }
});

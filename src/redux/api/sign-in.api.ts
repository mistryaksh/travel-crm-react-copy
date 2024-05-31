import { createApi } from '@reduxjs/toolkit/query/react';
import { useBaseQuery } from 'utils';

export const AuthenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: useBaseQuery,
  endpoints: builder => ({
    signIn: builder.mutation<
      {
        data: { token: string; userExist: { email: string; password: string } };
      },
      { email: string; password: string }
    >({
      query: credentials => ({
        url: '/user/sign-in',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useSignInMutation } = AuthenticationApi;
export const AuthenticationMiddleware = AuthenticationApi.middleware;
export const AuthenticationReducer = AuthenticationApi.reducer;

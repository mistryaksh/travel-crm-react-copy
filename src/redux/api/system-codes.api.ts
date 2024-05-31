import { createApi } from '@reduxjs/toolkit/query/react';
import { ISystemCodeProps } from 'interface';
import { useBaseQuery } from 'utils';

export const systemCodesApi = createApi({
  reducerPath: 'systemCodesApi',
  baseQuery: useBaseQuery,
  tagTypes: ['systemCodesApi'],
  endpoints: builder => ({
    getSystemCodes: builder.query<{ data: ISystemCodeProps[] }, void>({
      query: () => '/system-codes',
      providesTags: ['systemCodesApi']
    }),
    addSystemCode: builder.mutation<
      { data: ISystemCodeProps },
      ISystemCodeProps
    >({
      query: newSystemCode => ({
        url: '/system-codes',
        method: 'POST',
        body: newSystemCode
      }),
      invalidatesTags: ['systemCodesApi']
    }),
    getSystemCodeById: builder.query<{ data: ISystemCodeProps }, string>({
      query: systemCodeId => `/system-codes/${systemCodeId}`,
      providesTags: ['systemCodesApi']
    }),
    updateSystemCode: builder.mutation<{ data: string }, ISystemCodeProps>({
      query: ({ ...updatedSystemCode }) => ({
        url: `/system-codes/${updatedSystemCode._id}`,
        method: 'PUT',
        body: updatedSystemCode
      }),
      invalidatesTags: ['systemCodesApi']
    }),
    deleteSystemCode: builder.mutation<{ data: string }, string>({
      query: systemCodeId => ({
        url: `/system-codes/${systemCodeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['systemCodesApi']
    })
  })
});

export const {
  useGetSystemCodesQuery,
  useAddSystemCodeMutation,
  useGetSystemCodeByIdQuery,
  useUpdateSystemCodeMutation,
  useDeleteSystemCodeMutation,
  useLazyGetSystemCodeByIdQuery
} = systemCodesApi;
export const systemCodesApiReducer = systemCodesApi.reducer;
export const systemCodesApiMiddleware = systemCodesApi.middleware;

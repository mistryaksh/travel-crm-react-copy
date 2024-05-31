import { createApi } from '@reduxjs/toolkit/query/react';
import { IBedTypeProps } from 'interface';
import { useBaseQuery } from 'utils';

const BedTypeApi = createApi({
  baseQuery: useBaseQuery,
  reducerPath: 'bedTypeApi',
  tagTypes: ['bedTypeApi'],
  endpoints: ({ mutation, query }) => ({
    getBedType: query<{ data: IBedTypeProps[] }, void>({
      query: () => '/bed/types',
      providesTags: ['bedTypeApi']
    }),
    getBedTypeById: query<{ data: IBedTypeProps }, string>({
      query: bedTypeId => `/bed/types/${bedTypeId}`,
      providesTags: ['bedTypeApi']
    }),
    addBedType: mutation<{ data: string }, IBedTypeProps>({
      query: ({ ...payload }) => {
        return {
          url: '/bed/types',
          method: 'POST',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['bedTypeApi']
    }),
    updateBedType: mutation<{ data: string }, IBedTypeProps>({
      query: ({ _id, ...payload }) => {
        return {
          url: `/bed/types/${_id}`,
          method: 'PUT',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['bedTypeApi']
    }),
    deleteBedType: mutation<{ data: string }, string>({
      query: bedTypeId => {
        return {
          url: `/bed/types/${bedTypeId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['bedTypeApi']
    })
  })
});

export const BedTypeApiReducer = BedTypeApi.reducer;
export const BedTypeApiMiddleware = BedTypeApi.middleware;
export const {
  useAddBedTypeMutation,
  useDeleteBedTypeMutation,
  useGetBedTypeByIdQuery,
  useGetBedTypeQuery,
  useLazyGetBedTypeByIdQuery,
  useLazyGetBedTypeQuery,
  useUpdateBedTypeMutation
} = BedTypeApi;

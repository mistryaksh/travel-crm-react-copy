import { createApi } from '@reduxjs/toolkit/query/react';
import { IAmenityProps } from 'interface';
import { useBaseQuery } from 'utils';

const AmenityApi = createApi({
  reducerPath: 'amenityApi',
  baseQuery: useBaseQuery,
  tagTypes: ['amenityApi'],
  endpoints: ({ mutation, query }) => ({
    createAmenity: mutation<{ data: { message: string } }, IAmenityProps>({
      query: amenity => ({
        url: '/amenity',
        method: 'POST',
        body: { ...amenity }
      }),
      invalidatesTags: ['amenityApi']
    }),
    getAmenities: query<{ data: IAmenityProps[] }, void>({
      query: () => '/amenity',
      providesTags: ['amenityApi']
    }),
    updateAmenity: mutation<{ data: string }, IAmenityProps>({
      query: amenity => ({
        url: `/amenity/${amenity.id}`,
        method: 'PUT',
        body: { ...amenity }
      }),
      invalidatesTags: ['amenityApi']
    }),
    deleteAmenity: mutation<{ data: { message: string } }, string>({
      query: id => {
        return {
          url: `/amenity/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['amenityApi']
    })
  })
});

export const {
  useCreateAmenityMutation,
  useGetAmenitiesQuery,
  useLazyGetAmenitiesQuery,
  useUpdateAmenityMutation,
  useDeleteAmenityMutation
} = AmenityApi;
export const AmenityApiReducer = AmenityApi.reducer;
export const AmenityApiMiddleware = AmenityApi.middleware;

import { createApi } from '@reduxjs/toolkit/query/react';
import { IAmenitiesCategoryProps, IAmenitiesProps } from 'interface';
import { useBaseQuery } from 'utils';

const AmenityCategoryApi = createApi({
  reducerPath: 'amenityCategoryApi',
  baseQuery: useBaseQuery,
  tagTypes: ['amenityCategoryApi'],
  endpoints: ({ mutation, query }) => ({
    getAmenityCategory: query<{ data: IAmenitiesCategoryProps[] }, void>({
      query: () => '/amenity/category',
      providesTags: ['amenityCategoryApi']
    }),
    addAmenityCategory: mutation<
      { data: IAmenitiesCategoryProps },
      IAmenitiesCategoryProps
    >({
      query: amenityCategory => ({
        url: '/amenity/category',
        method: 'POST',
        body: amenityCategory
      }),
      invalidatesTags: ['amenityCategoryApi']
    }),
    getAmenityCategoryById: query<{ data: IAmenitiesCategoryProps }, string>({
      query: id => `/amenity/category/${id}`,
      providesTags: ['amenityCategoryApi']
    }),
    deleteAmenityCategory: mutation<{ data: string }, string>({
      query: amenityCategoryId => {
        return {
          url: `/amenity/category/${amenityCategoryId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['amenityCategoryApi']
    }),
    updateAmenityCategoryById: mutation<
      { data: string },
      IAmenitiesCategoryProps
    >({
      query: ({ AmenitiesCategoryId, ...payload }) => {
        console.log(AmenitiesCategoryId);
        return {
          url: `/amenity/category/${AmenitiesCategoryId}`,
          method: 'PUT',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['amenityCategoryApi']
    })
  })
});

const AmenityApi = createApi({
  baseQuery: useBaseQuery,
  reducerPath: 'amenityApi',
  tagTypes: ['amenityApi'],
  endpoints: ({ mutation, query }) => ({
    getAmenity: query<{ data: IAmenitiesProps[] }, void>({
      query: () => '/amenities',
      providesTags: ['amenityApi']
    }),
    getAmenityById: query<{ data: IAmenitiesProps }, string>({
      query: amenitiesId => `/amenities/${amenitiesId}`,
      providesTags: ['amenityApi']
    }),
    createAmenity: mutation<{ data: string }, IAmenitiesProps>({
      query: ({ ...payload }) => {
        return {
          url: '/amenities',
          method: 'POST',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['amenityApi']
    }),
    deleteAmenity: mutation<{ data: string }, string>({
      query: amenitiesId => {
        return {
          url: `/amenities/${amenitiesId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['amenityApi']
    }),
    updateAmenity: mutation<{ data: string }, string>({
      query: amenitiesId => {
        return {
          url: `/amenities/${amenitiesId}`
        };
      },
      invalidatesTags: ['amenityApi']
    })
  })
});

export const AmenitiesCategoryApiReducer = AmenityCategoryApi.reducer;
export const AmenitiesCategoryApiMiddleware = AmenityCategoryApi.middleware;
export const {
  useAddAmenityCategoryMutation,
  useDeleteAmenityCategoryMutation,
  useGetAmenityCategoryByIdQuery,
  useGetAmenityCategoryQuery,
  useLazyGetAmenityCategoryByIdQuery,
  useLazyGetAmenityCategoryQuery,
  useUpdateAmenityCategoryByIdMutation
} = AmenityCategoryApi;

export const AmenityApiReducer = AmenityApi.reducer;
export const AmenityMiddleware = AmenityApi.middleware;
export const {
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
  useGetAmenityByIdQuery,
  useGetAmenityQuery,
  useLazyGetAmenityByIdQuery,
  useLazyGetAmenityQuery,
  useUpdateAmenityMutation
} = AmenityApi;

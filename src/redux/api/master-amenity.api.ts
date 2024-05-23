import { createApi } from '@reduxjs/toolkit/query/react';
import { IMasterAmenityProps } from 'interface';
import { useBaseQuery } from 'utils';

const MasterAmenityApi = createApi({
  reducerPath: 'masterAmenityApi',
  baseQuery: useBaseQuery,
  tagTypes: ['masterAmenityApi'],
  endpoints: ({ mutation, query }) => ({
    getMasterAmenities: query<{ data: IMasterAmenityProps[] }, void>({
      query: () => '/master/amenity',
      providesTags: ['masterAmenityApi']
    }),
    createMasterAmenity: mutation<
      { data: { message: string } },
      IMasterAmenityProps
    >({
      query: amenity => ({
        url: '/master/amenity',
        method: 'POST',
        body: amenity
      }),
      invalidatesTags: ['masterAmenityApi']
    }),
    updateMasterAmenity: mutation<
      { data: { message: string } },
      IMasterAmenityProps
    >({
      query: ({ id, ...payload }) => ({
        url: `/master/amenity/${id}`,
        method: 'PUT',
        body: {
          ...payload
        }
      }),
      invalidatesTags: ['masterAmenityApi']
    }),
    getMasterAmenityById: query<{ data: IMasterAmenityProps }, void>({
      query: id => `/master/amenity/${id}`,
      providesTags: ['masterAmenityApi']
    }),
    deleteMasterAmenityById: mutation<{ data: { message: string } }, string>({
      query: id => {
        return {
          url: `/master/amenity/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['masterAmenityApi']
    })
  })
});

export const {
  useGetMasterAmenitiesQuery,
  useCreateMasterAmenityMutation,
  useUpdateMasterAmenityMutation,
  useGetMasterAmenityByIdQuery,
  useDeleteMasterAmenityByIdMutation,
  useLazyGetMasterAmenitiesQuery,
  useLazyGetMasterAmenityByIdQuery
} = MasterAmenityApi;

export const MasterAmenityApiReducer = MasterAmenityApi.reducer;
export const MasterAmenityApiMiddleware = MasterAmenityApi.middleware;

// src/services/api.js

import { createApi } from '@reduxjs/toolkit/query/react';
import { IPropertyTypeProps } from 'interface';
import { useBaseQuery } from 'utils';

export const PropertyTypeApi = createApi({
  reducerPath: 'propertyTypeApi',
  baseQuery: useBaseQuery,
  tagTypes: ['propertyTypeApi'],
  endpoints: builder => ({
    getPropertyTypes: builder.query<{ data: IPropertyTypeProps[] }, void>({
      query: () => '/property-type',
      providesTags: ['propertyTypeApi']
    }),
    addPropertyType: builder.mutation<
      { data: IPropertyTypeProps },
      IPropertyTypeProps
    >({
      query: newPropertyType => ({
        url: '/property-type',
        method: 'POST',
        body: newPropertyType
      }),
      invalidatesTags: ['propertyTypeApi']
    }),
    getPropertyTypeById: builder.query<{ data: IPropertyTypeProps }, string>({
      query: id => `/property-type/${id}`,
      providesTags: ['propertyTypeApi']
    }),
    deletePropertyType: builder.mutation<{ data: string }, string>({
      query: propertyTypeId => {
        return {
          url: `/property-type/${propertyTypeId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['propertyTypeApi']
    }),
    updatePropertyTypeById: builder.mutation<
      { data: string },
      IPropertyTypeProps
    >({
      query: ({ _id, ...payload }) => {
        console.log(_id);
        return {
          url: `/property-type/${_id}`,
          method: 'PUT',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['propertyTypeApi']
    })
  })
});

export const {
  useGetPropertyTypesQuery,
  useAddPropertyTypeMutation,
  useGetPropertyTypeByIdQuery,
  useDeletePropertyTypeMutation,
  useLazyGetPropertyTypeByIdQuery,
  useLazyGetPropertyTypesQuery,
  useUpdatePropertyTypeByIdMutation
} = PropertyTypeApi;
export const PropertyTypeApiReducer = PropertyTypeApi.reducer;
export const PropertyTypeApiMiddleware = PropertyTypeApi.middleware;

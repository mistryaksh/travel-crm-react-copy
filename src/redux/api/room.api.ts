import { createApi } from '@reduxjs/toolkit/query/react';
import { IRoomCategoryProps } from 'interface';
import { useBaseQuery } from 'utils';

const RoomCategoryApi = createApi({
  reducerPath: 'roomCategoryApi',
  baseQuery: useBaseQuery,
  tagTypes: ['roomCategoryApi'],
  endpoints: ({ mutation, query }) => ({
    getRoomCategory: query<{ data: IRoomCategoryProps[] }, void>({
      query: () => '/room/category',
      providesTags: ['roomCategoryApi']
    }),
    getRoomCategoryById: query<{ data: IRoomCategoryProps }, string>({
      query: roomCategoryId => `/room/category/${roomCategoryId}`,
      providesTags: ['roomCategoryApi']
    }),
    addRoomCategory: mutation<{ data: string }, IRoomCategoryProps>({
      query: payload => {
        return {
          url: '/room/category',
          method: 'POST',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['roomCategoryApi']
    }),
    updateRoomCategory: mutation<{ data: string }, IRoomCategoryProps>({
      query: ({ ...payload }) => {
        return {
          url: `/room/category/${payload.RoomCategoryId}`,
          method: 'PUT',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['roomCategoryApi']
    }),
    deleteRoomCategory: mutation<{ data: string }, string>({
      query: roomCategoryId => {
        return {
          url: `/room/category/${roomCategoryId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['roomCategoryApi']
    })
  })
});

export const RoomCategoryApiReducer = RoomCategoryApi.reducer;
export const RoomCategoryApiMiddleware = RoomCategoryApi.middleware;
export const {
  useAddRoomCategoryMutation,
  useDeleteRoomCategoryMutation,
  useGetRoomCategoryByIdQuery,
  useGetRoomCategoryQuery,
  useLazyGetRoomCategoryByIdQuery,
  useLazyGetRoomCategoryQuery,
  useUpdateRoomCategoryMutation
} = RoomCategoryApi;

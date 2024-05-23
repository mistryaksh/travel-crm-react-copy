import { createApi } from '@reduxjs/toolkit/query/react';
import { IRoomCategoryProps } from 'interface';
import { useBaseQuery } from 'utils';

const RoomCategoryApi = createApi({
  reducerPath: 'roomCategoryApi',
  baseQuery: useBaseQuery,
  endpoints: builder => ({
    getRoomCategories: builder.query<{ data: IRoomCategoryProps[] }, void>({
      query: () => '/room/category'
    }),
    createRoomCategory: builder.mutation<
      { data: { message: string } },
      IRoomCategoryProps
    >({
      query: category => ({
        url: '/room/category',
        method: 'POST',
        body: { ...category }
      })
    }),
    updateRoomCategory: builder.mutation<
      { data: { message: string } },
      IRoomCategoryProps
    >({
      query: ({ id, ...payload }) => ({
        url: `/room/category/${id}`,
        method: 'PUT',
        body: {
          ...payload
        }
      })
    }),
    getRoomCategoryById: builder.query<{ data: IRoomCategoryProps }, void>({
      query: id => `/room/category/${id}`
    })
  })
});

export const {
  useGetRoomCategoriesQuery,
  useCreateRoomCategoryMutation,
  useUpdateRoomCategoryMutation,
  useGetRoomCategoryByIdQuery
} = RoomCategoryApi;
export const RoomCategoryApiReducer = RoomCategoryApi.reducer;
export const RoomCategoryApiMiddleware = RoomCategoryApi.middleware;

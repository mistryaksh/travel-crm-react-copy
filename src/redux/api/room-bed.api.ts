import { createApi } from '@reduxjs/toolkit/query/react';
import { IBedTypeProps } from 'interface';
import { useBaseQuery } from 'utils';

const RoomBedApi = createApi({
  reducerPath: 'roomBedApi',
  baseQuery: useBaseQuery,

  endpoints: ({ mutation, query }) => ({
    getRoomBeds: query<{ data: IBedTypeProps[] }, void>({
      query: () => '/room/bed'
    }),
    createRoomBed: mutation<{ data: { message: string } }, IBedTypeProps>({
      query: bed => ({
        url: '/room/bed',
        method: 'POST',
        body: bed
      })
    }),
    getRoomBedById: query<{ data: IBedTypeProps }, void>({
      query: id => `/room/bed/${id}`
    }),
    updateRoomBed: mutation<{ data: { message: string } }, IBedTypeProps>({
      query: ({ id, ...payload }) => ({
        url: `/room/bed/${id}`,
        method: 'PUT',
        body: {
          ...payload
        }
      })
    })
  })
});

export const {
  useGetRoomBedsQuery,
  useCreateRoomBedMutation,
  useGetRoomBedByIdQuery,
  useUpdateRoomBedMutation
} = RoomBedApi;
export const RoomBedApiReducer = RoomBedApi.reducer;
export const RoomBedApiMiddleware = RoomBedApi.middleware;

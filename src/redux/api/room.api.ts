import { createApi,  } from '@reduxjs/toolkit/query/react';
import { IRoomProps } from 'interface';
import { useBaseQuery } from 'utils';

const RoomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: useBaseQuery,
  endpoints: ({ mutation, query }) => ({
    getRooms: query<{ data: IRoomProps[] }, void>({
      query: () => '/room'
    }),
    createRoom: mutation<{ data: {message:string} }, IRoomProps>({
      query: room => ({
        url: '/room',
        method: 'POST',
        body: room
      })
    }),
    getRoomById: query<{ data: IRoomProps }, void>({
      query: id => `/room/${id}`
    }),
    updateRoom: mutation<{ data: {message:string} }, IRoomProps>({
      query: ({ id, ...payload }) => ({
        url: `/room/${id}`,
        method: 'PUT',
        body: {
          ...payload
        }
      })
    })
  })
});

export const {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useGetRoomByIdQuery,
  useUpdateRoomMutation
} = RoomApi;
export const RoomApiReducer = RoomApi.reducer;
export const RoomApiMiddleware = RoomApi.middleware;

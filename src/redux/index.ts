import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import {
  AmenityApiMiddleware,
  AmenityApiReducer,
  MasterAmenityApiMiddleware,
  MasterAmenityApiReducer,
  RoomApiMiddleware,
  RoomApiReducer,
  RoomBedApiMiddleware,
  RoomBedApiReducer,
  RoomCategoryApiMiddleware,
  RoomCategoryApiReducer
} from './api';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    amenityApi: AmenityApiReducer,
    masterAmenityApi: MasterAmenityApiReducer,
    roomBedApi: RoomBedApiReducer,
    roomCategoryApi: RoomCategoryApiReducer,
    roomApi: RoomApiReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      AmenityApiMiddleware,
      MasterAmenityApiMiddleware,
      RoomBedApiMiddleware,
      RoomCategoryApiMiddleware,
      RoomApiMiddleware
    )
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

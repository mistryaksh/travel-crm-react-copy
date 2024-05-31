import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import {
  AuthenticationReducer,
  AuthenticationMiddleware,
  PropertyTypeApiMiddleware,
  PropertyTypeApiReducer,
  systemCodesApiReducer,
  systemCodesApiMiddleware,
  AmenitiesCategoryApiMiddleware,
  AmenitiesCategoryApiReducer,
  AmenityApiReducer,
  AmenityMiddleware,
  PaymentModeApiReducer,
  PaymentModeApiMiddleware,
  RoomCategoryApiMiddleware,
  RoomCategoryApiReducer,
  BedTypeApiReducer,
  BedTypeApiMiddleware
} from './api';
import { AmenityReducer } from './feature';

export const store = configureStore({
  reducer: {
    authenticationApi: AuthenticationReducer,
    propertyTypeApi: PropertyTypeApiReducer,
    systemCodesApi: systemCodesApiReducer,
    amenityCategoryApi: AmenitiesCategoryApiReducer,
    amenityApi: AmenityApiReducer,
    amenity: AmenityReducer,
    paymentModeApi: PaymentModeApiReducer,
    roomCategoryApi: RoomCategoryApiReducer,
    bedTypeApi: BedTypeApiReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      AuthenticationMiddleware,
      PropertyTypeApiMiddleware,
      systemCodesApiMiddleware,
      AmenitiesCategoryApiMiddleware,
      AmenityMiddleware,
      PaymentModeApiMiddleware,
      RoomCategoryApiMiddleware,
      BedTypeApiMiddleware
    ])
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../index';

interface AmenitySliceProps {
  selectedCategory: string[];
  categoryInput: string;
}

const initialState: AmenitySliceProps = {
  selectedCategory: [],
  categoryInput: ''
};

const AmenitySlice = createSlice({
  initialState,
  name: 'amenity',
  reducers: {
    handleSelectedCategory: (state, action: PayloadAction<string>) => {
      if (!state.selectedCategory.includes(action.payload)) {
        state.selectedCategory.push(action.payload);
      }
    },
    handleCategoryInput: (state, action: PayloadAction<string>) => {
      state.categoryInput = action.payload;
    }
  }
});

export const useAmenitySlice = () =>
  useAppSelector(state => {
    return state.amenity;
  });
export const AmenityReducer = AmenitySlice.reducer;
export const { handleSelectedCategory, handleCategoryInput } =
  AmenitySlice.actions;

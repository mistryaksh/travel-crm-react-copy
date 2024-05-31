import { object, string } from 'yup';

export const roomCategorySchema = object().shape({
  RoomCategory: string().required(),
  RoomCategoryIcon: string().required()
});

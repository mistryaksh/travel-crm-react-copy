import { boolean, object, string } from 'yup';

export const amenityValidationSchema = object().shape({
  amenity_name: string().required(),
  default_action: boolean(),
  mst_amenities: string().required()
});

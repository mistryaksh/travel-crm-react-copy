import { boolean, object, string } from 'yup';

export const masterAmenityValidationSchema = object().shape({
  amenity_name: string().required(),
  default_action: boolean()
});

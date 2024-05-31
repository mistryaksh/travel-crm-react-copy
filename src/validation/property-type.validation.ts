import { object, string } from 'yup';

export const propertyTypesSchema = object().shape({
  PropertyType: string().required(),
  PropertyTypeIcon: string().required()
});

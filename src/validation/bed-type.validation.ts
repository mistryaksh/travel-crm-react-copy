import { object, string } from 'yup';

export const bedTypeValidation = object().shape({
  BedType: string().required(),
  BedTypeIcon: string().required()
});

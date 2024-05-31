import { boolean, object, string } from 'yup';

export const amenityCategoryValidationSchema = object().shape({
  AmenitiesCategory: string().required(),
  AmenitiesCategoryIcon: string().required()
});

export const masterAmenityValidationSchema = object().shape({
  AmenitiesName: string().required(),
  AmenitiesIcon: string().required(),
  AmenitiesShortDetail: string().required(),
  isChargeable: boolean().required()
});

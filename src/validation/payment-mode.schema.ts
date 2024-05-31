import { object, string } from 'yup';

export const paymentModeSchema = object().shape({
  PaymentMode: string().required(),
  PaymentModeIcon: string().required()
});

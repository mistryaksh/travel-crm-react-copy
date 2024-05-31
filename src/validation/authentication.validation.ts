import { object, string } from 'yup';

export const UserSignInValidationSchema = object().shape({
  email: string().required(),
  password: string().required()
});

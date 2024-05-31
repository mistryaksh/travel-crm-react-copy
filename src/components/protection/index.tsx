import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from 'utils';

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const auth: string = getToken()?.toString() as string;
  return auth ? children : <Navigate to="/admin/sign-in" replace />;
};

export { PrivateRoutes };

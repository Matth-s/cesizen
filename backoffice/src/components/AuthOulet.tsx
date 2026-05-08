import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet } from 'react-router';

export const AuthOutlet = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/authentification/connexion" replace />;
  }

  return <Outlet />;
};

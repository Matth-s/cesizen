import HeaderAuth from '@/features/auth/components/HeaderAuth';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <HeaderAuth />
      <Outlet />
    </div>
  );
};

export default AuthLayout;

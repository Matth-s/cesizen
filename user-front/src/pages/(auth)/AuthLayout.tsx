import HeaderAuth from "@/features/auth/components/HeaderAuth";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <HeaderAuth />
      <Outlet />
    </div>
  );
};

export default AuthLayout;

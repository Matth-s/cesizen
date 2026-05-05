import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

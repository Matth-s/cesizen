import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router";

export const AuthOutlet = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/authentification/connexion" replace />;
  }

  return <Outlet />;
};

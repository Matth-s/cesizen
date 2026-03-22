import LoginPage from "./pages/(auth)/LoginPage";
import RegisterPage from "./pages/(auth)/RegisterPage";
import ConfirmEmailPage from "./pages/(auth)/ConfirmEmailPage";
import ForgotPasswordPage from "./pages/(auth)/ForgotPasswordPage";
import AuthLayout from "./pages/(auth)/AuthLayout";
import HomePage from "./pages/(main)/HomePage";
import ResetPasswordPage from "./features/auth/components/ResetPasswordPage";

import { Route, Routes, useNavigate } from "react-router";
import { AuthOutlet } from "./components/AuthOutlet";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "./features/users/api/get-current-user-api";
import { useEffect } from "react";
import { setUser } from "./store/slices/user-slice";

const App = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isPending, isError, data } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ["current-user"],
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      navigate("/");
    }
  }, [data, user, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("error");
    }
  }, [isError]);

  if (isPending) return;

  return (
    <Routes>
      {/* pages d'authentification */}
      <Route path="/authentification" element={<AuthLayout />}>
        <Route path="connexion" element={<LoginPage />} />
        <Route path="inscription" element={<RegisterPage />} />
        <Route path="confirmer-email" element={<ConfirmEmailPage />} />
        <Route path="mot-de-passe-oublie" element={<ForgotPasswordPage />} />
        <Route
          path="reinitialiser-mot-de-passe"
          element={<ResetPasswordPage />}
        />
      </Route>

      <Route element={<AuthOutlet />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;

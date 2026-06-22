import LoginPage from "./pages/(auth)/LoginPage";
import RegisterPage from "./pages/(auth)/RegisterPage";
import ConfirmEmailPage from "./pages/(auth)/ConfirmEmailPage";
import ForgotPasswordPage from "./pages/(auth)/ForgotPasswordPage";
import AuthLayout from "./pages/(auth)/AuthLayout";
import HomePage from "./pages/(main)/HomePage";
import ResetPasswordPage from "./pages/(auth)/ResetPasswordPage";
import PageLayout from "./pages/PageLayout";
import DynamicPage from "./pages/(main)/DynamicPage";

import { Route, Routes, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "./features/users/api/get-current-user-api";
import { useEffect } from "react";
import { setUser } from "./store/slices/user-slice";
import { App as AppCapacitor } from "@capacitor/app";
import { QUERY_KEY } from "./types/query-key-type";
import { Keyboard } from "@capacitor/keyboard";
import { StatusBar, Style } from "@capacitor/status-bar";

import ParamsPage from "./pages/(main)/ParamsPage";
import DiagnosticPage from "./pages/(main)/DiagnosticPage";
import NotFoundPage from "./pages/(main)/NotFoundPage";
import DynamicPageContent from "./pages/(main)/DynamicPageContent";
import { setCsrfToken } from "./lib/api-client";
import { Capacitor } from "@capacitor/core";

const App = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: [QUERY_KEY.CURRENT_USER],
    retry: false,
  });

  useEffect(() => {
    AppCapacitor.addListener("appUrlOpen", (event) => {
      const url = new URL(event.url);
      const token = url.searchParams.get("token") ?? "";

      switch (url.hostname) {
        case "confirm":
          navigate(`/authentification/confirmer-email?token=${token}`);
          break;
        case "reset":
          navigate(
            `/authentification/reinitialiser-mot-de-passe?token=${token}`,
          );
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      setCsrfToken(data.csrfToken);
    }
  }, [data, user, dispatch]);

  useEffect(() => {
    let listener: Awaited<ReturnType<typeof Keyboard.addListener>>;

    const setupKeyboard = async () => {
      listener = await Keyboard.addListener("keyboardWillShow", () => {
        const activeElement = document.activeElement as HTMLElement | null;

        if (activeElement) {
          setTimeout(() => {
            activeElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 150);
        }
      });
    };

    if (Capacitor.isNativePlatform()) {
      setupKeyboard();
    }

    return () => {
      listener?.remove();
    };
  }, []);

  useEffect(() => {
    const setupStatusBar = async () => {
      await StatusBar.setOverlaysWebView({
        overlay: true,
      });

      await StatusBar.setStyle({
        style: Style.Dark,
      });

      await StatusBar.setBackgroundColor({
        color: "#ffffff",
      });
    };

    if (Capacitor.isNativePlatform()) {
      setupStatusBar();
    }
  }, []);

  if (isPending) return;

  return (
    <PageLayout>
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

        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/parametres" element={<ParamsPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/dynamic/:id" element={<DynamicPage />} />
          <Route path="/dynamic/:id/:pageId" element={<DynamicPageContent />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  );
};

export default App;

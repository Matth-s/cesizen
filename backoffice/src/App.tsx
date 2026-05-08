import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';
import { AuthOutlet } from './components/AuthOulet';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from './api/get-current-user-api';
import { useEffect } from 'react';
import { login } from './features/auth/auth.slice';
import { setCsrfToken } from './lib/api-client';

import AuthLayout from './pages/(auth)/AuthLayout';
import LoginPage from './pages/(auth)/LoginPage';

import HomePage from './pages/(main)/HomePage';
import MainLayout from './pages/(main)/MainLayout';
import UserPage from './pages/(main)/UserPage';
import DiagnosticPage from './pages/(main)/DiagnosticPage';
import NotFoundPage from './pages/(main)/NotFoundPage';
import DiagnosticIdPage from './pages/(main)/DiagnosticIdPage';
import PageManagement from './pages/(main)/PageManagement';
import PageEditor from './pages/(main)/PageEditor';
import MenuManagement from './pages/(main)/MenuManagement';

const App = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isPending, isError, data } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ['current-user'],
    retry: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(login(data));
      setCsrfToken(data.csrfToken);
      const pathnameUrl =
        pathname === '/authentification/connexion' ? '/' : pathname;
      navigate(pathnameUrl);
    }
  }, [data, user, dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/authentification/connexion');
    }
  }, [isError]);

  if (isPending) return;

  return (
    <Routes>
      <Route path="authentification" element={<AuthLayout />}>
        <Route path="connexion" element={<LoginPage />} />
      </Route>

      <Route element={<AuthOutlet />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/utilisateurs" element={<UserPage />} />

          <Route path="/pages" element={<PageManagement />} />
          <Route path="/pages/nouveau" element={<PageEditor />} />
          <Route
            path="/pages/modifier/:id"
            element={<PageEditor />}
          />
          <Route path="/menu" element={<MenuManagement />} />

          <Route path="/diagnostics" element={<DiagnosticPage />} />
          <Route
            path="/diagnostics/:id"
            element={<DiagnosticIdPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

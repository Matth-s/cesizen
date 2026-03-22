import { Route, Routes } from 'react-router';
import LoginPage from './pages/(auth)/LoginPage';
import RegisterPage from './pages/(auth)/RegisterPage';
import ConfirmEmailPage from './pages/(auth)/ConfirmEmailPage';
import ForgotPasswordPage from './pages/(auth)/ForgotPasswordPage';
import AuthLayout from './pages/(auth)/AuthLayout';

const App = () => {
  return (
    <Routes>
      {/* pages d'authentification */}
      <Route path="/authentification" element={<AuthLayout />}>
        <Route path="connexion" element={<LoginPage />} />
        <Route path="inscription" element={<RegisterPage />} />
        <Route
          path="confirmer-email"
          element={<ConfirmEmailPage />}
        />
        <Route
          path="reinitialiser-mot-de-passe"
          element={<ForgotPasswordPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;

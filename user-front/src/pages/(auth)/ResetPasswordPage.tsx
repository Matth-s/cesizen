import { useSearchParams } from "react-router";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (!token) return <p>Token manquant</p>;

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;

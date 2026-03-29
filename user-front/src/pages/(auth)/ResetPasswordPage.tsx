import { useSearchParams } from "react-router";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  return <ResetPasswordForm token={token ?? ""} />;
};

export default ResetPasswordPage;

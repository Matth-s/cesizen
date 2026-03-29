import ConfirmEmail from "@/features/auth/components/ConfirmEmail";
import { useSearchParams } from "react-router";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (!token) return <p>Token manquant</p>;

  return <ConfirmEmail token={token} />;
};

export default ConfirmEmailPage;

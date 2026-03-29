import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

const ForgotPasswordPage = () => {
  return (
    <div className="w-4/5">
      <NavLink
        to={"/authentification/connexion"}
        className="mb-2 inline-flex w-full items-center gap-2 text-left text-base font-medium text-teal-600 hover:text-teal-700"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Retour à la connexion
      </NavLink>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;

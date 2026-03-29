import { useQuery } from "@tanstack/react-query";
import { confirmEmailApi } from "../api/confirm-email-api";

type ConfirmEmailProps = {
  token: string;
};

const ConfirmEmail = ({ token }: ConfirmEmailProps) => {
  const { isPending, error } = useQuery({
    queryKey: ["confirmEmail", token],
    queryFn: () => confirmEmailApi(token),
  });

  return (
    <div>
      {isPending
        ? "Confirming email..."
        : error
          ? "Error confirming email"
          : "Email confirmed successfully"}
    </div>
  );
};

export default ConfirmEmail;

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutApi } from "../api/logout-api";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user-slice";
import { useNavigate } from "react-router";
import { QUERY_KEY } from "@/types/query-key-type";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: logOutApi,

    onSuccess() {
      toast.success("Vous êtes déconnecté");
      dispatch(setUser(null));
      navigate("/");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_USER] });
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  return (
    <Button disabled={isPending} onClick={() => mutate()}>
      Se déconnecter
    </Button>
  );
};

export default LogoutButton;

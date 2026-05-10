import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  deleteUserSchema,
  type IDeleteUser,
} from "../schema/delete-user-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ShowFormPassword from "@/features/auth/components/ShowFormPassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../api/delete-user-api";
import { QUERY_KEY } from "@/types/query-key-type";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import SubmitButton from "@/components/SubmitButton";
import FormErrorMessage from "@/components/FormError";

const DeleteUserAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<IDeleteUser>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteUserSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const deleteMutation = useMutation({
    mutationFn: deleteUserApi,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_USER] });
      navigate("/");
      toast.success("Votre compte a été supprimé avec succès");
    },

    onError(err) {
      let message = "Une erreur est survenue";

      if (err instanceof Error) {
        message = err.message;
      }

      setError("root", {
        message,
      });
    },
  });

  const handleFormSubmit = (formData: IDeleteUser) => {
    deleteMutation.mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger className={"w-full"}>
        <Button className={"w-full"} variant={"destructive"}>
          Supprimer mon compte
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes vous sur de vouloir supprimer votre compte ?
          </DialogTitle>
          <DialogDescription>
            Attention cet action est irréversible
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-3"
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Mot de passe</FieldLabel>
                <Input {...field} type={showPassword ? "text" : "password"} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <ShowFormPassword
            label="Afficher le mot de passe"
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            textButton="Supprimer mon compte"
            isDisabled={deleteMutation.isPending}
            variant={"destructive"}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserAccount;

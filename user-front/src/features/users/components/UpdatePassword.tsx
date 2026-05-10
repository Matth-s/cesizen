import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  type IUpdatePassword,
} from "../schema/update-password-schema";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordUserApi } from "../api/update-password-user-api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import FormErrorMessage from "@/components/FormError";
import ShowFormPassword from "@/features/auth/components/ShowFormPassword";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: {
      errors: { root },
    },
  } = form;

  const updateMutation = useMutation({
    mutationFn: updatePasswordUserApi,

    onSuccess() {
      toast.success("Le mot de passe a été modifié avec succès");
      reset();
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

  const handleFormSubmit = (formData: IUpdatePassword) => {
    updateMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lock className="size-5 text-red-500" />

          <div>
            <CardTitle>Réinitialisation du mot de passe</CardTitle>

            <CardDescription>
              Modifiez votre mot de passe actuel.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Confirmer le mot de passe</FieldLabel>
                <Input {...field} type={showPassword ? "text" : "password"} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <ShowFormPassword
            label="Afficher les mots de passe"
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="submit-button"
            textButton="Modifier mon mot de passe"
            isDisabled={updateMutation.isPending}
            variant={"destructive"}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
